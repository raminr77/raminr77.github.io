# Architecture

Technical decisions behind the project — what is used, why, and how it fits together.

---

## Tech Stack

| Layer            | Technology                  | Version range | Purpose                                                   |
| ---------------- | --------------------------- | ------------- | --------------------------------------------------------- |
| Framework        | Next.js                     | 16.x          | React framework with App Router, image optimization, etc. |
| UI library       | React                       | 19.x          | Component-based UI                                        |
| Language         | TypeScript                  | 6.x           | Static typing                                             |
| Styling          | Tailwind CSS                | 4.x           | Utility-first CSS                                         |
| Styling          | SCSS modules                | sass 1.x      | Component-scoped styles for complex cases                 |
| Animation        | Motion (Framer)             | 12.x          | Declarative component animations                          |
| Animation        | GSAP + @gsap/react          | 3.x           | Imperative timelines for the more elaborate sequences     |
| Animation        | animate.css                 | 4.x           | Generic CSS animation classes (via the `animator` helper) |
| Forms            | react-hook-form             | 7.x           | Form state, validation, no extra renders                  |
| Content          | gray-matter                 | 4.x           | Parse markdown frontmatter                                |
| Content          | markdown-to-jsx             | 9.x           | Render markdown as React (used with custom `<CodeBlock>`) |
| Syntax highlight | highlight.js                | 11.x          | Code highlighting in blog posts                           |
| Dates            | date-fns                    | 4.x           | Date utilities                                            |
| Forms            | react-google-recaptcha-v3   | 1.x           | reCAPTCHA v3 client-side widget                           |
| Notifications    | react-toastify              | 11.x          | Toast notifications                                       |
| Monitoring       | @sentry/nextjs              | 10.x          | Error and performance monitoring                          |
| Monitoring       | Vercel Speed Insights       | 2.x           | RUM for Core Web Vitals                                   |
| Analytics        | @next/third-parties         | 16.x          | GA + GTM integration                                      |
| Compiler         | babel-plugin-react-compiler | 1.x           | React 19 compiler — automatic memoization                 |
| Package manager  | pnpm                        | 10.x          | Disk-efficient package manager                            |

Run `pnpm outdated` for the exact installed versions.

---

## Routing

The project uses the **Next.js App Router**. Every folder under `src/app/` with a `page.tsx` is a route. Dynamic segments use square brackets (`[id]`). API routes live in `route.ts` files.

### URL → file map

```text
/                 → src/app/page.tsx                 (forwards to src/domains/home)
/about-me         → src/app/about-me/page.tsx
/contact-me       → src/app/contact-me/page.tsx
/journey          → src/app/journey/page.tsx
/lens             → src/app/lens/page.tsx
/posts            → src/app/posts/page.tsx
/posts/[id]       → src/app/posts/[id]/page.tsx
/projects         → src/app/projects/page.tsx
/recommendations  → src/app/recommendations/page.tsx
/sitemap.xml      → src/app/sitemap.ts
/robots.txt       → src/app/robots.ts
/feed.xml         → src/app/feed.xml/route.ts
/manifest.webmanifest → src/app/manifest.ts
/posts/<id>/opengraph-image → src/app/posts/[id]/opengraph-image.tsx
```

---

## Code organisation — domain-driven

`src/` is organised by **feature**, not file type. Code related to a section of the site stays together under `src/domains/<feature>/`. Anything reused by two or more domains is promoted to `src/shared/`.

Cross-domain imports (e.g. `src/domains/posts/` importing from `src/domains/journey/`) are not allowed.

The `src/app/` folder is intentionally thin — every page is a 5-to-15-line server entry that re-exports its domain page component.

---

## Rendering strategy

Pages default to **Server Components**. `'use client'` is added only when a component needs state, effects, browser APIs, or DOM event handlers.

Cards that previously had a single `() => sendGTMEvent(...)` on a link have been converted to Server Components by introducing `<TrackedLink>` and `<TrackedAnchor>` (in `src/shared/components/tracked-link/`). The wrapper is the only client boundary; the surrounding card stays server-rendered.

`next/dynamic` with `ssr: false` is forbidden inside Server Components in Next.js 16. The code base uses either:

- `next/dynamic` **without** `ssr: false` when the child is `'use client'` and works for SSR rendering (the leaf gates its browser-only side effects inside `useEffect`), or
- `next/dynamic` **with** `ssr: false` only from inside another `'use client'` parent.

React 19's compiler is enabled (`reactCompiler: true` in `next.config.ts`) so most components get automatic memoization without manual `useMemo` / `useCallback` boilerplate.

---

## Theming

The active theme is stored as a class (`dark` / `light`) on `<html>`. Tailwind's `darkMode: 'class'` reads it; CSS variables in `globals.scss` switch values based on that class. The user's choice persists in `localStorage` (key from `LOCAL_STORAGE_KEYS`).

---

## Blog content system

Posts are markdown files in `posts/*.md`. No CMS, no database. The pipeline:

1. **Parse** — `gray-matter` reads frontmatter; the rest is treated as content.
2. **Filter & sort** — `getPosts()` filters by `isActive`, optional tag / category, and an optional search string, then sorts newest first. Results are cached at the module level (one parse per Node process). The cache can be cleared in tests via `__resetPostsCacheForTests()`.
3. **Render** — `markdown-to-jsx` renders content. The `pre` element is overridden by `<CodeBlock>` (see `src/shared/components/code-block/`), which clips long blocks (> 480px) and shows an "Expand Code" / "Collapse Code" toggle.
4. **Highlight** — `<ClientCodeLoader>` mounts once on the post detail page; it dynamically imports `highlight.js` and the `highlightjs-copy` plugin, then highlights every `<code>` and attaches a copy button.

Search uses a small route handler (`/api/posts/search`) that re-runs `getPosts()` with a search string. Tag and category filtering on the listing page is done server-side from query string parameters.

---

## SEO & discovery

- **Dynamic sitemap** — `src/app/sitemap.ts` reads `getPosts()` for the blog entries and joins them with the static routes (`ROUTES`).
- **Dynamic robots.txt** — `src/app/robots.ts` returns `Disallow: /` for preview deployments (`VERCEL_ENV !== 'production'`) and the full allow rules for production.
- **RSS** — `src/app/feed.xml/route.ts` emits RSS 2.0 with all active posts.
- **Per-post JSON-LD** — `BlogPosting` schema injected via `<Script type="application/ld+json">` inside the post detail page.
- **Dynamic OpenGraph images** — `src/app/posts/[id]/opengraph-image.tsx` renders a 1200×630 PNG per post using `next/og`.
- **`<link rel="alternate">`** for the RSS feed in the root layout.

---

## Contact form

1. User fills in subject, email, and message (`react-hook-form` handles validation).
2. `useGoogleReCaptcha().executeRecaptcha('contact_form_submit')` produces a token.
3. The form calls `sendEmail()` (`src/shared/services/email-service.ts`). The service:
   - Verifies the token against `/api/recaptcha-verify` (project-local route).
   - Posts the form data to `https://email-api.ramiin.se` (a Cloudflare Worker maintained outside this repo).
4. The user sees a toast notification (`notify.success` or `notify.error`).

The `/api/recaptcha-verify` route additionally checks the score (`< 0.5` is rejected) and the action (`contact_form_submit`).

---

## Performance

| Optimisation            | How                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Image optimisation      | `next/image` with AVIF + WebP and a 1-year `minimumCacheTTL`                                                                       |
| Code splitting          | Next.js automatic; heavy widgets (`PixelCanvas`, `DecryptedText`) are `next/dynamic`-d                                             |
| Bundle slimming         | `experimental.optimizePackageImports` for `date-fns`, `clsx`, `motion`, `react-toastify`, `react-hook-form`, `@next/third-parties` |
| Font loading            | Google Fonts via `next/font/google` with `display: 'swap'`                                                                         |
| React Compiler          | `reactCompiler: true` — automatic memoization across the tree                                                                      |
| Long code blocks        | `<CodeBlock>` clips at 480px with an "Expand" toggle                                                                               |
| Module-level post cache | `getPosts()` parses markdown once per Node process                                                                                 |
| Static asset caching    | 1-year `Cache-Control: immutable` on `/Software-Engineer-Ramin-Rezaei-CV.pdf`                                                      |
| RSS / sitemap caching   | `s-maxage=3600, stale-while-revalidate=86400` on `/feed.xml`                                                                       |
| Bundle visualiser       | `pnpm build:analyze`                                                                                                               |
| Sentry sample rates     | 100 % locally, 10 % traces / 5 % session replays in production                                                                     |

---

## Monitoring

- **Sentry** initialises in three runtimes:
  - `src/instrumentation.ts` covers `nodejs` and `edge`.
  - `src/app/instrumentation-client.ts` covers the browser (with `browserTracingIntegration` + `replayIntegration`).
  - All three share the `enabled: ENV.SENTRY_ENABLED` guard.
- **Vercel Speed Insights** loads unconditionally (privacy-friendly RUM).
- **GA4** loads only after the user accepts cookies via `<CookiesModal>`. Separate measurement IDs for `.se` and `.ir` domains.
- **GTM** loads alongside GA when consent is granted.
- A small `PerformanceMonitor` class in `src/shared/helpers/performance.ts` wires LCP / FID / CLS observers and forwards values to `gtag` when present.

---

## Security

- **Server-only secrets** never use the `NEXT_PUBLIC_` prefix. `GOOGLE_RECAPTCHA_SECRET_KEY` is server-only.
- **SVG** files never flow through `next/image`. `dangerouslyAllowSVG: false`. SVGs imported from `src/` are transformed into React components by `@svgr/webpack`.
- **HTTP security headers** added by `next.config.ts` and mirrored in `vercel.json`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Access-Control-Allow-Origin: *` is allowed only on `/api/*` (public read APIs). It is never combined with `Access-Control-Allow-Credentials`.
- **CodeQL** is enabled via GitHub's Default Setup (repo Settings → Security → Code scanning). No custom workflow is committed — GitHub manages the schedule and query suite.
- **Dependency Review Action** comments on dep-changing PRs.
- See [`SECURITY.md`](../SECURITY.md) for the disclosure policy.

---

## Browser support

`browserslist` in `package.json`:

| Browser    | Minimum |
| ---------- | ------- |
| Chrome     | 109     |
| Edge       | 109     |
| Firefox    | 102     |
| Safari     | 16      |
| iOS Safari | 16      |
