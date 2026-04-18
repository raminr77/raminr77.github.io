# Environment Variables

This document lists all environment variables used in the project.

---

## How to Set Up

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

Next.js loads `.env.local` automatically. Never commit `.env.local` to Git — it is in `.gitignore`.

---

## Variable Reference

### Core

| Variable   | Required | Description                                                                              |
| ---------- | -------- | ---------------------------------------------------------------------------------------- |
| `NODE_ENV` | Auto     | Set by Node.js. `development` locally, `production` in builds. Do not set this manually. |

---

### Google reCAPTCHA

Used by the contact form to prevent spam.

| Variable                                | Required | Where It Is Used                                                                |
| --------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` | Yes      | Client-side — passed to the reCAPTCHA widget                                    |
| `GOOGLE_RECAPTCHA_SECRET_KEY`           | Yes      | Server-side only — used in `/api/recaptcha-verify` to verify tokens with Google |

> The secret key does **not** have `NEXT_PUBLIC_` prefix. This keeps it server-only and never exposed to the browser.

To get these keys:

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v3
3. Copy the Site Key and Secret Key

---

### Sentry (Error Monitoring)

| Variable                     | Required | Description                                            |
| ---------------------------- | -------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SENTRY_DSN`     | No       | Sentry project DSN — enables error reporting           |
| `NEXT_PUBLIC_SENTRY_ORG`     | No       | Sentry organization name — used for source map uploads |
| `NEXT_PUBLIC_SENTRY_PROJECT` | No       | Sentry project name                                    |
| `SENTRY_AUTH_TOKEN`          | No       | Sentry auth token — used in CI to upload source maps   |

If `NEXT_PUBLIC_SENTRY_DSN` is not set, Sentry is disabled and no errors are reported.

---

### Google Analytics and Tag Manager

| Variable                                      | Required | Description                                                            |
| --------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_IR_DOMAIN` | No       | Google Analytics 4 Measurement ID For .ir domain (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_SE_DOMAIN` | No       | Google Analytics 4 Measurement ID For .se domain (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE`         | No       | GTM Container ID (e.g. `GTM-XXXXXXX`)                                  |
| `NEXT_PUBLIC_GOOGLE_ADSENSE`                  | No       | Google AdSense Publisher ID                                            |

These are only loaded after the user accepts cookies (via the `CookiesModal`).

---

### Build Tools

| Variable                   | Required | Default | Description                                          |
| -------------------------- | -------- | ------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_ANALYZE_MODE` | No       | `false` | Set to `true` to enable bundle analysis during build |

---

## Variable Naming Convention

Next.js has two types of environment variables:

| Prefix         | Visible In         | Use For                        |
| -------------- | ------------------ | ------------------------------ |
| `NEXT_PUBLIC_` | Browser and server | Values safe to expose publicly |
| _(no prefix)_  | Server only        | Secrets and sensitive keys     |

**Rule:** Never put a secret value in a `NEXT_PUBLIC_` variable. It will be included in the JavaScript bundle that browsers download.

---

## Example `.env.local` File

```env
# reCAPTCHA
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=your_secret_key_here

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxx@sentry.io/xxxx
NEXT_PUBLIC_SENTRY_ORG=your-org
NEXT_PUBLIC_SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your_auth_token

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_ADSENSE=ca-pub-XXXXXXXXXXXXXXXX
```

---

## Accessing Variables in Code

Environment variables are accessed through typed constants in `src/shared/constants/env.ts`:

```typescript
import { ENV } from '@/shared/constants/env';

// Use ENV.GOOGLE_ANALYTICS_CODE instead of process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE
// This gives you type safety and a single place to manage env access
```

This is the recommended pattern. Avoid calling `process.env` directly in components.
