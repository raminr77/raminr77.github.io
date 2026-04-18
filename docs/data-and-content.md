# Data and Content

This document covers how content is managed — static data files, blog posts, and the TypeScript types that define them.

---

## Static Data Files

All static data lives in `src/data/`. These are plain TypeScript files that export arrays and objects. There is no database or CMS.

---

### `personal-data.ts`

Contains the core personal information used across the site.

```typescript
{
  name: string          // Full name
  title: string         // Job title
  summary: string       // Short bio text
  keywords: string[]    // SEO keywords
  url: string           // Site URL
  description: string   // Site meta description
}
```

Used in: SEO metadata, the home page summary, and the root layout.

---

### `projects.ts`

An array of projects shown on the `/projects` page.

Each project has:

```typescript
{
  name: string          // Project name
  role: string          // Your role (e.g. "Lead Developer")
  stack: string[]       // Technologies used
  description: string   // Short project description
  url?: string          // Live site URL (optional)
  github?: string       // GitHub repo URL (optional)
  isActive: boolean     // Whether to show the project
}
```

---

### `journey.ts`

An array of career events shown as a timeline on the `/journey` page.

Each entry has:

```typescript
{
  title: string; // Job title or degree
  company: string; // Company or school name
  startDate: string; // Start date (formatted string)
  endDate: string; // End date or "Present"
  description: string; // Summary of responsibilities or achievements
  type: 'work' | 'education';
}
```

---

### `about-me.ts`

Content for the `/about-me` page.

```typescript
{
  bio: string           // Full biography text
  images: string[]      // Paths to photos
  sections: Section[]   // Named sections of the about page
}
```

---

### `recommendations.ts`

An array of testimonials shown on the `/recommendations` page and in the `RecommendationsBox` component.

Each recommendation has:

```typescript
{
  name: string          // Recommender's name
  title: string         // Their job title
  company: string       // Their company
  text: string          // The recommendation text
  avatar?: string       // Optional photo
  linkedIn?: string     // LinkedIn profile URL
}
```

---

### `contact-me.ts`

Data for the `/contact-me` page — social links and contact details.

```typescript
{
  email: string
  social: {
    github: string
    linkedin: string
    twitter?: string
  }
}
```

---

### `lens.ts`

An array of photos shown in the gallery on the `/lens` page.

Each image has:

```typescript
{
  src: string; // Path to the image in /public
  alt: string; // Alt text for accessibility
  width: number; // Image width
  height: number; // Image height
}
```

---

### `resume-file.ts`

Contains the URL to the resume PDF file.

```typescript
{
  url: string; // Direct download URL for the resume
  filename: string; // The filename to save as when downloading
}
```

---

## Blog Posts

Blog posts are written in **Markdown** and stored in the `posts/` folder at the root of the project.

### File Format

Each post is a `.md` file named `post-N.md` where `N` is the post's numeric ID.

```text
posts/
├── post-1.md
├── post-2.md
├── post-3.md
└── ...
```

### Front Matter

Every post starts with a YAML block called "front matter" wrapped in `---`. This is the post's metadata.

```yaml
---
id: 5
author: Ramin Rezaei
isActive: true
category: Engineering
date: '2024-03-10'
slug: understanding-typescript-generics
title: Understanding TypeScript Generics
description: A clear explanation of TypeScript generics with practical examples.
tags:
  - TypeScript
  - JavaScript
  - Engineering
---
Your post content in Markdown goes here...
```

**Field Reference:**

| Field         | Type       | Required | Description                                             |
| ------------- | ---------- | -------- | ------------------------------------------------------- |
| `id`          | `number`   | Yes      | Unique ID. Used in the `/posts/:id` URL.                |
| `author`      | `string`   | Yes      | Author's full name                                      |
| `isActive`    | `boolean`  | Yes      | Set to `false` to hide the post without deleting it     |
| `category`    | `string`   | Yes      | Main topic category (e.g. Engineering, Career)          |
| `date`        | `string`   | Yes      | Publish date in `"YYYY-MM-DD"` format                   |
| `slug`        | `string`   | Yes      | URL-friendly identifier (used for display, not routing) |
| `title`       | `string`   | Yes      | Post title                                              |
| `description` | `string`   | Yes      | Short description for cards and SEO                     |
| `tags`        | `string[]` | Yes      | List of topic tags                                      |

### Post Content

After the front matter, write the post in standard Markdown. The `markdown-to-jsx` library renders it as React components, so it supports:

- Headings (`#`, `##`, `###`)
- Bold, italic, strikethrough
- Ordered and unordered lists
- Links
- Images
- Code blocks with syntax highlighting (via `ClientCodeLoader`)
- Blockquotes
- Tables

### Adding a New Post

1. Create a new file: `posts/post-N.md` (use the next available number).
2. Add the front matter with a unique `id`.
3. Write your content below the front matter.
4. Set `isActive: true` when you are ready to publish.

No restart or rebuild is needed in development — posts are read fresh from disk on each request.

---

## Post Types

Defined in `src/shared/types/post.d.ts`.

```typescript
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

type Post = PostMetadata & {
  content: string; // The full markdown content
};
```

`PostMetadata` is used in lists (where you do not need the full content). `Post` is used when displaying a single post.

---

## Constants

Located in `src/shared/constants/`.

---

### Routes (`routes.ts`)

```typescript
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
```

Use these constants instead of hardcoding URL strings. This makes renaming a route easier.

---

### Environment Variables (`env.ts`)

Typed wrappers around `process.env`. See [environment-variables.md](./environment-variables.md) for the full list.

---

### GTM Events (`gtm-events.ts`)

Named Google Tag Manager events used for analytics tracking. All events are sent via `sendGTMEvent` from `@next/third-parties/google`, which pushes to `window.dataLayer`.

```typescript
GTM_EVENTS = {
  // Navigation
  MENU: (value: string) => ({ event: 'menu-clicked', value }),
  PAGINATION: (value: string) => ({ event: 'pagination-clicked', value }),

  // Posts
  POST_CARD: (value: string) => ({ event: 'post-card-clicked', value }),
  FILTER_POSTS: (value: string) => ({ event: 'filter-posts-clicked', value }),
  CLEAR_FILTERS: { event: 'clear-filters-clicked', value: '' },
  SUBMIT_POST_SEARCH: (value: string) => ({ event: 'submit-post-search', value }),
  CLOSE_SEARCH_MODAL: { event: 'close-search-modal-clicked', value: '' },

  // Lens / Gallery
  LENS_CARD: (value: string) => ({ event: 'lens-card-clicked', value }),
  LENS_NAVIGATION: (value: 'previous' | 'next') => ({
    event: 'lens-navigation-clicked',
    value
  }),
  LENS_THUMBNAIL: (value: number) => ({
    event: 'lens-thumbnail-clicked',
    value: String(value)
  }),
  LENS_MODAL_CLOSE: { event: 'lens-modal-closed', value: '' },

  // Projects
  PROJECT_DEMO: (value: string) => ({ event: 'project-demo-link-clicked', value }),
  PROJECTS_FOOTER: { event: 'projects-footer-link-clicked', value: '' },

  // Recommendations
  RECOMMENDATIONS_FOOTER: { event: 'recommendations-footer-link-clicked', value: '' },
  LINKEDIN_RECOMMENDATION: (value: string) => ({
    event: 'linkedIn-recommendation-clicked',
    value
  }),
  CHECK_RECOMMENDATION: (value: string) => ({
    event: 'check-recommendation-clicked',
    value
  }),

  // Contact
  CONTACT_LINK: (value: string) => ({ event: 'contact-link-clicked', value }),
  GOOGLE_CALENDAR: { event: 'google-calendar-clicked', value: 'Google' },
  ADP_CALENDAR: { event: 'google-calendar-clicked', value: 'ADP' },
  SEND_MESSAGE: (value: 'success' | 'error') => ({
    event: 'send-message-clicked',
    value
  }),

  // About / Resume
  MORE_ABOUT_ME: { event: 'more-about-me-clicked', value: '' },
  DOWNLOAD_RESUME: { event: 'download-resume-clicked', value: '' },
  CHECK_EXPERIENCE: (value: string) => ({ event: 'check-experience-clicked', value }),

  // Theme
  TOGGLE_THEME: (value: Theme) => ({ event: 'toggle-theme-clicked', value })
};
```

**Cookie consent gating:** GA and GTM scripts only load after the user accepts cookies via the `CookiesModal`. If the user rejects, no events reach GA or GTM — only Vercel Speed Insights (which is privacy-friendly) loads unconditionally.

---

### Local Storage Keys

Keys used to read and write from `localStorage`.

```typescript
LOCAL_STORAGE_KEYS = {
  COOKIES_MODAL: 'cookies_modal_status',
  THEME: 'theme'
};
```

---

### API Endpoints (`src/shared/api/constants/`)

```typescript
ENDPOINTS = {
  verifyReCaptcha: '/api/recaptcha-verify',
  sendMessage: 'https://email-api.ramiin.se',
  googleVerifyReCaptcha: 'https://www.google.com/recaptcha/api/siteverify',
  searchPosts: (query: string) => `/api/posts/search?q=${encodeURIComponent(query)}`
};
```
