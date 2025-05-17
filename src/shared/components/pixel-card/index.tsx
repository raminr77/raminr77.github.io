'use client';

import type { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { clsx } from 'clsx';

import type { PixelCanvasColor } from '@/shared/components/pixel-canvas';
import { type AnimationNames, animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

interface PixelCardProps {
  title: string;
  className?: string;
  children?: ReactNode;
  description?: string;
  color?: PixelCanvasColor;
  animationName?: AnimationNames;
}

export function PixelCard({
  title,
  children,
  className,
  description,
  color = 'white',
  animationName = 'fadeIn'
}: PixelCardProps) {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-center overflow-hidden rounded-md bg-white/15 backdrop-blur-sm dark:bg-black/15',
        animator({ name: animationName }),
        className
      )}
    >
      {children || (
        <div className="pointer-events-none z-10 flex w-full flex-col items-center justify-center gap-1 px-5 py-6">
          <h3
            className={clsx(
              'text-2xl font-bold leading-10',
              titleFont.className,
              animator({ name: 'fadeInUp' })
            )}
          >
            {title}
          </h3>
          {description && (
            <p
              className={clsx(
                'text-lg leading-6',
                animator({ name: 'fadeInUp', delay: '1s' })
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <PixelCanvas color={color} className="absolute left-0 top-0 z-0 h-full w-full" />
    </div>
  );
}
