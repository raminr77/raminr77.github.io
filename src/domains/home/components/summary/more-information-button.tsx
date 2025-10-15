'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { PERSONAL_DATA } from '@/data';
import Link from 'next/link';

export function MoreInformationButton() {
  return (
    <Link
      href={ROUTES.ABOUT_ME}
      className="border-b px-3 pb-1 duration-200 hover:px-5"
      onClick={() => sendGTMEvent(GTM_EVENTS.MORE_ABOUT_ME)}
    >
      More About {PERSONAL_DATA.firstName}
    </Link>
  );
}
