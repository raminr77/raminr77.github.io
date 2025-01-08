'use client';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { JourneyItem } from '@/data/journey';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

import styles from './journey-card.module.scss';

export function JourneyCard({
  data,
  className,
  order = 1
}: {
  order?: number;
  data: JourneyItem;
  className?: string;
}) {
  const animationDelay = `${order * 0.3}s`;
  const { title, description, date, year } = data;

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center gap-4 max-md:flex-col max-md:gap-16',
        className
      )}
    >
      <div
        className={clsx(
          'relative flex h-20 min-h-20 w-20 min-w-20 select-none items-center justify-center overflow-hidden border',
          styles['journey-card__circle'],
        )}
      >
        <h5
          style={{ animationDelay }}
          className={clsx(
            'pointer-events-none absolute text-xl font-extrabold tracking-wide',
            animator({ name: 'fadeInUp' }),
            titleFont.className,
          )}
        >
          {year}
        </h5>
        <PixelCanvas color='yellow' />
      </div>

      <div
        style={{ animationDelay }}
        className={clsx(
          'relative flex w-full flex-col gap-2',
          animator({ name: 'fadeInUp' })
        )}
      >
        <div className='flex select-none flex-col'>
          <h3 className={clsx('text-2xl font-bold tracking-wide', titleFont.className)}>
            {title.toUpperCase()}
          </h3>
          <span>{date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
