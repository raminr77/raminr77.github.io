import Link from 'next/link';

import { clsx } from 'clsx';

import { PostTags } from '@/domains/posts/components/post-tags';
import { generateFilteredPostUrl } from '../../helpers';
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
  const postDetailUrl = `${ROUTES.POSTS}${id}?slug=${slug}`;

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
      <Link href={postDetailUrl} className="text-amber-500">
        <h3 className={clsx('text-lg font-bold', titleFont.className)}>{title}</h3>
      </Link>
      <div className="flex gap-1 items-center text-sm">
        <p>Category:</p>
        <Link className="text-amber-500" href={generateFilteredPostUrl({ category })}>
          {category.toUpperCase()}
        </Link>
      </div>

      <p
        className="mb-3 mt-2 [&>*]:mb-3 [&>*:last-child]:mb-0 text-md"
        dangerouslySetInnerHTML={{ __html: description.html }}
      />

      <PostTags postId={id} tags={tags} />

      <div className="flex select-none items-center justify-between">
        <span>{format(parseISO(date), 'LLLL d, yyyy')}</span>
        <Link href={postDetailUrl} className="text-amber-500">
          Read More
        </Link>
      </div>
    </div>
  );
}
