import { redirect } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { clsx } from 'clsx';
import React from 'react';

import { getPostContent } from '@/shared/helpers/posts/get-post-content';
import { ContentContainer } from '@/layout/components/content-container';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import { PostReadTime } from './components/post-read-time';
import { PostCategory } from './components/post-category';
import { PostAuthor } from './components/post-author';
import { PostTags } from './components/post-tags';
import { PostDate } from './components/post-date';

import type { Post } from '@/shared/types/post';

import styles from './post-detail-page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: postId } = await params;
  const post: Post | null = getPostContent(Number(postId));

  return {
    title: post?.title ?? 'Post Not Found',
  };
}

export async function PostDetailPage({ params }: Props) {
  const { id: postId } = await params;
  const post: Post | null = getPostContent(Number(postId));

  if (!post) {
    redirect(ROUTES.POSTS);
  }

  return (
    <ContentContainer animationName="fadeIn">
      <h1
        className={clsx(
          'mb-8 text-center text-4xl font-bold',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        {post.title}
      </h1>

      <div className="mb-4 flex gap-5 max-md:flex-col max-md:gap-2">
        <PostAuthor author={post.author} />
        <PostCategory showLabel category={post.category} />
        <PostDate date={post.date} />
        <PostReadTime words={post.content} />
      </div>

      <Markdown className="mb-5 [&>*]:mb-3 [&>*:last-child]:mb-0 text-xl">
        {post.description}
      </Markdown>

      <Markdown
        className={clsx(
          'text-xl leading-8 [&>*]:mb-3 [&>*:last-child]:mb-4',
          styles['post-detail-page__text']
        )}
      >
        {post.content}
      </Markdown>

      <PostTags postId={post.id} tags={post.tags} />

      <div
        className={clsx(
          'my-10 flex items-center justify-between border-t pt-4',
          animator({ name: 'fadeInUp', delay: '2s' })
        )}
      >
        <Link
          href={ROUTES.POSTS}
          className="border-b border-amber-500 px-4 pb-1 duration-300 hover:text-amber-500"
        >
          Back to list
        </Link>
        <PostDate date={post.date} />
      </div>

      <Script defer strategy="lazyOnload" src="/highlight.min.js" />
      <Script defer strategy="lazyOnload" src="/highlight-loader.js" />
    </ContentContainer>
  );
}
