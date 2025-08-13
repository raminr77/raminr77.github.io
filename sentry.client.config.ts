import * as Sentry from '@sentry/nextjs';

if (process.env.SENTRY_ENABLED === "true") {
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    tracesSampleRate: 1,
    debug: false
  });
}