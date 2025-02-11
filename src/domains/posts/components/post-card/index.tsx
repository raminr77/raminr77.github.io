import Link from 'next/link';

import { clsx } from 'clsx';

import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import type { Post } from '@/data';

export function PostCard({
  data,
  animationDelay = 1
}: {
  data: Post;
  animationDelay?: number;
}) {
  const { id, title, summary, tags, created } = data;
  const url = `${ROUTES.POSTS}${id}`;

  return (
    <div
      className={clsx(
        'flex flex-col border bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5',
        animator({ name: 'fadeIn' })
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Link href={url} className="text-amber-500">
        <h3 className={clsx('font-bold', titleFont.className)}>{title}</h3>
      </Link>

      <p className="text-md mb-3 mt-1 h-20">{summary.slice(0, 110)}...</p>

      {tags.length > 0 && (
        <div className="mb-2 flex select-none flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <span
              key={`${id}-${tag}-${index}`}
              className="rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-slate-600/50"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex select-none items-center justify-between">
        <span>{created}</span>
        <Link href={url} className="text-amber-500">
          Read More
        </Link>
      </div>
    </div>
  );
}
