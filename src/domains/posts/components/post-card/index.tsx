import { clsx } from 'clsx';

import { PostTags } from '@/domains/posts/components/post-tags';
import type { PostMetadata } from '@/shared/types/post';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { TrackedLink } from '@/shared/components';
import { animator } from '@/shared/helpers';

import { PostCategory } from '../post-category';
import { PostDate } from '../post-date';

import styles from './post-card.module.scss';

const DESCRIPTION_LIMIT = 210;

interface PostCardProps {
  data: PostMetadata;
  animationDelay?: number;
  disabledAnimation?: boolean;
}

export function PostCard({
  data,
  animationDelay = 1,
  disabledAnimation = false
}: PostCardProps) {
  const { id, title, slug, description, tags, date, isActive, category } = data;

  if (!isActive) return null;

  const postDetailUrl = `${ROUTES.POSTS}${id}?slug=${slug}`;
  const shortDescription =
    description.length > DESCRIPTION_LIMIT
      ? `${description.substring(0, DESCRIPTION_LIMIT)}...`
      : description;

  return (
    <div
      className={clsx(
        'group flex flex-col bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 justify-between border border-slate-300/40 overflow-hidden',
        !disabledAnimation && animator({ name: 'fadeIn' }),
        styles['post-card']
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex flex-col gap-2 z-10">
        <TrackedLink
          href={postDetailUrl}
          className="text-lg font-bold text-amber-500 font-title"
          trackingPayload={GTM_EVENTS.POST_CARD(title)}
        >
          {title}
        </TrackedLink>
        <PostCategory category={category} />

        <p className="[&>*]:mb-3 [&>*:last-child]:mb-0 text-md overflow-hidden">
          {shortDescription}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-3 z-10">
        <PostTags postId={id} tags={tags} />

        <div className="flex select-none items-center justify-between">
          <PostDate date={date} />
          <TrackedLink
            href={postDetailUrl}
            className="text-amber-500"
            trackingPayload={GTM_EVENTS.POST_CARD(`Read More: ${title}`)}
          >
            [ Read More ]
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
