'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import Link from 'next/link';
import clsx from 'clsx';

interface EmptyPostBlockProps {
  hasFilter: boolean;
}

export function EmptyPostBlock({ hasFilter }: EmptyPostBlockProps) {
  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-2 justify-center w-full mt-10',
        animator({ name: 'bounceInUp' })
      )}
    >
      <p className={clsx('text-center text-xl font-bold', titleFont.className)}>
        No posts found.
      </p>
      <p>There are no posts that match your search or filters.</p>
      {hasFilter && (
        <Link
          href={ROUTES.POSTS}
          className="text-amber-500 mt-3"
          onClick={() => sendGTMEvent(GTM_EVENTS.CLEAR_FILTERS)}
        >
          Clear Your Filter
        </Link>
      )}
    </div>
  );
}
