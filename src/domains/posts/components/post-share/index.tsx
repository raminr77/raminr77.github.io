'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS } from '@/shared/constants';
import { Icons } from '@/shared/components';
import { notify } from '@/shared/helpers';

const COPY_SUCCESS_MESSAGE = 'Share link copied to clipboard!';
const COPY_ERROR_MESSAGE = 'Failed to copy share link.';

async function copyToClipboard(text: string): Promise<boolean> {
  // Modern API requires a secure context (https/localhost).
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy fallback
    }
  }

  // Legacy fallback for insecure contexts and older browsers.
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  let success: boolean;
  try {
    success = document.execCommand('copy');
  } catch {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

export function PostShare({ postId }: { postId: number }) {
  const handleCopyShareLink = async () => {
    const shareLink = `${window.location.origin}/posts/${postId}/`;
    sendGTMEvent(GTM_EVENTS.POST_CARD(`Shared: ${postId}`));

    const ok = await copyToClipboard(shareLink);
    if (ok) {
      notify.success({ message: COPY_SUCCESS_MESSAGE });
    } else {
      notify.error({ message: COPY_ERROR_MESSAGE });
    }
  };

  return (
    <button
      type="button"
      aria-label="Share post"
      onClick={() => {
        void handleCopyShareLink();
      }}
      title="Copy share link to clipboard"
      className="flex gap-1 items-center select-none hover:text-amber-500 duration-300"
    >
      <Icons name="share" />
      <p>Share</p>
    </button>
  );
}
