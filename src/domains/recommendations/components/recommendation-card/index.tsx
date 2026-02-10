'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';

import type { RecommendationItem } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';

import styles from './recommendation-card.module.scss';

export function RecommendationCard({
  data,
  animationDelay = '0s'
}: {
  data: RecommendationItem;
  animationDelay?: string;
}) {
  const { url, text, date, title, caption, fullName, imageURL } = data;

  const sendEvent = () => sendGTMEvent(GTM_EVENTS.LINKEDIN_RECOMMENDATION(fullName));

  return (
    <div
      id={`item-${data.id}`}
      style={{ animationDelay }}
      className={clsx(
        'w-full flex flex-col items-start gap-2 bg-white/50 scroll-mt-[100px] p-4 dark:bg-black/50',
        animator({ name: 'fadeIn' }),
        styles['recommendation-card']
      )}
    >
      <div className="mb-2 flex w-full gap-3 text-left duration-500">
        {imageURL && (
          <a href={url} target="_blank" onClick={sendEvent} rel="noopener noreferrer">
            <Image
              width={100}
              height={100}
              alt={fullName}
              src={imageURL}
              loading="lazy"
              className={clsx(
                'rounded-md dark:grayscale duration-500',
                styles['recommendation-card__profile-image']
              )}
            />
          </a>
        )}
        <div className="flex w-full flex-col gap-1 text-left">
          <a
            href={url}
            target="_blank"
            onClick={sendEvent}
            rel="noopener noreferrer"
            className="text-xl font-bold text-amber-500 font-title"
          >
            {fullName.toUpperCase()}
          </a>
          <p>{title}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span>{caption}</span>
            <span>( {date} )</span>
          </div>
        </div>
      </div>

      <p className="w-full text-left" dangerouslySetInnerHTML={{ __html: text }} />

      <Link
        href={url}
        target="_blank"
        prefetch={false}
        onClick={sendEvent}
        rel="noopener noreferrer"
        className="text-amber-500"
      >
        LinkedIn
      </Link>
    </div>
  );
}
