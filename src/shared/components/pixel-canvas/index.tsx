'use client';

import { useIsClient } from '@/shared/hooks';

const COLORS = {
  white: '#ffffff',
  red: '#fca5a5, #ef4444, #7f1d1d',
  blue: '#e0f2fe, #7dd3fc, #0ea5e9',
  green: '#bbf7d0, #4ade80, #166534',
  yellow: '#fef08a, #fde047, #eab308'
} as const;

export type PixelCanvasColor = keyof typeof COLORS;

interface PixelCanvasProps {
  gap?: number;
  speed?: number;
  playOnes?: boolean;
  autoPlay?: boolean;
  className?: string;
  color?: PixelCanvasColor;
}

export default function PixelCanvas({
  gap = 10,
  className,
  speed = 25,
  color = 'white',
  autoPlay = false,
  playOnes = false
}: PixelCanvasProps) {
  const isClient = useIsClient();

  if (isClient) {
    import('../../libs/pixel-canvas').catch(() => {
      console.error('Failed to load pixel-canvas');
    });
  }

  return (
    <div className={className}>
      {/* @ts-expect-error: Unreachable code error */}
      <pixel-canvas
        data-gap={gap}
        data-speed={speed}
        data-play-ones={playOnes}
        data-auto-play={autoPlay}
        data-colors={COLORS[color]}
      />
    </div>
  );
}
