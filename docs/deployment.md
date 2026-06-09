# Deployment

How the site is built, deployed, and the CI workflows that gate every change.

---

## Building for production

```bash
pnpm build       # production build
pnpm start       # serve the .next output on http://localhost:3000
```

`pnpm build` runs `next build`, which:

- Compiles TypeScript to JavaScript
- Bundles and minifies code with Webpack
- Pre-renders static routes
- Streams dynamic routes (`/posts`, `/posts/[id]`, `/lens`, `/projects`, `/api/*`, sitemap, robots, feed) as on-demand server-rendered routes
- Writes the output to `.next/`

---

## Bundle analysis

```bash
pnpm build:analyze
```

Sets `ANALYZE=true` and runs `next build --webpack`. `@next/bundle-analyzer` writes HTML reports under `.next/analyze/`. Open one in a browser to see what is contributing to each chunk's size.

---

## Lighthouse

Local one-shot (start the production server first):

```bash
pnpm build
pnpm start &
pnpm lighthouse
```

`pnpm performance` does all three steps in one shot.

CI runs Lighthouse on every PR against the built site, see the `lighthouse` workflow below.

---

## Hosting

The site is hosted on **Vercel**. Deploys happen automatically through Vercel's Git integration:

- Push or merge to `master` → production deploy at <https://raminrezaei.se>.
- Push to any other branch (including `dev`) → preview deploy at a `*.vercel.app` URL. Preview deploys serve `Disallow: /` from `/robots.txt` (via `src/app/robots.ts`) so they don't get indexed.

There is no `deploy.yml` workflow in this repo, Vercel triggers builds via its own Git webhook and reports status back to GitHub.

---

## CI workflows

All workflow files live under `.github/workflows/`. Run on every push and PR unless noted.

| Workflow          | File               | Triggers                 | What it does                                                                                              |
| ----------------- | ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Build             | `build.yml`        | push + PR (master, dev)  | `pnpm check-format` then `next build`. Restores `.next/cache` between runs.                               |
| Tests             | `tests.yml`        | push + PR                | `jest --coverage --ci` (uploads coverage artifact, comments on PR) + Playwright E2E with cached browsers. |
| ESLint            | `eslint.yml`       | push                     | ESLint with SARIF upload to GitHub Code Scanning; also re-runs with `--max-warnings=0` on PR.             |
| TypeScript        | `tsc.yml`          | push                     | `tsc --noEmit`.                                                                                           |
| Dependency Review | `dependencies.yml` | PRs that touch lockfiles | `actions/dependency-review-action`. Comments severity summary.                                            |
| Lighthouse        | `lighthouse.yml`   | PR                       | Builds, starts the site, runs Lighthouse CI with budgets from `.lighthouserc.json`.                       |
| Bundle size       | `bundle-size.yml`  | PR                       | `pnpm build:analyze`, uploads the analyzer HTML as a downloadable artifact.                               |

Concurrency groups are set on each workflow so a new push cancels in-flight runs for the same ref.

CodeQL is **not** a committed workflow. It runs via GitHub's Default Setup (repo **Settings → Security → Code scanning**). That panel is the source of truth for its schedule and query suite.

---

## Dependabot

`.github/dependabot.yml` groups updates by purpose so each PR is reviewable:

| Group             | Packages                                                                                       | Cadence            | Target |
| ----------------- | ---------------------------------------------------------------------------------------------- | ------------------ | ------ |
| `next`            | `next`, `@next/*`, `eslint-config-next`                                                        | Weekly (Mon 06:00) | `dev`  |
| `react`           | `react`, `react-dom`, `@types/react*`                                                          | Weekly             | `dev`  |
| `sentry`          | `@sentry/*`                                                                                    | Weekly             | `dev`  |
| `testing`         | `jest*`, `ts-jest`, `@testing-library/*`, `@playwright/test`, `playwright`                     | Weekly             | `dev`  |
| `lint-and-format` | `eslint*`, `@eslint/*`, `typescript-eslint`, `prettier*`, `husky`, `lint-staged`, `@trivago/*` | Weekly             | `dev`  |
| `types`           | `@types/*`                                                                                     | Weekly             | `dev`  |
| `actions`         | All GitHub Actions                                                                             | Monthly            | `dev`  |

Major bumps are filtered to manual review, only `minor` / `patch` flow through automatic grouping.

---

## Environment variables in CI

Secrets are stored in **Settings → Secrets and variables → Actions** on GitHub. The workflows inject them into the build / test steps as environment variables. The Playwright E2E spec uses safe stubs (no real keys required) so most workflows can run without secrets.

Variables that genuinely need to be set as repo secrets for production builds:

| Secret                                        | Used for                                         |
| --------------------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`       | reCAPTCHA client widget                          |
| `GOOGLE_RECAPTCHA_SECRET_KEY`                 | `/api/recaptcha-verify` server-side verification |
| `SENTRY_AUTH_TOKEN`                           | Source-map upload during Vercel build            |
| `NEXT_PUBLIC_SENTRY_DSN`                      | Sentry DSN                                       |
| `NEXT_PUBLIC_SENTRY_ENABLED`                  | `'true'` to enable Sentry on production deploys  |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_SE_DOMAIN` | GA4 for `.se` hostname                           |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE_IR_DOMAIN` | GA4 for `.ir` hostname                           |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE`         | GTM container ID                                 |
| `NEXT_PUBLIC_GOOGLE_ADSENSE`                  | AdSense publisher ID (optional)                  |

These need to be set on **Vercel** (Project Settings → Environment Variables) for the deployed site. The CI build workflow sets `SENTRY_SKIP_UPLOAD=1` so source-map upload is skipped when running on GitHub Actions, only Vercel uploads source maps.

---

## Manual deployment

You should never need to deploy manually, Vercel handles it. If you do:

```bash
# Make sure .env.local has production values
pnpm install
pnpm build

# Deploy via Vercel CLI
pnpm dlx vercel --prod
```

The `gh-pages` branch is **not** in use; the repo name (`raminr77.github.io`) is historical and predates the Vercel migration.
