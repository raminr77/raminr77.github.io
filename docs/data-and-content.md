# Data and Content

How content is managed — static data files in `src/data/`, blog posts in `posts/`, and the TypeScript types that define them.

---

## Static data files

All static data is plain TypeScript exporting arrays or objects. No CMS, no database. Each domain that needs cross-page data imports from `src/data/`.

### `personal-data.ts`

```ts
{
  firstName, lastName, fullName, title, url, pageDescription,
  persianKeywords: string[], englishKeywords: string[], swedishKeywords: string[]
}
```

Used by SEO metadata in `src/app/layout.tsx`, the post detail page's JSON-LD, the dynamic OG image, and the home page.

### `projects.ts`

```ts
ProjectItem {
  id, title, role, stack: string[], description, url: string | null,
  github?, isActive
}
```

### `journey.ts`

```ts
JourneyItem {
  id, year, date, url?, title, location, items?: string[], description: string
}
```

The `description` and `items` strings are rendered with `dangerouslySetInnerHTML` because they contain pre-authored inline HTML (bold, em, links). They are compile-time data from a trusted source.

### `about-me.ts`

About-me copy including the hero image URL, paragraphs, and the named-component map used to interleave the recommendations preview and competition image into the text.

### `recommendations.ts`

```ts
RecommendationItem {
  id, fullName, title, caption, date, text, url, imageURL?
}
```

`text` is HTML and is also rendered with `dangerouslySetInnerHTML`. Source is trusted (manually curated).

### `contact-me.ts`

Email, phone (if any), social links, calendar URLs, and the contact-page texts.

### `lens.ts`

```ts
LensItem {
  id, title, description, alt, cover, src, isVideo,
  createdAt, slides?: LensSlideItem[]
}
```

Slides have the same shape as the main item.

### `general.ts`

`GENERAL_SITE_DATA` — UI strings that appear in shared components (form validation messages, modal copy, pagination labels, empty states). Centralised so wording stays consistent.

### `resume-file.ts`

```ts
RESUME_FILE = { url: '/Software-Engineer-Ramin-Rezaei-CV.pdf', filename: '…' };
```

The PDF lives in `public/` and is cached for a year via `next.config.ts` headers.

---

## Blog posts

Markdown files in `posts/`. One file per post, named **with a zero-padded id**:

```text
posts/post-01.md
posts/post-02.md
…
posts/post-10.md
```

Ids up to and including 9 must be padded (`post-05.md`, not `post-5.md`). `getPostContent` does the padding when looking up by id.

### Frontmatter

Every post starts with YAML frontmatter:

```yaml
---
id: 5
slug: understanding-typescript-generics
title: Understanding TypeScript Generics
description: A short summary used for cards, SEO meta description, and RSS.
category: Engineering
tags:
  - TypeScript
  - JavaScript
date: '2024-03-10'
isActive: true
author: Ramin Rezaei
---
```

| Field         | Type     | Required | Notes                                                                  |
| ------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `id`          | number   | yes      | Must match the file's `NN`. Used in the `/posts/:id` URL.              |
| `slug`        | string   | yes      | Kebab-case, ASCII. Shown alongside the URL; not used for routing.      |
| `title`       | string   | yes      | Headline; also the post detail metadata `<title>`.                     |
| `description` | string   | yes      | 50–160 chars is the sweet spot for Google SERP truncation.             |
| `category`    | string   | yes      | One of the existing categories (or warn before introducing a new one). |
| `tags`        | string[] | yes      | Lowercase kebab-case where possible.                                   |
| `date`        | string   | yes      | ISO `YYYY-MM-DD`. Used for sort order and `pubDate` in RSS.            |
| `isActive`    | boolean  | yes      | Set `false` to keep a draft in the repo without publishing it.         |
| `author`      | string   | yes      | Defaults to `PERSONAL_DATA.firstName` if omitted.                      |

### Body

Standard Markdown, rendered by `markdown-to-jsx`. Supported:

- Headings, lists, links, images, blockquotes, tables (wrapped in a horizontal-scroll container by the renderer).
- Fenced code blocks with a language tag. `<pre>` blocks are replaced by `<CodeBlock>` which clips long blocks at 480 px and adds an Expand / Collapse toggle.
- Light HTML (`<details>`, `<sub>`, `<sup>`) — anything beyond that is escaped by the renderer.

Images use absolute paths starting with `/images/` and live in `public/images/`.

### Adding a post

1. Pick the next id. `ls posts/ | tail` shows the most recent one.
2. Create `posts/post-NN.md` (zero-padded if `id ≤ 9`).
3. Fill in the frontmatter.
4. Write the body.
5. Set `isActive: true` when the post is ready to publish.

There is **no build step** for posts. They are read fresh on every server start. After publishing:

- The post appears immediately in `/posts`.
- `/sitemap.xml` picks it up automatically.
- `/feed.xml` includes it on the next request.
- `/posts/<id>/opengraph-image` renders a fresh preview.

### Post types

`src/shared/types/post.d.ts`:

```ts
type PostFilterKeys = 'tag' | 'category';
type PostFilters = Partial<Record<PostFilterKeys, string>>;

type PostMetadata = {
  id: number;
  date: Date;
  slug: string;
  title: string;
  author: string;
  tags: string[];
  category: string;
  isActive: boolean;
  description: string;
};

type Post = PostMetadata & { content: string };
```

`PostMetadata` is used in list views and `Posts.data`. `Post` is used by the detail page when full body content is needed.

---

## Constants

Located in `src/shared/constants/`.

### Routes (`routes.ts`)

```ts
ROUTES = {
  HOME: '/',
  LENS: '/lens/',
  POSTS: '/posts/',
  JOURNEY: '/journey/',
  PROJECTS: '/projects/',
  ABOUT_ME: '/about-me/',
  CONTACT_ME: '/contact-me/',
  RECOMMENDATIONS: '/recommendations/'
};

MENU_ITEM_ROUTES = [{ id, title, url }, …];
```

Always reference `ROUTES.<KEY>` in `<Link>` / `redirect()`; the constant is the single source of truth.

### Environment (`env.ts`)

A typed wrapper over `process.env`. See [environment-variables.md](./environment-variables.md). Always import `ENV` from this file rather than calling `process.env.*` directly.

### Local storage keys (`local-storage.ts`)

```ts
LOCAL_STORAGE_KEYS = { COOKIES_MODAL, THEME };
```

### Cookies modal status (`cookies-modal.ts`)

```ts
COOKIES_MODAL_STATUS = { NONE: 'none', ACCEPT: 'accept', REJECT: 'reject' };
type CookiesModalStatus = 'none' | 'accept' | 'reject';
```

### GTM events (`gtm-events.ts`)

Named GTM event objects. All events go through `sendGTMEvent` from `@next/third-parties/google` (or the `useTrack` / `TrackedLink` / `TrackedAnchor` wrappers).

**Cookie gating:** GA and GTM scripts only load after the user accepts via `<CookiesModal>`. Events queued before that go to `window.dataLayer` but aren't forwarded until the scripts load.

### Feature flags (`feature-flags.ts`)

A small `FEATURE_FLAGS` object for guarding work-in-progress UI from production.

### Regexes (`regexs.ts`)

Shared validation regexes (e.g. `EMAIL_VALIDATION_REGEX`).

### Custom events (`src/layout/constants/custom-events.ts`)

DOM `CustomEvent` names dispatched between layout components without a route change:

```ts
COOKIES_STATUS_CHANGE = 'cookies-status-change';
```

`<CookiesModal>` dispatches it; `<ThirdPartyScripts>` listens.

---

## API endpoints

`src/shared/api/constants/endpoints.ts`

```ts
ENDPOINTS = {
  verifyReCaptcha: '/api/recaptcha-verify',
  sendMessage: 'https://email-api.ramiin.se',
  googleVerifyReCaptcha: 'https://www.google.com/recaptcha/api/siteverify',
  searchPosts: (query: string) => `/api/posts/search?q=${encodeURIComponent(query)}`
};
```
