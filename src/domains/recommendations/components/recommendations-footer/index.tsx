'use client';

import Link from 'next/link';

import { sendGTMEvent } from '@next/third-parties/google';

import { RECOMMENDATION_PAGE_DATA } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';

export function RecommendationsFooter() {
  return (
    <>
      <p>{RECOMMENDATION_PAGE_DATA.footer}</p>
      <Link
        href={RECOMMENDATION_PAGE_DATA.footerActionURL}
        onClick={() => sendGTMEvent(GTM_EVENTS.RECOMMENDATIONS_FOOTER)}
        className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8"
      >
        {RECOMMENDATION_PAGE_DATA.footerActionLabel}
      </Link>
    </>
  );
}
