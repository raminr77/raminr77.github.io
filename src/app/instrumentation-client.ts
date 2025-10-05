import { ENV } from '@/shared/constants';
import * as Sentry from '@sentry/nextjs';

if (ENV.SENTRY_ENABLED) {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,

    debug: false,
    tracesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()]
  });
}
