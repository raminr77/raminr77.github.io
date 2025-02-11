import type { Metadata } from 'next';

import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { PostCard } from '@/domains/posts/components/post-card';
import { PERSONAL_DATA, POSTS_DATA, type Post } from '@/data';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage() {
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
        {POSTS_DATA.map((post: Post, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
