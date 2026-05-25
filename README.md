# Ramin Rezaei — Personal Website

This repository holds the source code for [raminrezaei.se](https://raminrezaei.se)

My personal portfolio and blog. It first went live on **11 June** (my birthday).

I build and maintain it on my own as a place to publish writing, share projects, and keep learning in public.

## Status

[![Build](https://github.com/raminr77/raminr77.github.io/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/raminr77/raminr77.github.io/actions/workflows/build.yml)
[![Tests](https://github.com/raminr77/raminr77.github.io/actions/workflows/tests.yml/badge.svg?branch=master)](https://github.com/raminr77/raminr77.github.io/actions/workflows/tests.yml)
[![ESLint](https://github.com/raminr77/raminr77.github.io/actions/workflows/eslint.yml/badge.svg?branch=master)](https://github.com/raminr77/raminr77.github.io/actions/workflows/eslint.yml)
[![TypeScript](https://github.com/raminr77/raminr77.github.io/actions/workflows/tsc.yml/badge.svg?branch=master)](https://github.com/raminr77/raminr77.github.io/actions/workflows/tsc.yml)

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack for dev, React Compiler enabled)
- **UI**: React 19, Tailwind CSS 4, SCSS modules
- **Language**: TypeScript 6 (strict)
- **Animation**: `motion`, `gsap`, `animate.css`
- **Content**: Markdown posts in [`/posts`](./posts) parsed with `gray-matter` + `markdown-to-jsx`
- **Testing**: Jest 30, `@testing-library/react`, Playwright
- **Monitoring**: Sentry, Vercel Speed Insights
- **Package manager**: pnpm 10

## Quick start

```bash
pnpm install
pnpm dev               # http://localhost:3000
pnpm test              # 219 unit tests
pnpm check-all         # format + lint + types
pnpm build             # production build
pnpm test:e2e          # Playwright (run `pnpm test:e2e:install` first)
```

## SEO and content

- **Sitemap**: generated dynamically at [`/sitemap.xml`](https://raminrezaei.se/sitemap.xml) from `getPosts()`.
- **RSS**: subscribe at [`/feed.xml`](https://raminrezaei.se/feed.xml).
- **robots.txt**: dynamic — preview deployments return `Disallow: /` so they don't get indexed.
- **JSON-LD**: every blog post exposes `BlogPosting` structured data.
- **Open Graph images**: every post gets a dynamically generated 1200×630 preview at `/posts/<id>/opengraph-image`.

## Project layout

```text
src/
├── app/          Next.js App Router (server-first)
├── domains/      Feature verticals (posts, journey, lens, projects, ...)
├── layout/       Cross-page layout pieces (header, cookies modal, progress bar)
├── shared/       Cross-feature utilities (components, hooks, helpers, services)
└── data/         Static content (about-me, projects, recommendations)
```

Detailed conventions and Claude Code workspace setup live in [`CLAUDE.md`](./CLAUDE.md) and [`.claude/README.md`](./.claude/README.md).

## CI

| Workflow       | Triggers        | Purpose                                                                 |
| -------------- | --------------- | ----------------------------------------------------------------------- |
| `build`        | push + PR       | Format check, production build, Next.js cache restore                   |
| `tests`        | push + PR       | Jest unit (+ coverage) + Playwright E2E                                 |
| `eslint`       | push            | ESLint with SARIF upload                                                |
| `tsc`          | push            | `tsc --noEmit`                                                          |
| `dependencies` | dep-related PRs | `actions/dependency-review-action`                                      |
| `lighthouse`   | PR              | Lighthouse CI against the built site                                    |
| `bundle-size`  | PR              | Build with `@next/bundle-analyzer` and upload the report as an artifact |

Dependabot watches `npm` (weekly, grouped) and `github-actions` (monthly), targeting the `dev` branch.

## Security

Security policy lives in [`SECURITY.md`](./SECURITY.md). Report vulnerabilities privately at <ramin.rezaei@sinch.com>.

## License

[MIT](./LICENSE) for the source code. Written content (blog posts, CV, recommendations, photography) is © Ramin Rezaei, all rights reserved.

## Links

- Live: [raminrezaei.se](https://raminrezaei.se)
- Mirrors: [raminrezaei.ir](https://raminrezaei.ir), [ramiiin.ir](https://ramiiin.ir), [ramiin.se](https://ramiin.se)
- Documentation: [`./docs/README.md`](./docs/README.md)

![Preview](https://github.com/raminr77/raminr77.github.io/blob/master/Preview.png?raw=true)
