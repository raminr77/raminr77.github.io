'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { clsx } from 'clsx';

import { Icon } from '@/shared/components/icon';
import { JourneyItem } from '@/data/journey';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import styles from './journey-card.module.scss';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

const TITLE_CLASSES = clsx(
  styles['journey-card__title'],
  'text-xl tracking-wide pb-2 border-b border-slate-300/40 mb-3 duration-500',
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
        styles['journey-card'],
        'flex w-full text-lg justify-center gap-4 max-md:flex-col max-md:items-center max-md:gap-6',
        className
      )}
    >
      <div
        className={clsx(
          'float-animation relative flex h-20 min-h-20 w-20 min-w-20 select-none items-center justify-center overflow-hidden border-2 border-slate-300/40 duration-500',
          styles['journey-card__circle']
        )}
      >
        <span
          style={{ animationDelay }}
          className={clsx(
            'pointer-events-none absolute text-xl font-extrabold tracking-wide',
            animator({ name: 'fadeIn' }),
            titleFont.className
          )}
        >
          {year}
        </span>
        <PixelCanvas color="yellow" autoPlay />
      </div>

      <div
        style={{ animationDelay }}
        className={clsx(
          'relative flex w-full flex-col gap-3',
          animator({ name: 'fadeIn' })
        )}
      >
        <div className="flex select-none flex-col">
          {url ? (
            <Link
              href={url}
              target="_blank"
              className={clsx(
                TITLE_CLASSES,
                'flex items-center gap-2 hover:text-amber-500 flex-wrap'
              )}
            >
              <span>{title}</span>
              <Icon alt={`Link to ${title}`} name="new-tab" />
            </Link>
          ) : (
            <p className={clsx(TITLE_CLASSES)}>{title}</p>
          )}

          <div className="flex items-center justify-between flex-wrap">
            <span>{location}</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="mt-2">
          <div dangerouslySetInnerHTML={{ __html: description }} />

          {items && (
            <ul className="ml-4 mt-2 list-disc leading-8">
              {items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
