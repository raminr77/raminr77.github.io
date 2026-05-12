# Environment Variables

Every environment variable the project reads, where it is used, and which `.env` file ships with it.

---

## Setup

```bash
cp .env.example .env.local
```

Next.js loads `.env.local` automatically. `.env.local` is in `.gitignore` — never commit it.

The single source of truth in code is `src/shared/constants/env.ts`, which exports a typed `ENV` object. Import `ENV` everywhere rather than touching `process.env` directly.

---

## Variable reference

### Core

| Variable       | Required | Where it lives              | Notes                                                                                                       |
| -------------- | -------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`     | auto     | server + client             | Set by Node.js. Don't set manually.                                                                         |
| `NEXT_RUNTIME` | auto     | server (`nodejs` or `edge`) | Set by Next.js. Read by `src/instrumentation.ts` to gate Sentry init.                                       |
| `VERCEL_ENV`   | auto     | Vercel deploys only         | `production`, `preview`, or `development`. Read by `src/app/robots.ts` to gate indexing on preview deploys. |

### Google reCAPTCHA (v3)

| Variable                                | Scope  | Required for            | Notes                                                            |
| --------------------------------------- | ------ | ----------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` | client | Contact form            | Loaded into the reCAPTCHA provider in `src/domains/contact-me/`. |
| `GOOGLE_RECAPTCHA_SECRET_KEY`           | server | `/api/recaptcha-verify` | **No `NEXT_PUBLIC_` prefix** — must stay off the client bundle.  |

Get the keys from the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin). The contact form uses reCAPTCHA v3.

### Sentry

| Variable                     | Scope            | Notes                                                                                                      |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_ENABLED` | client + server  | `'true'` enables Sentry. Anything else (including empty) disables every integration so no events are sent. |
| `NEXT_PUBLIC_SENTRY_URL`     | client + server  | The Sentry DSN. Required when `NEXT_PUBLIC_SENTRY_ENABLED=true`.                                           |
| `SENTRY_AUTH_TOKEN`          | server (CI only) | Used by the Sentry build plugin to upload source maps. Set as a CI secret; never commit it.                |

In code, `ENV.SENTRY_ENABLED` and `ENV.SENTRY_DSN` are exposed via `src/shared/constants/env.ts`. The init lives in `src/instrumentation.ts` (server + edge) and `src/app/instrumentation-client.ts` (browser).

Sample rates: 100 % locally, 10 % traces / 5 % session replays in production (`VERCEL_ENV === 'production'`).

### Google Analytics & Tag Manager

| Variable                                      | Scope  | Notes                                                                                |
| --------------------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_SE_DOMAIN` | client | GA4 Measurement ID used when the hostname does **not** end in `.ir` (e.g. `G-XXXX`). |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_IR_DOMAIN` | client | GA4 Measurement ID used when the hostname ends in `.ir`.                             |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE`         | client | GTM container ID (`GTM-XXXXXXX`). Loaded inline in `src/app/layout.tsx`.             |
| `NEXT_PUBLIC_GOOGLE_ADSENSE`                  | client | AdSense Publisher ID. Only injected when set.                                        |

All four only load after the user accepts cookies via `<CookiesModal>` (see `src/layout/components/third-party-scripts/`).

### Build tools

| Variable                   | Scope  | Default | Notes                                                             |
| -------------------------- | ------ | ------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_ANALYZE_MODE` | client | `false` | Set to `'true'` to mount the in-page `<PerformanceMonitor>`.      |
| `ANALYZE`                  | server | unset   | `pnpm build:analyze` sets this — toggles `@next/bundle-analyzer`. |

---

## `NEXT_PUBLIC_` rule of thumb

Next.js exposes anything prefixed with `NEXT_PUBLIC_` to the browser bundle. Every other variable is server-only.

Never put a secret in a `NEXT_PUBLIC_` variable. If a value is required on the client, it must be safe to publish (a site key, a measurement ID, a public DSN). Anything sensitive (secret keys, auth tokens) stays unprefixed.

---

## Example `.env.local`

```env
NODE_ENV=development

# Sentry (disabled by default; flip to true and fill the URL to enable)
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_SENTRY_URL=
NEXT_PUBLIC_SENTRY_ENABLED=false

# Bundle analyzer
NEXT_PUBLIC_ANALYZE_MODE=false

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE=

# Google Tag Manager + Analytics
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE=
NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_SE_DOMAIN=
NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_IR_DOMAIN=

# reCAPTCHA v3 (contact form)
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=
GOOGLE_RECAPTCHA_SECRET_KEY=
```

---

## Reading variables in code

```ts
import { ENV } from '@/shared/constants/env';

if (ENV.SENTRY_ENABLED) {
  // …
}

console.log(ENV.GOOGLE_ANALYTICS_CODE_SE_DOMAIN);
```

`ENV` returns `''` (or `undefined` for the runtime-only fields) when a variable is unset, so it is safe to read everywhere without an `if (process.env.X)` guard.
