import Markdown, { RuleType } from 'markdown-to-jsx';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { clsx } from 'clsx';
import React from 'react';

import type { Post, PostFilters, PostMetadata } from '@/shared/types/post';
import { ClientCodeLoader } from '@/shared/components/client-code-loader';
import { getPostContent } from '@/shared/helpers/posts/get-post-content';
import { ContentContainer } from '@/layout/components/content-container';
import { PostCard } from '@/domains/posts/components/post-card';
import { getPosts } from '@/shared/helpers/posts/get-posts';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import { BackToPostButton } from './components/back-to-posts-button';
import { PostReadTime } from './components/post-read-time';
import { PostCategory } from './components/post-category';
import { PostAuthor } from './components/post-author';
import { PostShare } from './components/post-share';
import { PostTags } from './components/post-tags';
import { PostDate } from './components/post-date';

import styles from './post-detail-page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: postId } = await params;
  const post: Post | null = getPostContent(Number(postId));

  return {
    title: post?.title ?? 'Post Not Found',
    description: post?.description ?? PERSONAL_DATA.pageDescription
  };
}

export async function PostDetailPage({ params }: Props) {
  const { id: postId } = await params;
  const post: Post | null = getPostContent(Number(postId));
  const { data: sameCategoryPosts = [] } = getPosts(
    post ? ({ category: post.category } as PostFilters) : null
  );
  const recommendedPosts = sameCategoryPosts
    .filter(({ id }) => id !== Number(postId))
    .slice(0, 3);

  if (!post) {
    redirect(ROUTES.POSTS);
  }

  return (
    <ContentContainer animationName="fadeIn">
      <h1
        className={clsx(
          titleFont.className,
          'mb-12 text-center text-2xl ',
          animator({ name: 'fadeIn' })
        )}
      >
        {post.title}
      </h1>

      <div className="mb-4 flex gap-2 justify-between items-center border-b border-slate-300/40 pb-3 max-md:flex-col max-md:items-start">
        <div className="flex gap-5 max-md:flex-wrap max-md:gap-2">
          <PostAuthor author={post.author} />
          <PostCategory showLabel category={post.category} />
          <PostDate date={post.date} />
          <PostReadTime words={post.content} />
        </div>
        <PostShare postId={post.id} />
      </div>

      <Markdown className="mb-5 [&>*]:mb-3 [&>*:last-child]:mb-0 text-xl">
        {post.description}
      </Markdown>

      <Markdown
        className={clsx(
          'text-xl leading-8 [&>*]:mb-3 [&>*:last-child]:mb-4',
          styles['post-detail-page__text']
        )}
        options={{
          renderRule: (next, node, ـ, state) => {
            if (node.type === RuleType.table) {
              return (
                <div
                  className={styles['post-detail-page__table-container']}
                  key={state.key}
                >
                  {next()}
                </div>
              );
            }

            return next();
          }
        }}
      >
        {post.content}
      </Markdown>

      <PostTags postId={post.id} tags={post.tags} />

      <div className="my-10 flex items-center justify-between border-t border-slate-300/40 pt-4">
        <BackToPostButton />
        <PostDate date={post.date} />
      </div>

      {recommendedPosts.length > 0 ? (
        <div className="flex overflow-x-auto gap-4 mb-6 max-lg:flex-col">
          {recommendedPosts.map((post: PostMetadata) => (
            <PostCard key={post.id} data={post} disabledAnimation />
          ))}
        </div>
      ) : null}

      <ClientCodeLoader />
    </ContentContainer>
  );
}
