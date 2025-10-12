import Link from 'next/link';

import { clsx } from 'clsx';

import { PostTags } from '@/domains/posts/components/post-tags';
import type { PostMetadata } from '@/shared/types/post';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import { PostCategory } from '../post-category';
import { PostDate } from '../post-date';

import styles from './post-card.module.scss';

export function PostCard({
  data,
  animationDelay = 1,
  disabledAnimation = false
}: {
  data: PostMetadata;
  animationDelay?: number;
  disabledAnimation?: boolean;
}) {
  const { id, title, slug, description, tags, date, isActive, category } = data;
  const postDetailUrl = `${ROUTES.POSTS}${id}?slug=${slug}`;

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={clsx(
        'group flex flex-col bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 justify-between border border-slate-300/40 overflow-hidden',
        !disabledAnimation && animator({ name: 'fadeIn' }),
        styles['post-card']
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* 
      TODO: Thinking about Post cover :D
      <img
        alt={title}
        src="/images/screenshot-02.png"
        className="w-full h-full absolute opacity-0 -top-1/2 group-hover:top-1/2 left-1/2 -translate-1/2 z-20 duration-500 group-hover:opacity-100 object-cover"
      /> 
      */}

      <div className="flex flex-col gap-2 z-10">
        <Link
          href={postDetailUrl}
          className={clsx('text-lg font-bold text-amber-500', titleFont.className)}
        >
          {title}
        </Link>
        <PostCategory category={category} />

        <p className="[&>*]:mb-3 [&>*:last-child]:mb-0 text-md overflow-hidden">
          {description.substring(0, 210)}
          {description.length > 210 ? '...' : ''}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-3 z-10">
        <PostTags postId={id} tags={tags} />

        <div className="flex select-none items-center justify-between">
          <PostDate date={date} />
          <Link href={postDetailUrl} className="text-amber-500">
            [ Read More ]
          </Link>
        </div>
      </div>
    </div>
  );
}
