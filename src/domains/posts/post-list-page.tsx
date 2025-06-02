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
import { CategoryFilterSection } from './components/filter-section';

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
          {!!filters && (
            <Link className="text-amber-500 mt-3" href={ROUTES.POSTS}>
              Clear Your Filter
            </Link>
          )}
        </div>
      ) : (
        <CategoryFilterSection
          activeFilters={filters}
          categories={categories}
        />
      )}

      <div
        className="mt-8 gap-4 overflow-hidden columns-3 max-md:columns-1 max-lg:columns-2"
      >
        {posts.map((post: PostMetadata, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
