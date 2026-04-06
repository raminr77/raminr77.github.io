# Project Structure

This document explains every folder and key file in the repository.

---

## Root Level

```
raminr77.github.io/
├── src/                    # All application source code
├── posts/                  # Blog post files (.md)
├── public/                 # Static files served as-is
├── e2e/                    # End-to-end tests (Playwright)
├── docs/                   # Project documentation (this folder)
├── .github/                # GitHub Actions CI/CD workflows
├── .husky/                 # Git hook scripts
├── .vscode/                # VS Code editor settings
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest test configuration
├── playwright.config.ts    # Playwright E2E configuration
├── eslint.config.mjs       # ESLint rules
├── postcss.config.mjs      # PostCSS (for Tailwind)
├── .prettierrc             # Prettier formatting rules
├── .editorconfig           # Editor formatting rules
├── .env.example            # Example environment variables
└── package.json            # Dependencies and scripts
```

---

## The `src/` Folder

This is where all application code lives. It is split into clear areas of responsibility.

```
src/
├── app/                    # Next.js App Router pages and layouts
├── domains/                # Feature-based code (one folder per section of the site)
├── shared/                 # Code reused across multiple features
├── data/                   # Static content and data
└── layout/                 # Site-wide layout components (header, footer, etc.)
```

---

### `src/app/`

This folder follows Next.js App Router conventions. Each subfolder is a route.

```
src/app/
├── layout.tsx              # Root HTML layout — wraps every page
├── page.tsx                # Home page (route: /)
├── globals.scss            # Global CSS styles
├── fonts.ts                # Font definitions (Hubballi, Gantari)
├── manifest.ts             # PWA manifest
├── error.tsx               # Error boundary page
├── not-found.tsx           # 404 page
├── global-error.tsx        # Top-level error fallback
├── instrumentation-client.ts  # Sentry error monitoring setup
├── about-me/
│   └── page.tsx            # Route: /about-me
├── posts/
│   ├── page.tsx            # Route: /posts
│   └── [id]/
│       └── page.tsx        # Route: /posts/:id (dynamic)
├── journey/
│   └── page.tsx            # Route: /journey
├── projects/
│   └── page.tsx            # Route: /projects
├── contact-me/
│   └── page.tsx            # Route: /contact-me
├── lens/
│   └── page.tsx            # Route: /lens
├── recommendations/
│   └── page.tsx            # Route: /recommendations
└── api/
    ├── route.ts            # GET /api — health check
    ├── posts/
    │   └── search/
    │       └── route.ts    # GET /api/posts/search
    ├── recaptcha-verify/
    │   └── route.ts        # POST /api/recaptcha-verify
    └── react-sample/
        └── route.ts        # GET|POST /api/react-sample
```

---

### `src/domains/`

Each domain is a self-contained feature of the website. A domain holds the page component and all the smaller components that belong only to that feature.

```
src/domains/
├── home/                   # Home/landing page
├── posts/                  # Blog listing and individual post view
├── projects/               # Projects showcase
├── journey/                # Career timeline
├── about-me/               # About me section
├── contact-me/             # Contact form
├── lens/                   # Photo gallery
├── recommendations/        # Testimonials
├── error/                  # Error page
└── not-found/              # 404 page
```

Each domain typically looks like this internally:

```
domains/posts/
├── index.tsx               # Main page component (exported)
├── components/             # Sub-components used only in this domain
│   ├── PostCard/
│   ├── PostsSearch/
│   └── ...
└── __tests__/              # Unit tests for this domain
    └── *.test.tsx
```

---

### `src/shared/`

Code that is used in more than one domain lives here. Nothing in `shared/` should depend on anything in `domains/`.

```
src/shared/
├── components/             # Reusable UI components (Button, Input, Spinner, etc.)
├── hooks/                  # Custom React hooks
├── helpers/                # Pure functions and utilities
├── services/               # API call functions
├── api/
│   └── constants/          # API endpoint URLs
├── libs/                   # Third-party library wrappers
├── types/                  # TypeScript type definitions
└── constants/              # App-wide constants (routes, env vars, keys)
```

---

### `src/data/`

Static data that defines the site content. These are TypeScript files that export plain data arrays and objects.

```
src/data/
├── personal-data.ts        # Name, bio, keywords, site URL
├── projects.ts             # List of projects
├── journey.ts              # Career history and education
├── about-me.ts             # About page content and images
├── recommendations.ts      # Testimonials and recommendations
├── contact-me.ts           # Contact info and social links
├── lens.ts                 # Photo gallery images
└── resume-file.ts          # Resume PDF link
```

---

### `src/layout/`

Components that appear on every page of the site.

```
src/layout/
└── components/
    ├── Header/             # Top navigation bar
    ├── BurgerMenu/         # Mobile hamburger menu
    ├── ContentContainer/   # Page content wrapper
    ├── ProgressBar/        # Page transition loading bar
    ├── CookiesModal/       # Cookie consent banner
    ├── ServiceWorkerRegistrar/  # PWA service worker setup
    └── ThirdPartyScripts/  # Google Analytics, GTM scripts
```

---

## The `posts/` Folder

Markdown files for blog posts. Each file is one blog post.

```
posts/
├── post-1.md
├── post-2.md
└── ...
```

Each file has a front matter section at the top with metadata, followed by the post content in Markdown.

Example front matter:

```yaml
---
id: 1
author: Ramin Rezaei
isActive: true
category: Engineering
date: '2024-01-15'
slug: my-first-post
title: My First Post
description: A short description of the post.
tags:
  - React
  - TypeScript
---
```

---

## The `public/` Folder

Static files that are served directly without processing. Images, icons, fonts, and other assets go here.

---

## The `e2e/` Folder

End-to-end test files written with Playwright.

```
e2e/
├── contact.spec.ts         # Tests the contact form
├── lens.spec.ts            # Tests the photo gallery
├── navigation.spec.ts      # Tests site navigation
├── posts.spec.ts           # Tests blog listing and filtering
├── routing.spec.ts         # Tests URL routing
├── search.spec.ts          # Tests post search
└── theme.spec.ts           # Tests dark/light mode toggle
```

---

## The `.github/` Folder

GitHub Actions workflow files for automated CI/CD.

```
.github/
└── workflows/
    ├── ci.yml              # Runs on pull requests — lint, test, build
    └── deploy.yml          # Runs on push to main — deploys the site
```
