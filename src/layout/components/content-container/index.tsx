import { ReactNode } from 'react';

import { clsx } from 'clsx';

import { type AnimationNames, animator } from '@/shared/helpers';

interface ContentContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
  animationName?: AnimationNames;
}

export function ContentContainer({
  title,
  children,
  className,
  animationName = 'fadeIn'
}: ContentContainerProps) {
  return (
    <main className="flex w-full justify-center overflow-hidden p-5 pb-16 pt-32 md:pt-40">
      <div
        className={clsx(
          'w-11/12 max-w-screen-lg',
          animator({ name: animationName }),
          className
        )}
      >
        {title && (
          <h1
            className={clsx(
              'mb-5 text-2xl font-bold font-title',
              animator({ name: 'fadeIn' })
            )}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
    </main>
  );
}
