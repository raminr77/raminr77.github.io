# Project Structure

This document explains every folder and key file in the repository.

---

## Root layout

```text
raminr77.github.io/
├── src/                    Application source code
├── posts/                  Blog post markdown files
├── public/                 Static assets served as-is
├── e2e/                    Playwright end-to-end tests
├── docs/                   Project documentation (this folder)
├── .github/                GitHub Actions workflows and Dependabot config
├── .husky/                 Git hook scripts
├── .vscode/                Recommended VS Code extensions + workspace settings
├── .claude/                Claude Code workspace (settings, slash commands, subagents)
├── CLAUDE.md               Project-wide rules for Claude Code
├── SECURITY.md             Security disclosure policy
├── LICENSE                 MIT license for the source code
├── next.config.ts          Next.js configuration
├── tailwind.config.ts      Tailwind CSS configuration
├── tsconfig.json           TypeScript configuration
├── jest.config.js          Jest configuration (incl. coverage threshold)
├── jest.setup.ts           Jest test setup (matchers)
├── playwright.config.ts    Playwright configuration
├── eslint.config.mjs       ESLint flat config
├── postcss.config.mjs      PostCSS (for Tailwind)
├── .lighthouserc.json      Lighthouse CI budgets
├── .prettierrc             Prettier formatting rules
├── .prettierignore         Files Prettier should skip
├── .editorconfig           Editor formatting rules
├── .nvmrc                  Node.js version pin
├── .env.example            Example environment variables
└── package.json            Dependencies and scripts
```

---

## `src/`

```text
src/
├── app/                Next.js App Router (server-first)
├── domains/            Feature verticals (one folder per top-level section)
├── shared/             Code reused across multiple features
├── data/               Static content / data objects
├── layout/             Site-wide layout components
└── instrumentation.ts  Sentry (server + edge) bootstrap
```

### `src/app/` — App Router

Every folder with a `page.tsx` is a route. Special files (`layout`, `error`, `not-found`, `sitemap`, `robots`, `manifest`, `opengraph-image`) follow Next.js conventions.

```text
src/app/
├── layout.tsx                          Root HTML layout (Server Component)
├── page.tsx                            Home page (route: /)
├── globals.scss                        Global styles
├── fonts.ts                            Google Fonts (Hubballi, Gantari)
├── manifest.ts                         PWA manifest
├── sitemap.ts                          Dynamic /sitemap.xml from getPosts()
├── robots.ts                           Dynamic /robots.txt (preview = Disallow: /)
├── error.tsx                           Per-route error boundary
├── global-error.tsx                    Top-level error fallback (reports to Sentry)
├── not-found.tsx                       404 page
├── icon.png, apple-icon.png            Favicons (auto-served)
├── instrumentation-client.ts           Sentry client init
├── feed.xml/route.ts                   RSS feed
├── about-me/page.tsx                   Route: /about-me
├── contact-me/page.tsx                 Route: /contact-me
├── journey/page.tsx                    Route: /journey
├── lens/page.tsx                       Route: /lens
├── projects/page.tsx                   Route: /projects
├── recommendations/page.tsx            Route: /recommendations
├── posts/page.tsx                      Route: /posts
├── posts/[id]/page.tsx                 Route: /posts/:id
├── posts/[id]/opengraph-image.tsx      Dynamic OG image per post (1200×630)
└── api/
    ├── route.ts                        GET /api — health check
    ├── posts/search/route.ts           GET /api/posts/search?q=…
    ├── recaptcha-verify/route.ts       POST /api/recaptcha-verify
    └── react-sample/route.ts           Demo API (kept for a public sample repo)
```

### `src/domains/`

One folder per feature vertical. Cross-domain imports are forbidden — if two domains need the same code, promote it to `src/shared/`.

```text
src/domains/
├── home/             Landing page
├── posts/            Blog listing + single-post view
├── projects/         Projects showcase
├── journey/          Career timeline
├── about-me/         About me page
├── contact-me/       Contact form
├── lens/             Photo gallery
├── recommendations/  Testimonials
├── error/            Error page UI
├── not-found/        404 page UI
└── gallery/          (Currently scaffolded, not yet shipped)
```

Typical domain shape:

```text
src/domains/<feature>/
├── index.tsx           Page entry (may be 'use client' if it needs state)
├── components/         Feature-scoped components
├── __tests__/          Co-located Jest tests
├── helper/             Feature-scoped pure functions (optional)
├── services/           Feature-scoped API clients (optional)
├── constants/          Feature-scoped constants (optional)
└── hooks/              Feature-scoped hooks (e.g. lens has useGalleryKeyboard)
```

### `src/shared/`

```text
src/shared/
├── components/         Generic UI components (kebab-case folders)
├── hooks/              Generic React hooks
├── helpers/            Pure functions
├── services/           External-API clients (email, recaptcha, search)
├── libs/               Third-party library wrappers (pixel-canvas custom element)
├── types/              Shared TypeScript declarations
├── api/constants/      Endpoint URLs
└── constants/          App-wide constants (routes, env, GTM events, regexes, …)
```

All component folder names are kebab-case (e.g. `code-block/`, `tracked-link/`).

### `src/data/`

```text
src/data/
├── personal-data.ts        Name, bio, site URL, keywords (en / fa / sv)
├── projects.ts             Project list
├── journey.ts              Career history and education
├── about-me.ts             About page content
├── recommendations.ts      Testimonials
├── contact-me.ts           Contact info and social links
├── lens.ts                 Photo gallery items
├── general.ts              Cross-page UI strings (form labels, modal copy, …)
└── resume-file.ts          Resume PDF link
```

### `src/layout/`

```text
src/layout/components/
├── burger-menu/                Mobile hamburger menu
├── content-container/          Page-content wrapper
├── cookies-modal/              Cookie consent banner
├── header/                     Top navigation bar
├── progress-bar/               Route-transition loading bar
├── service-worker-registrar/   Registers /service-worker.js (production only)
└── third-party-scripts/        GA, GTM, AdSense, Speed Insights (consent-gated)
```

---

## `posts/`

Each `.md` file is one blog post. File names are zero-padded for ids ≤ 9 (`post-01.md`, `post-02.md`, …, `post-10.md`).

See [data-and-content.md](./data-and-content.md) for the frontmatter spec and the `getPosts` / `getPostContent` lifecycle.

---

## `public/`

Static assets served as-is from the site root. Notable files:

- `Software-Engineer-Ramin-Rezaei-CV.pdf` — CV (cached for 1 year via `next.config.ts` headers)
- `click-spark.js` — small custom-element script loaded with `<Script strategy="lazyOnload">`
- `service-worker.js` — image-caching service worker registered by `ServiceWorkerRegistrar`
- `ads.txt`, `CNAME` — hosting metadata
- `images/` — site imagery (background, social-banner, lens photos, icons, …)

---

## `e2e/`

Playwright specs:

```text
e2e/
├── about-me.spec.ts
├── contact.spec.ts
├── contact-validation.spec.ts
├── lens.spec.ts
├── navigation.spec.ts
├── navigation-full.spec.ts
├── pages.spec.ts
├── post-detail.spec.ts
├── posts.spec.ts
├── posts-filter.spec.ts
├── projects.spec.ts
├── recommendations.spec.ts
├── routing.spec.ts
├── search.spec.ts
├── search-extended.spec.ts
└── theme.spec.ts
```

Run with `pnpm test:e2e`. Browsers install via `pnpm test:e2e:install`.

---

## `.github/`

```text
.github/
├── dependabot.yml                  Weekly npm + monthly github-actions updates
└── workflows/
    ├── build.yml                   Production build + format check (push + PR)
    ├── tests.yml                   Jest (coverage) + Playwright (push + PR)
    ├── eslint.yml                  ESLint with SARIF upload to Code Scanning
    ├── tsc.yml                     tsc --noEmit
    ├── codeql.yml                  CodeQL javascript-typescript scan (push + PR + weekly)
    ├── dependencies.yml            actions/dependency-review-action on dep PRs
    ├── lighthouse.yml              Lighthouse CI against the built site (PR)
    └── bundle-size.yml             Build with @next/bundle-analyzer + upload report (PR)
```

See [deployment.md](./deployment.md) for what each workflow does.
