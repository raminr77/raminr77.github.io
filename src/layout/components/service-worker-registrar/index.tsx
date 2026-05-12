'use client';
import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

import { ENV } from '@/shared/constants';

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (ENV.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/service-worker.js').catch((error: unknown) => {
      if (ENV.SENTRY_ENABLED) {
        Sentry.captureException(error, { tags: { component: 'service-worker' } });
      }
    });
  }, []);

  return null;
}
