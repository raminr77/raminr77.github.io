import { clsx } from 'clsx';
import React, { ReactNode } from 'react';
import { type AnimationNames, animator } from '@/shared/helpers';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  animationName?: AnimationNames;
}

export function ContentContainer({
  children,
  className,
  animationName = 'fadeInUp'
}: ContentContainerProps) {
  return (
    <main className='flex w-full justify-center overflow-hidden p-5 pt-32 md:pt-40'>
      <div
        className={clsx(
          'w-11/12 max-w-screen-lg',
          animator({ name: animationName }),
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}
