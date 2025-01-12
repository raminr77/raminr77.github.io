'use client';
import { useEffect } from 'react';
import { isSSR } from '@/shared/helpers';

const COLORS = {
  white: '#ffffff',
  red: '#fecdd3, #fda4af, #e11d48',
  blue: '#e0f2fe, #7dd3fc, #0ea5e9',
  yellow: '#fef08a, #fde047, #eab308'
} as const;

export type PixelCanvasColor = keyof typeof COLORS;

interface PixelCanvasProps {
  gap?: number;
  speed?: number;
  className?: string;
  color?: PixelCanvasColor;
}

export default function PixelCanvas({
  gap = 10,
  className,
  speed = 25,
  color = 'white'
}: PixelCanvasProps) {
  useEffect(() => {
    if (!isSSR()) {
      import('../../libs/pixel-canvas');
    }
  }, []);

  return (
    <div className={className}>
      <pixel-canvas
        data-gap={gap}
        data-speed={speed}
        data-colors={COLORS[color]}
      ></pixel-canvas>
    </div>
  );
}
