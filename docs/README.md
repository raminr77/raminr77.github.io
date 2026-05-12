# Project Documentation

This folder is the long-form reference for the personal portfolio at **<https://raminrezaei.se>**.

For a quick overview, start with the [top-level README](../README.md). For project-wide rules that Claude Code follows, see [CLAUDE.md](../CLAUDE.md) and the [.claude/](../.claude) workspace.

---

## Table of Contents

| File                                                     | What it covers                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| [getting-started.md](./getting-started.md)               | Install, run, build, available scripts, Husky hooks                       |
| [project-structure.md](./project-structure.md)           | Every folder and key file explained                                       |
| [architecture.md](./architecture.md)                     | Tech stack, rendering strategy, design decisions                          |
| [pages-and-routes.md](./pages-and-routes.md)             | Pages, dynamic routes, API endpoints, sitemap / RSS / OG image, redirects |
| [components.md](./components.md)                         | Each component: where it lives and what it does                           |
| [data-and-content.md](./data-and-content.md)             | Static data files, blog post frontmatter, constants                       |
| [styling.md](./styling.md)                               | Tailwind, SCSS modules, fonts, theming, animation libraries               |
| [hooks-helpers-services.md](./hooks-helpers-services.md) | Custom hooks (`useTrack`, `useGalleryKeyboard`, …), helpers, services     |
| [testing.md](./testing.md)                               | Jest (unit / integration) and Playwright (E2E) setup, coverage threshold  |
| [configuration.md](./configuration.md)                   | `next.config.ts`, `tsconfig`, ESLint, Prettier, Jest, Playwright, Husky   |
| [environment-variables.md](./environment-variables.md)   | Required and optional env vars                                            |
| [deployment.md](./deployment.md)                         | Production build, Vercel deploy, all CI workflows                         |

---

## Quick Overview

This is a **Next.js 16** App Router site built with **React 19** and **TypeScript 6**. It includes:

- A landing page with animated hero
- A markdown-driven blog (`/posts`) with search, category and tag filtering, dynamic sitemap, RSS feed, per-post JSON-LD, and dynamic OpenGraph images
- A projects showcase
- A career / education timeline (`/journey`)
- An about-me page
- A reCAPTCHA-protected contact form (`/contact-me`)
- A photo gallery (`/lens`) with a keyboard-driven modal
- A recommendations / testimonials page
- Dark / light theme with `localStorage` persistence
- 41 Jest test suites + Playwright E2E
- CI on every PR (build · tests · eslint · tsc · codeql · lighthouse · bundle-size · dependency review) and automated Dependabot updates

Source: <https://github.com/raminr77/raminr77.github.io>. Live: <https://raminrezaei.se>. License: [MIT for source code](../LICENSE); written content remains © Ramin Rezaei.
