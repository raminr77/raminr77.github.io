'use client';

import { Icon } from '@/shared/components/icon';
import { notify } from '@/shared/helpers';

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
      <Icon alt="Share" name="new-tab" />
      <p>Share</p>
    </button>
  );
}
