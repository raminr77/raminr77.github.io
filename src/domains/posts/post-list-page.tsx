import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { Pagination, PAGE_SIZE } from '@/shared/components/pagination';
import type { PostMetadata, PostFilters } from '@/shared/types/post';
import { PostCard } from '@/domains/posts/components/post-card';
import { getPosts } from '@/shared/helpers/posts/get-posts';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { PERSONAL_DATA } from '@/data';

import { PostsCategoryFilter } from './components/posts-category-filter';
import { EmptyPostBlock } from './components/empty-post-block';
import { PostsSearch } from './components/posts-search';

type PostsSearchParams = PostFilters & { page?: string };

interface PostListPageProps {
  searchParams: Promise<PostsSearchParams>;
}

export const metadata: Metadata = {
  title: 'Posts'
};

export async function PostListPage({ searchParams }: PostListPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const filters: PostFilters | null =
    params.category || params.tag ? { category: params.category, tag: params.tag } : null;

  const { data: allPosts, categories } = getPosts(filters);

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const posts = allPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const paginationParams: Record<string, string> = {};
  if (params.category) paginationParams.category = params.category;
  if (params.tag) paginationParams.tag = params.tag;

  return (
    <ContentContainer animationName="fadeIn" className="relative">
      <h3
        className={clsx(
          'mb-4 text-center text-2xl font-bold font-title',
          animator({ name: 'fadeIn' })
        )}
      >
        {`${PERSONAL_DATA.firstName}'s Post`}
      </h3>

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
