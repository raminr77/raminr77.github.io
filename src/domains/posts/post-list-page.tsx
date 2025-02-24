import type { Metadata } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { filterPostsByKey, postSorter } from '@/domains/posts/helpers';
import { PostCard } from '@/domains/posts/components/post-card';
import { allPosts, type Post } from 'contentlayer/generated';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

interface PostListPageProps {
  searchParams: Record<'tag' | 'category', string>;
}

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage({ searchParams }: PostListPageProps) {
  const filter = Object.keys(searchParams).length > 0 ? searchParams : null;
  const posts: Post[] = allPosts
    .filter((postItem: Post) => filterPostsByKey(postItem, filter))
    .sort(postSorter);

  return (
    <ContentContainer animationName="fadeIn">
      <h1
        className={clsx(
          'mb-4 text-center text-4xl font-bold',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        {`${PERSONAL_DATA.firstName}'s Post`}
      </h1>

      {posts.length === 0 && (
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
          <Link className="text-amber-500 mt-3" href={ROUTES.POSTS}>
            Clear Your Filter
          </Link>
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4 overflow-hidden max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((post: Post, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
