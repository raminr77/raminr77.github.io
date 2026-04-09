# Architecture

This document explains the technical decisions behind the project — what tools are used, why, and how they fit together.

---

## Tech Stack

| Layer           | Technology            | Version | Purpose                                                   |
| --------------- | --------------------- | ------- | --------------------------------------------------------- |
| Framework       | Next.js               | 16.2.1  | React framework with routing, SSR, and image optimization |
| UI Library      | React                 | 19.2.4  | Component-based UI                                        |
| Language        | TypeScript            | 6.0.2   | Type-safe JavaScript                                      |
| Styling         | Tailwind CSS          | 4.2.2   | Utility-first CSS                                         |
| Styling         | SASS/SCSS             | 1.99.0  | CSS modules for component-scoped styles                   |
| Animation       | GSAP                  | 3.14.2  | High-performance animations                               |
| Animation       | Framer Motion         | 12.38.0 | React-based animations                                    |
| Animation       | animate.css           | 4.1.1   | CSS animation class library                               |
| Forms           | React Hook Form       | 7.72.1  | Form state management                                     |
| Content         | gray-matter           | 4.0.3   | Parse markdown front matter                               |
| Content         | markdown-to-jsx       | 9.7.13  | Render markdown as React components                       |
| Dates           | date-fns              | 4.1.0   | Date formatting and utilities                             |
| Monitoring      | Sentry                | 10.47.0 | Error tracking                                            |
| Monitoring      | Vercel Speed Insights | 2.0.0   | Performance monitoring                                    |
| Security        | Google reCAPTCHA v3   | -       | Bot protection on contact form                            |
| Package Manager | pnpm                  | 10.33.0 | Fast, disk-efficient package manager                      |

---

## Routing

The project uses the **Next.js App Router** (introduced in Next.js 13). This means:

- Each folder inside `src/app/` that has a `page.tsx` becomes a URL route.
- Layouts are defined in `layout.tsx` files and wrap child pages automatically.
- Dynamic routes use square brackets: `[id]` in the folder name.
- API routes are defined in `route.ts` files inside the `api/` subfolder.

### URL Structure

```
/                    → src/app/page.tsx
/about-me            → src/app/about-me/page.tsx
/posts               → src/app/posts/page.tsx
/posts/[id]          → src/app/posts/[id]/page.tsx
/journey             → src/app/journey/page.tsx
/projects            → src/app/projects/page.tsx
/contact-me          → src/app/contact-me/page.tsx
/lens                → src/app/lens/page.tsx
/recommendations     → src/app/recommendations/page.tsx
```

---

## Code Organization: Domain-Driven Structure

The `src/` folder is organized by **features (domains)**, not by file type. This means related code stays together.

**Instead of this (by file type):**

```
components/
  PostCard.tsx
  ProjectCard.tsx
  JourneyCard.tsx
pages/
  posts.tsx
  projects.tsx
```

**The project does this (by feature):**

```
domains/
  posts/
    index.tsx
    components/PostCard.tsx
  projects/
    index.tsx
    components/ProjectCard.tsx
```

This makes it easier to understand and maintain each section of the site independently.

Code that is used by more than one domain goes into `src/shared/`.

---

## Rendering Strategy

Pages in this project are **Server Components** by default (Next.js App Router behavior). This means:

- The page HTML is generated on the server, which is fast and good for SEO.
- Components that need browser APIs (like `window`, `localStorage`) or React state must have `"use client"` at the top of the file.
- Data fetching happens in server components without needing `useEffect`.

The blog posts are read from the filesystem at request time, making them server-rendered.

---

## Theming: Dark and Light Mode

The site supports dark and light themes. The active theme is stored as a CSS class (`dark` or `light`) on the `<html>` element.

- Tailwind's `darkMode: 'class'` config enables this.
- CSS variables change based on the class, so colors update automatically.
- The user's preference is saved in `localStorage`.

---

## Blog Content System

Blog posts are written in Markdown and stored in the `posts/` folder. There is no CMS or database.

**How it works:**

1. Markdown files in `posts/` have front matter metadata (title, date, tags, etc.).
2. The `gray-matter` library reads and parses the front matter.
3. The content is rendered using `markdown-to-jsx`.
4. The `getPosts()` helper reads all posts and applies filters/search.
5. The `/api/posts/search` API route handles search requests from the client.

---

## Contact Form

The contact form on `/contact-me` works like this:

1. The user fills in their email and message.
2. Google reCAPTCHA v3 runs invisibly and generates a token.
3. The form data and token are sent to the `/api/recaptcha-verify` endpoint.
4. That endpoint verifies the token with Google's API.
5. If the token is valid (score ≥ 0.5), the email is sent through a **Cloudflare Worker** at `email-api.ramiin.se`.
6. The user sees a success or error toast notification.

---

## Performance Optimizations

| Optimization                 | How                                                |
| ---------------------------- | -------------------------------------------------- |
| Image optimization           | Next.js Image component with AVIF and WebP formats |
| Code splitting               | Next.js automatically splits code per page         |
| Font loading                 | Google Fonts with `display: swap`                  |
| No source maps in production | Configured in `next.config.ts`                     |
| Cached images                | 1-year minimum TTL for optimized images            |
| Turbopack in dev             | Faster local development builds                    |
| Bundle analyzer              | `pnpm build:analyze` to find large dependencies    |

---

## Monitoring and Error Tracking

- **Sentry** is set up for error tracking. It captures runtime errors and reports them.
- **Vercel Speed Insights** monitors Core Web Vitals (LCP, FID, CLS, etc.).
- **Google Analytics** and **Google Tag Manager** are loaded via `ThirdPartyScripts`.
- A custom `PerformanceMonitor` class in `src/shared/helpers/` also tracks Web Vitals and sends them to Google Analytics.

---

## Security

- **reCAPTCHA v3** protects the contact form from bots.
- **CORS headers** are added to `/api/*` routes.
- **No production source maps** to avoid exposing source code.
- **SVG security policy** in Next.js image config prevents SVG-based XSS.
- The secret reCAPTCHA key is server-only (not prefixed with `NEXT_PUBLIC_`).

---

## Browser Support

The project targets **modern browsers only**. Legacy browsers (IE11, older Safari) are not supported.

| Browser    | Minimum Version |
| ---------- | --------------- |
| Chrome     | 109             |
| Edge       | 109             |
| Firefox    | 102             |
| Safari     | 16              |
| iOS Safari | 16              |
