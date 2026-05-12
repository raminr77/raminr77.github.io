/**
 * A single pixel inside the `pixel-canvas` custom element.
 * Each Pixel owns its own animation state (size, shimmer phase, delay counter)
 * and draws itself directly into the provided 2D context.
 */
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
