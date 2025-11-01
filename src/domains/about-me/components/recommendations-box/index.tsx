'use client';
import Image from 'next/image';
import Link from 'next/link';

import {
  RECOMMENDATIONS,
  RECOMMENDATION_PAGE_DATA,
  type RecommendationItem
} from '@/data';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';

export function RecommendationsBox() {
  return (
    <div key="RecommendationsBox" className="w-full flex flex-col mt-5 items-center">
      <p
        className="w-full mb-4"
        dangerouslySetInnerHTML={{ __html: RECOMMENDATION_PAGE_DATA.aboutMeDescription }}
      />

      <div className="max-h-[210px] w-full flex flex-wrap items-center justify-center gap-2 overflow-hidden">
        {RECOMMENDATIONS.slice(0, 17).map(
          ({ id, fullName, imageURL }: RecommendationItem) =>
            imageURL && (
              <Link
                key={`recommendation-item-${id}`}
                href={`${ROUTES.RECOMMENDATIONS}#item-${id}`}
                onClick={() =>
                  sendGTMEvent(
                    GTM_EVENTS.CHECK_RECOMMENDATION(`Check - ${fullName} Avatar`)
                  )
                }
              >
                <Image
                  width={100}
                  height={100}
                  alt={fullName}
                  src={imageURL}
                  loading="lazy"
                  className="dark:grayscale hover:grayscale-0 duration-500 rounded-md w-[100px] h-[100px]"
                />
              </Link>
            )
        )}
      </div>

      <Link
        href={ROUTES.RECOMMENDATIONS}
        onClick={() => sendGTMEvent(GTM_EVENTS.CHECK_RECOMMENDATION('See All Action'))}
        className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8 my-5"
      >
        See all recommendations
      </Link>
    </div>
  );
}
