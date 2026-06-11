import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { firstSearchParam, type RawSearchParams } from '@/shared/helpers/search-params';
import { Pagination, PAGE_SIZE, PageHeader } from '@/shared/components';
import type { PostMetadata, PostFilters } from '@/shared/types/post';
import { getPosts } from '@/shared/helpers/posts/get-posts';
import { ContentContainer } from '@/layout/components';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { PERSONAL_DATA } from '@/data';

import { PostCard, PostsCategoryFilter, EmptyPostBlock, PostsSearch } from './components';

interface PostListPageProps {
  searchParams: Promise<RawSearchParams>;
}

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage({ searchParams }: PostListPageProps) {
  const params = await searchParams;
  const tag = firstSearchParam(params.tag);
  const category = firstSearchParam(params.category);
  const page = Math.max(1, Number(firstSearchParam(params.page)) || 1);

  const filters: PostFilters | null = category || tag ? { category, tag } : null;

  const { data: allPosts, categories } = getPosts(filters);

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const posts = allPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const paginationParams: Record<string, string> = {};
  if (category) paginationParams.category = category;
  if (tag) paginationParams.tag = tag;

  return (
    <ContentContainer animationName="fadeIn" className="relative">
      <PageHeader
        className="mb-4 w-11/12 max-w-screen-lg"
        title={`${PERSONAL_DATA.firstName}'s Post`}
      />

      <div
        className={clsx(
          'flex items-center justify-between flex-wrap gap-4',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        <PostsCategoryFilter activeFilters={filters} categories={categories} />
        <PostsSearch />
      </div>

      {posts.length === 0 && <EmptyPostBlock hasFilter={!!filters} />}

      <div className="mt-4 overflow-hidden grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2 z-0">
        {posts.map((post: PostMetadata, index: number) => (
          <PostCard key={post.id} data={post} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        basePath={ROUTES.POSTS}
        searchParams={paginationParams}
      />
    </ContentContainer>
  );
}
