'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';

interface TrackedAnchorProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick'
> {
  trackingPayload: Parameters<typeof sendGTMEvent>[0];
  children: ReactNode;
}

/**
 * Plain `<a>` tag that fires a GTM event on click. Use this for **external** links
 * (anything that doesn't go through the Next router). For internal navigation use
 * `<TrackedLink>` which wraps `next/link`.
 */
export function TrackedAnchor({
  trackingPayload,
  children,
  ...anchorProps
}: TrackedAnchorProps) {
  return (
    <a {...anchorProps} onClick={() => sendGTMEvent(trackingPayload)}>
      {children}
    </a>
  );
}
