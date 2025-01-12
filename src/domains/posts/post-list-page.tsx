import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { PERSONAL_DATA, type Post, POSTS_DATA } from '@/data';
import { PostCard } from '@/domains/posts/components/post-card';
import { ContentContainer } from '@/layout/components/content-container';

export const metadata: Metadata = {
  title: `${PERSONAL_DATA.fullName} | Posts`
};

export async function PostListPage() {
  return (
    <ContentContainer animationName='fadeIn'>
      <h1
        className={clsx(
          'mb-4 text-center text-4xl font-bold',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        {`${PERSONAL_DATA.firstName}'s Post`}
      </h1>
      <div className='mt-8 grid grid-cols-3 gap-4 overflow-hidden max-lg:grid-cols-2 max-md:grid-cols-1'>
        {POSTS_DATA.map((post: Post, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
