import Image from 'next/image';
import { clsx } from 'clsx';

import { TrackedAnchor } from '@/shared/components';
import type { RecommendationItem } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';

import styles from './recommendation-card.module.scss';

interface RecommendationCardProps {
  data: RecommendationItem;
  animationDelay?: string;
}

export function RecommendationCard({
  data,
  animationDelay = '0s'
}: RecommendationCardProps) {
  const { url, text, date, title, caption, fullName, imageURL } = data;
  const trackingPayload = GTM_EVENTS.LINKEDIN_RECOMMENDATION(fullName);

  return (
    <div
      id={`item-${data.id}`}
      style={{ animationDelay }}
      className={clsx(
        'relative w-full flex flex-col items-start gap-3 rounded-r-md border border-slate-300/30 bg-white/60 p-6 shadow-md backdrop-blur-sm scroll-mt-[100px] transition-all duration-500 hover:border-amber-500/40 hover:shadow-lg dark:border-slate-100/10 dark:bg-black/40 dark:hover:border-amber-500/40',
        animator({ name: 'fadeIn' }),
        styles['recommendation-card']
      )}
    >
      <div className="mb-1 flex w-full items-center gap-4 text-left duration-500">
        {imageURL && (
          <TrackedAnchor
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            trackingPayload={trackingPayload}
            className="shrink-0"
          >
            <Image
              width={100}
              height={100}
              alt={fullName}
              src={imageURL}
              loading="lazy"
              className={clsx(
                'rounded-full ring-2 ring-slate-300/40 dark:ring-white/10 dark:grayscale duration-500',
                styles['recommendation-card__profile-image']
              )}
            />
          </TrackedAnchor>
        )}
        <div className="flex w-full flex-col gap-1 text-left">
          <TrackedAnchor
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold tracking-wide text-amber-500 font-title hover:text-amber-400 duration-300"
            trackingPayload={trackingPayload}
          >
            {fullName.toUpperCase()}
          </TrackedAnchor>
          <p className="text-base italic opacity-80">{title}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm opacity-70">
            <span>{caption}</span>
            <span aria-hidden="true">·</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <p
        className={clsx(
          'w-full text-left text-base leading-relaxed',
          styles['recommendation-card__quote']
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <TrackedAnchor
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 rounded-sm border border-amber-500/50 px-3 py-1 text-sm font-medium text-amber-500 transition-colors duration-300 hover:border-amber-500 hover:bg-amber-500/10"
        trackingPayload={trackingPayload}
      >
        View on LinkedIn
        <span aria-hidden="true">↗</span>
      </TrackedAnchor>
    </div>
  );
}
