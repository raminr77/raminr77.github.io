import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import type { PostMetadata, PostFilters } from '@/shared/types/post';
import { PostCard } from '@/domains/posts/components/post-card';
import { getPosts } from '@/shared/helpers/posts/get-posts';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import { PostsCategoryFilter } from './components/posts-category-filter';
import { EmptyPostBlock } from './components/empty-post-block';
import { PostsSearch } from './components/posts-search';

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
          'mb-4 text-center text-2xl font-bold',
          titleFont.className,
          animator({ name: 'fadeIn' })
        )}
      >
        {`${PERSONAL_DATA.firstName}'s Post`}
      </h1>

      {posts.length === 0 ? (
        <EmptyPostBlock hasFilter={!!filters} />
      ) : (
        <div
          className={clsx(
            'flex items-center justify-between flex-wrap gap-4',
            animator({ name: 'fadeIn', delay: '1s' })
          )}
        >
          <PostsCategoryFilter activeFilters={filters} categories={categories} />
          <PostsSearch />
        </div>
      )}

      <div className="mt-4 overflow-hidden grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2">
        {posts.map((post: PostMetadata, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
