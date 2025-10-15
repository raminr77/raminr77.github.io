'use client';
import Link from 'next/link';

import { generateFilteredPostUrl } from '@/shared/helpers/posts/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { Icons } from '@/shared/components/icons';
import { GTM_EVENTS } from '@/shared/constants';

export function PostCategory({
  category,
  showLabel = false
}: {
  showLabel?: boolean;
  category: string;
}) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="category" />
      {showLabel && <span>Category</span>}
      <Link
        className="text-amber-500"
        href={generateFilteredPostUrl({ category })}
        onClick={() => sendGTMEvent(GTM_EVENTS.POST_CARD(`Category: ${category}`))}
      >
        {category.toUpperCase()}
      </Link>
    </div>
  );
}
