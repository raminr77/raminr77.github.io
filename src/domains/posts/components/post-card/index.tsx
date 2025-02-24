import Link from 'next/link';

import { clsx } from 'clsx';

import type { Post } from 'contentlayer/generated';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { format, parseISO } from 'date-fns';
import { titleFont } from '@/app/fonts';

export function PostCard({
  data,
  animationDelay = 1
}: {
  data: Post;
  animationDelay?: number;
}) {
  const { id, title, slug, description, tags, date, isActive, category } = data;
  const url = `${ROUTES.POSTS}${id}?slug=${slug}`;

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex flex-col border bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5',
        animator({ name: 'fadeIn' })
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <Link href={url} className="text-amber-500">
        <h3 className={clsx('text-lg font-bold', titleFont.className)}>{title}</h3>
      </Link>
      <span className='text-sm'>{`Category: ${category.toUpperCase()}`}</span>

      <p
        className="mb-3 mt-2 [&>*]:mb-3 [&>*:last-child]:mb-0 text-md"
        dangerouslySetInnerHTML={{ __html: description.html }}
      />

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
        <span>{format(parseISO(date), 'LLLL d, yyyy')}</span>
        <Link href={url} className="text-amber-500">
          Read More
        </Link>
      </div>
    </div>
  );
}
