import Image from 'next/image';
import Link from 'next/link';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import type { RecommendationItem } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

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
      style={{ animationDelay }}
      className={clsx(
        'flex flex-col items-start gap-2 border bg-white p-4 shadow-lg dark:bg-black',
        styles['recommendation-card'],
        animator({ name: 'fadeInUp' })
      )}
    >
      <div
        className={clsx(
          'mb-2 flex w-full gap-3 border-b pb-4 text-left duration-500',
          styles['recommendation-card__header']
        )}
      >
        {imageURL && (
          <Link onClick={sendEvent} href={url} target="_blank" rel="noopener noreferrer">
            <Image
              width={100}
              height={100}
              alt={fullName}
              src={imageURL}
              className={clsx(
                'rounded-md grayscale duration-500',
                styles['recommendation-card__profile-image']
              )}
            />
          </Link>
        )}
        <div className="flex w-full flex-col gap-1 text-left">
          <Link
            href={url}
            target="_blank"
            onClick={sendEvent}
            rel="noopener noreferrer"
            className="text-amber-500"
          >
            <h4 className={clsx(titleFont.className, 'text-xl font-bold')}>
              {fullName.toUpperCase()}
            </h4>
          </Link>
          <p>{title}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span>{caption}</span>
            <span>( {date} )</span>
          </div>
        </div>
      </div>

      <p className="w-full text-left">{text}</p>

      <Link
        href={url}
        target="_blank"
        onClick={sendEvent}
        rel="noopener noreferrer"
        className="text-amber-500"
      >
        LinkedIn
      </Link>
    </div>
  );
}
