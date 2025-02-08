import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://69306522276668f196ff4957161faa4c@o4508781012582400.ingest.de.sentry.io/4508781018939472",
  tracesSampleRate: 1,
  debug: false,
});
