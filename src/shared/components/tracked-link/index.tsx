'use client';

import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';

interface TrackedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  rel?: string;
  target?: string;
  trackingPayload: Parameters<typeof sendGTMEvent>[0];
}

/**
 * Drop-in replacement for `<Link>` that fires a GTM event on click.
 * Use this to keep a parent Server Component server-rendered while only the
 * click handler runs on the client.
 */
export function TrackedLink({
  children,
  trackingPayload,
  ...linkProps
}: TrackedLinkProps) {
  return (
    <Link {...linkProps} onClick={() => sendGTMEvent(trackingPayload)}>
      {children}
    </Link>
  );
}
