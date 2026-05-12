import * as Sentry from '@sentry/nextjs';

import { ENV } from '@/shared/constants';

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

// In production we sample 10% of traces and 5% of sessions to stay inside Sentry's free quota.
// Errors and on-error replays are still captured at 100% — those matter regardless of traffic.
const CLIENT_TRACES_SAMPLE_RATE = isProduction ? 0.1 : 1.0;
const REPLAYS_SESSION_SAMPLE_RATE = isProduction ? 0.05 : 0.1;

// Skip Sentry entirely when disabled — keeps the integrations + their listeners off the
// hot path for sites where Sentry is opt-in (env not set in preview / personal forks).
if (ENV.SENTRY_ENABLED) {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    debug: false,
    tracesSampleRate: CLIENT_TRACES_SAMPLE_RATE,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: REPLAYS_SESSION_SAMPLE_RATE,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()]
  });
}
