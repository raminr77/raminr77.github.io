# Deployment

This document explains how to build the project and how it is deployed automatically.

---

## Building for Production

Create an optimized production build:

```bash
pnpm build
```

This runs Next.js's build process, which:

- Compiles TypeScript to JavaScript
- Bundles and minifies code
- Optimizes images
- Generates static pages where possible
- Creates the `.next/` output folder

After building, you can run the production server locally to verify it:

```bash
pnpm start
```

This serves the `.next/` build at `http://localhost:3000`.

---

## Bundle Analysis

To see what is contributing to your JavaScript bundle size:

```bash
pnpm build:analyze
```

This builds the project and opens the **webpack-bundle-analyzer** in your browser. It shows a visual map of every module and its size. Use this to find unnecessarily large dependencies.

---

## Lighthouse Performance Audit

To run a Lighthouse performance audit against the local production build:

```bash
# First build and start the server
pnpm build
pnpm start

# In another terminal, run Lighthouse
pnpm performance
```

This generates a report with scores for Performance, Accessibility, Best Practices, and SEO.

---

## CI/CD with GitHub Actions

The project uses **GitHub Actions** to automate testing and deployment. Workflow files are in `.github/workflows/`.

---

### CI Workflow (Pull Requests)

Triggered on every pull request to the main branch.

**Steps:**

1. Check out code
2. Set up Node.js and pnpm
3. Install dependencies
4. Run TypeScript type check (`pnpm type-check`)
5. Run ESLint (`pnpm lint`)
6. Run Jest unit tests (`pnpm test`)
7. Build the project (`pnpm build`)
8. Run Playwright E2E tests (`pnpm test:e2e`)

All steps must pass before the PR can be merged.

---

### Deploy Workflow (Main Branch)

Triggered when code is pushed (or merged) to the main branch.

**Steps:**

1. Check out code
2. Set up Node.js and pnpm
3. Install dependencies
4. Build the project
5. Deploy to hosting

The built output is deployed to **GitHub Pages** or **Vercel** (depending on configuration).

---

## Environment Variables in CI

Secrets are stored in the GitHub repository's **Settings → Secrets and Variables → Actions**. The CI workflow injects them as environment variables during the build.

Required secrets for CI:

| Secret Name                             | Used For                           |
| --------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` | reCAPTCHA on contact form          |
| `GOOGLE_RECAPTCHA_SECRET_KEY`           | reCAPTCHA server-side verification |
| `NEXT_PUBLIC_SENTRY_DSN`                | Sentry error tracking              |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE`     | Google Analytics                   |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE`   | Google Tag Manager                 |

---

## Deployment Target

The site is hosted and automatically deployed. The exact hosting platform is configured via `next.config.ts` and the deploy workflow. Based on the project name and setup, it supports both:

- **GitHub Pages** — via static export
- **Vercel** — via the Vercel platform with full Next.js support (recommended for API routes)

Vercel is preferred because it supports Next.js API routes and server-side rendering natively, without any extra configuration.

---

## Manual Deployment

If you need to deploy manually without CI, follow these steps:

```bash
# 1. Make sure you have the correct environment variables set
cp .env.example .env.local
# Fill in .env.local with real values

# 2. Build
pnpm build

# 3. Deploy (depends on your host)
# For Vercel:
vercel --prod

# For GitHub Pages (if using static export):
# Push the build output to the gh-pages branch
```
