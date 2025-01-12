'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { JourneyItem } from '@/data/journey';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

import styles from './journey-card.module.scss';

const TITLE_CLASSES = clsx(
  'text-2xl font-bold tracking-wide pb-2 border-b mb-3',
  titleFont.className
);
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
  const { title, description, date, year, url, items, location } = data;

  return (
    <div
      className={clsx(
        'flex w-full justify-center gap-4 max-md:flex-col max-md:items-center max-md:gap-16',
        className
      )}
    >
      <div
        className={clsx(
          'relative flex h-20 min-h-20 w-20 min-w-20 select-none items-center justify-center overflow-hidden border',
          styles['journey-card__circle']
        )}
      >
        <h5
          style={{ animationDelay }}
          className={clsx(
            'pointer-events-none absolute text-xl font-extrabold tracking-wide',
            animator({ name: 'fadeInUp' }),
            titleFont.className
          )}
        >
          {year}
        </h5>
        <PixelCanvas color='yellow' />
      </div>

      <div
        style={{ animationDelay }}
        className={clsx(
          'relative flex w-full flex-col gap-3',
          animator({ name: 'fadeInUp' })
        )}
      >
        <div className='flex select-none flex-col'>
          {url ? (
            <Link
              href={url}
              target='_blank'
              className={clsx(TITLE_CLASSES, 'text-amber-500')}
            >
              {title.toUpperCase()}
            </Link>
          ) : (
            <h3 className={TITLE_CLASSES}>{title.toUpperCase()}</h3>
          )}

          <div className='flex items-center justify-between'>
            <span>{location}</span>
            <span>{date}</span>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: description }} />

        {items && (
          <ul className='ml-4 mt-2 list-disc leading-8'>
            {items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
