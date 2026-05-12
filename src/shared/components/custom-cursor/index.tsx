'use client';

import { useEffect, useRef, useState } from 'react';

const MINIMUM_SCREEN_SIZE = 1100;
const TRAIL_PARAMS = {
  pointsNumber: 10,
  widthFactor: 0.3,
  friction: 0.4,
  spring: 0.5
} as const;

type Point = { x: number; y: number; dx: number; dy: number };

const createTrail = (x: number, y: number): Point[] =>
  Array.from({ length: TRAIL_PARAMS.pointsNumber }, () => ({ x, y, dx: 0, dy: 0 }));

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Point[]>(createTrail(0, 0));
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < MINIMUM_SCREEN_SIZE) return;
    setEnabled(true);

    const initialX = window.innerWidth * 0.5;
    const initialY = window.innerHeight * 0.5;
    pointerRef.current = { x: initialX, y: initialY };
    trailRef.current = createTrail(initialX, initialY);
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const trail = trailRef.current;
    const pointer = pointerRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (event.target instanceof HTMLElement) {
        canvas.style.opacity = event.target.closest('a, button, .no-custom-cursor')
          ? '10%'
          : '100%';
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((point, pointIndex) => {
        const prev = pointIndex === 0 ? pointer : trail[pointIndex - 1];
        const spring = pointIndex === 0 ? 0.4 * TRAIL_PARAMS.spring : TRAIL_PARAMS.spring;
        point.dx += (prev.x - point.x) * spring;
        point.dy += (prev.y - point.y) * spring;
        point.dx *= TRAIL_PARAMS.friction;
        point.dy *= TRAIL_PARAMS.friction;
        point.x += point.dx;
        point.y += point.dy;
      });

      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#FF8F00';
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = TRAIL_PARAMS.widthFactor * (TRAIL_PARAMS.pointsNumber - i);
        ctx.stroke();
      }

      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    handleResize();
    animationFrameId = requestAnimationFrame(draw);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed left-0 top-0 z-30 duration-500 opacity-0"
      />
      {/* @ts-expect-error: custom element loaded via /click-spark.js */}
      <click-spark />
    </>
  );
}
