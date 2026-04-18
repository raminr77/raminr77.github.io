'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { GENERAL_SITE_DATA } from '@/data';
import Link from 'next/link';
import clsx from 'clsx';

interface EmptyPostBlockProps {
  hasFilter: boolean;
}

export function EmptyPostBlock({ hasFilter }: EmptyPostBlockProps) {
  const { emptyState } = GENERAL_SITE_DATA.posts;
  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-2 justify-center w-full mt-4 min-h-[400px] border-t border-slate-300/40',
        animator({ name: 'fadeIn' })
      )}
    >
      <p className="text-center text-xl font-bold font-title">{emptyState.title}</p>
      <p>{emptyState.description}</p>
      {hasFilter && (
        <Link
          href={ROUTES.POSTS}
          className="text-amber-500 mt-3"
          onClick={() => sendGTMEvent(GTM_EVENTS.CLEAR_FILTERS)}
        >
          {emptyState.clearFilter}
        </Link>
      )}
    </div>
  );
}
