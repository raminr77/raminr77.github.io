import { Pixel } from './pixel';

/**
 * Custom HTML element that renders an animated grid of pixels in a shadow-root canvas.
 * Hovering / focusing the parent triggers `appear`, leaving triggers `disappear`.
 * Configurable via `data-*` attributes:
 *   - `data-gap`         pixel spacing (clamped to [GAP_MIN, GAP_MAX])
 *   - `data-speed`       animation speed (clamped to [SPEED_MIN, SPEED_MAX])
 *   - `data-colors`      comma-separated CSS colors
 *   - `data-auto-play`   start animating immediately, ignore pointer events
 *   - `data-play-ones`   first interaction triggers a one-shot appear
 *   - `data-no-focus`    skip focusin/focusout listeners
 */
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
    if ('customElements' in window && !customElements.get(tag)) {
      customElements.define(tag, PixelCanvas);
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
    this.resizeObserver.observe(this);

    const parent = this.parentElement;
    if (!parent) return;

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

    const parent = this.parentElement;
    if (!parent) return;

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
    for (let pixelX = 0; pixelX < this.canvas.width; pixelX += this.gap) {
      for (let pixelY = 0; pixelY < this.canvas.height; pixelY += this.gap) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = this.reducedMotion ? 0 : this.getDistanceToCenter(pixelX, pixelY);
        this.pixels.push(
          new Pixel(this.canvas, this.ctx, pixelX, pixelY, color, this.speed, delay)
        );
      }
    }
  }

  private getDistanceToCenter(pixelX: number, pixelY: number): number {
    const offsetX = pixelX - this.canvas.width / 2;
    const offsetY = pixelY - this.canvas.height / 2;
    return Math.sqrt(offsetX ** 2 + offsetY ** 2);
  }

  handleEvent(domEvent: Event): void {
    if (this.dataset.playOnes === '') {
      this.startAnimation('appear');
      return;
    }

    if (domEvent.type === 'mouseenter') {
      this.startAnimation('appear');
    } else if (domEvent.type === 'mouseleave') {
      this.startAnimation('disappear');
    }
  }

  private startAnimation(action: 'appear' | 'disappear'): void {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(() => this.runAnimation(action));
  }

  // Named `runAnimation` (not `animate`) so we don't shadow HTMLElement.animate.
  private runAnimation(action: 'appear' | 'disappear'): void {
    this.animationFrameId = requestAnimationFrame(() => this.runAnimation(action));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pixels.forEach((pixel) => pixel[action]());
    if (this.pixels.every((pixel) => pixel.isIdle)) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

PixelCanvas.register();
