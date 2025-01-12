import { clsx } from 'clsx';
import Link from 'next/link';
import { titleFont } from '@/app/fonts';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { type Post, POSTS_DATA } from '@/data';
import { ContentContainer } from '@/layout/components/content-container';

import styles from './post-detail-page.module.scss';

export async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params;
  const post: Post | null =
    POSTS_DATA.find(({ id }: Post) => String(id) === postId) || null;

  if (!post) {
    redirect(ROUTES.POSTS);
  }

  return (
    <ContentContainer animationName='fadeIn'>
      <h1
        className={clsx(
          'mb-8 text-center text-4xl font-bold',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        {post.title}
      </h1>

      <p className='mb-5 text-xl'>{post.summary}</p>

      <div className={clsx('text-xl leading-8', styles['post-detail-page__text'])} dangerouslySetInnerHTML={{ __html: post.text }} />

      <div
        className={clsx(
          'my-10 flex items-center justify-between border-t pt-4',
          animator({ name: 'fadeInUp', delay: '2s' })
        )}
      >
        <Link
          href={ROUTES.POSTS}
          className='border-b border-amber-500 px-4 pb-1 duration-300 hover:text-amber-500'
        >
          Back to list
        </Link>
        <span>{post.created}</span>
      </div>
    </ContentContainer>
  );
}
