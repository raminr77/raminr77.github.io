'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import Link from 'next/link';

export function BackToPostButton() {
  return (
    <Link
      href={ROUTES.POSTS}
      onClick={() => sendGTMEvent(GTM_EVENTS.POST_CARD('Back to Post List Page'))}
      className="border-b border-amber-500 px-4 pb-1 duration-300 hover:text-amber-500"
    >
      Back To All Posts
    </Link>
  );
}
