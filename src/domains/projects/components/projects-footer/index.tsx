'use client';

import Link from 'next/link';

import { sendGTMEvent } from '@next/third-parties/google';

import { GTM_EVENTS } from '@/shared/constants';
import { PROJECTS_DATA } from '@/data';

export function ProjectsFooter() {
  return (
    <>
      <p>{PROJECTS_DATA.footer}</p>
      <Link
        href={PROJECTS_DATA.footerActionURL}
        onClick={() => sendGTMEvent(GTM_EVENTS.PROJECTS_FOOTER)}
        className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8"
      >
        {PROJECTS_DATA.footerActionLabel}
      </Link>
    </>
  );
}
