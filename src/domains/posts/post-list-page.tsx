import type { Metadata } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { PostCard } from '@/domains/posts/components/post-card';
import { getPosts } from '@/shared/helpers/posts/get-posts';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import type { PostMetadata, PostFilters } from '@/shared/types/post';

interface PostListPageProps {
  searchParams: Promise<PostFilters>;
}

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage({ searchParams }: PostListPageProps) {
  const filterObject = await searchParams;
  const filters = Object.keys(filterObject).length > 0 ? filterObject : null;
  const { data: posts, categories } = getPosts(filters);

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

      {posts.length === 0 ? (
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
      ) : (
        <div className="flex items-center flex-wrap gap-3">
          {categories.map((item) => (
            <Link
              key={item}
              href={`?category=${item}`}
              className="border px-4 py-1 text-md hover:border-amber-500 bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5"
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4 overflow-hidden max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((post: PostMetadata, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
