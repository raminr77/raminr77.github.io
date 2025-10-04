import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_URL,
    tracesSampleRate: 1,
    debug: false
  });
}
