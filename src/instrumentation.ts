import * as Sentry from '@sentry/nextjs';

import { ENV } from '@/shared/constants';

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

// Production keeps trace volume under Sentry's quota; local + preview sample everything
// for better debugging visibility.
const TRACES_SAMPLE_RATE = isProduction ? 0.1 : 1.0;

// Next.js calls `register` for every runtime. The signature is `() => Promise<void> | void`,
// so a sync function is allowed here.
export function register(): void {
  // Both nodejs and edge runtimes share the same config shape. Sentry tree-shakes
  // the parts that don't apply to the current runtime, so this is safe for either.
  if (ENV.NEXT_RUNTIME === 'nodejs' || ENV.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      enabled: ENV.SENTRY_ENABLED,
      dsn: ENV.SENTRY_DSN,
      tracesSampleRate: TRACES_SAMPLE_RATE,
      debug: false
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
