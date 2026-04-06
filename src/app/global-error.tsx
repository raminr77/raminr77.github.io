'use client';

import { useEffect } from 'react';

import NextError from 'next/error';

import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.host.includes('localhost')) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
