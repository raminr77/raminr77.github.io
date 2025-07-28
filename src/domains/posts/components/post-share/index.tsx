'use client';

import { notify } from '@/shared/helpers';
import Image from 'next/image';

export function PostShare({ postId }: { postId: number }) {
  const handleCopyShareLink = () => {
    const shareLink = `${window.location.origin}/posts/${postId}/`;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        notify.success({ message: 'Share link copied to clipboard!' });
      })
      .catch((error) => {
        console.error('Failed to copy share link:', error);
        notify.error({ message: 'Failed to copy share link.' });
      });
  };

  return (
    <button
      type="button"
      aria-label="Share post"
      onClick={handleCopyShareLink}
      title="Copy share link to clipboard"
      className="flex gap-1 items-center select-none hover:text-amber-500 duration-300"
    >
      <Image
        width={20}
        height={20}
        loading="lazy"
        alt="Category"
        className="dark:invert"
        src="/images/new-tab-icon.svg"
      />
      <p>Share</p>
    </button>
  );
}
