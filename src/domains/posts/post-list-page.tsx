import type { Metadata } from 'next';

import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { PostCard } from '@/domains/posts/components/post-card';
import { allPosts, type Post } from 'contentlayer/generated';
import { postSorter } from '@/domains/posts/helpers';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage() {
  const posts: Post[] = allPosts.sort(postSorter);
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
      <div className="mt-8 grid grid-cols-3 gap-4 overflow-hidden max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((post: Post, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
