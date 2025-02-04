export class Pixel {
  private static MIN_SIZE: number = 0.5;
  private static SIZE_STEP_RANGE: number = 0.4;

  x: number;
  y: number;
  color: string;
  width: number;
  speed: number;
  delay: number;
  height: number;
  maxSize: number;
  sizeStep: number;
  size: number = 0;
  counter: number = 0;
  isIdle: boolean = false;
  isReverse: boolean = false;
  isShimmer: boolean = false;
  maxSizeInteger: number = 2;
  ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx = context;
    this.delay = delay;
    this.width = canvas.width;
    this.height = canvas.height;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.sizeStep = Math.random() * Pixel.SIZE_STEP_RANGE;
    this.maxSize = this.getRandomValue(Pixel.MIN_SIZE, this.maxSizeInteger);
  }

  private getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private draw(): void {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear(): void {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += Math.random() * 4 + (this.width + this.height) * 0.01;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear(): void {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.1;
    this.draw();
  }

  shimmer(): void {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= Pixel.MIN_SIZE) {
      this.isReverse = false;
    }

    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

export class PixelCanvas extends HTMLElement {
  private static GAP_MIN: number = 4;
  private static GAP_MAX: number = 50;
  private static SPEED_MIN: number = 0;
  private static SPEED_MAX: number = 100;
  private static DEFAULT_COLORS: string[] = ['#f8fafc', '#f1f5f9', '#cbd5e1'];
  private static CSS: string = `:host { display: grid; inline-size: 100%; block-size: 100%; overflow: hidden; }`;

  private pixels: Pixel[] = [];
  private reducedMotion!: boolean;
  private animationFrameId!: number;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private resizeObserver!: ResizeObserver;

  static register(tag = 'pixel-canvas'): void {
    if ('customElements' in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      customElements.define(tag, this);
    }
  }

  private get colors(): string[] {
    return this.dataset.colors?.split(',') || PixelCanvas.DEFAULT_COLORS;
  }

  private get gap(): number {
    const value = parseInt(this.dataset.gap || '5', 10);
    return Math.min(Math.max(value, PixelCanvas.GAP_MIN), PixelCanvas.GAP_MAX);
  }

  private get speed(): number {
    const value = parseInt(this.dataset.speed || '35', 10);
    const throttle = 0.001;
    return (
      Math.min(Math.max(value, PixelCanvas.SPEED_MIN), PixelCanvas.SPEED_MAX) * throttle
    );
  }

  private get noFocus(): boolean {
    return this.hasAttribute('data-no-focus');
  }

  connectedCallback(): void {
    this.setupCanvas();
    this.addEventListeners();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  disconnectedCallback(): void {
    this.cleanup();
  }

  private setupCanvas(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(PixelCanvas.CSS);

    this.attachShadow({ mode: 'open' }).adoptedStyleSheets = [sheet];
    this.canvas = document.createElement('canvas');
    this.shadowRoot!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
  }

  private addEventListeners(): void {
    this.resizeObserver = new ResizeObserver(() => this.init());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.resizeObserver.observe(this);

    const parent = this.parentElement!;

    if (this.dataset.autoPlay === '') {
      this.startAnimation('appear');
      return;
    }

    parent.addEventListener('mouseenter', this);
    parent.addEventListener('mouseleave', this);

    if (!this.noFocus) {
      parent.addEventListener('focusin', this);
      parent.addEventListener('focusout', this);
    }
  }

  private cleanup(): void {
    this.resizeObserver.disconnect();
    cancelAnimationFrame(this.animationFrameId);

    const parent = this.parentElement!;
    parent.removeEventListener('mouseenter', this);
    parent.removeEventListener('mouseleave', this);

    if (!this.noFocus) {
      parent.removeEventListener('focusin', this);
      parent.removeEventListener('focusout', this);
    }
  }

  private init(): void {
    const rect = this.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    this.pixels = [];
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = this.reducedMotion ? 0 : this.getDistanceToCenter(x, y);
        this.pixels.push(
          new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
        );
      }
    }
  }

  private getDistanceToCenter(x: number, y: number): number {
    const dx = x - this.canvas.width / 2;
    const dy = y - this.canvas.height / 2;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  handleEvent(event: Event): void {
    if (this.dataset.playOnes === '') {
      this.startAnimation('appear');
      return;
    }

    if (event.type === 'mouseenter') {
      this.startAnimation('appear');
    } else if (event.type === 'mouseleave') {
      this.startAnimation('disappear');
    }
  }

  private startAnimation(action: 'appear' | 'disappear'): void {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(() => this.animate(action));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  private animate(action: 'appear' | 'disappear'): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate(action));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pixels.forEach((pixel) => pixel[action]());
    if (this.pixels.every((pixel) => pixel.isIdle)) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

PixelCanvas.register();
