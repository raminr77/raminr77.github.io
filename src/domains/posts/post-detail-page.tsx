import { format, parseISO } from 'date-fns';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { allPosts, type Post } from 'contentlayer/generated';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import styles from './post-detail-page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: postId } = await params;
  const post: Post | null =
    allPosts.find(({ id }: Post) => String(id) === postId) || null;

  return {
    title: post?.title
  };
}

export async function PostDetailPage({ params }: Props) {
  const { id: postId } = await params;
  const post: Post | null =
    allPosts.find(({ id }: Post) => String(id) === postId) || null;

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

      <p
        className="mb-5 [&>*]:mb-3 [&>*:last-child]:mb-0 text-xl"
        dangerouslySetInnerHTML={{ __html: post.description.html }}
      />

      <div
        className={clsx(
          'text-xl leading-8 [&>*]:mb-3 [&>*:last-child]:mb-0',
          styles['post-detail-page__text']
        )}
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />

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
        <span>{format(parseISO(post.date), 'LLLL d, yyyy')}</span>
      </div>
    </ContentContainer>
  );
}
