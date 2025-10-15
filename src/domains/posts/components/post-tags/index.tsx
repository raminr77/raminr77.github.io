'use client';
import Link from 'next/link';

import { generateFilteredPostUrl } from '@/shared/helpers/posts/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS } from '@/shared/constants';

export function PostTags({ postId, tags = [] }: { postId: number; tags: string[] }) {
  return (
    tags.length > 0 && (
      <div className="mb-2 flex select-none flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <Link
            target="_blank"
            key={`post-${postId}-${tag}-${index}`}
            href={generateFilteredPostUrl({ tag })}
            onClick={() => sendGTMEvent(GTM_EVENTS.POST_CARD(`Tag: ${tag}`))}
            className="rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-slate-600/50"
          >
            {tag}
          </Link>
        ))}
      </div>
    )
  );
}
