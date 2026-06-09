# Pages and Routes

Every page, URL, API endpoint, and SEO route in the project.

---

## Pages

### Home, `/`

`src/app/page.tsx` → `src/domains/home/`

Landing page with an animated hero. Components: `HeroTextAnimator`, `Summary`, `MoreInformationButton`.

### About Me, `/about-me`

`src/app/about-me/page.tsx` → `src/domains/about-me/`

Personal introduction with photos, background, and a `RecommendationsBox` preview that links to the full recommendations page.

### Blog listing, `/posts`

`src/app/posts/page.tsx` → `src/domains/posts/`

All active blog posts. Supports text search and category / tag filtering. Reads from disk via `getPosts()` (server, cached at module level).

Components used: `PostCard`, `PostsSearch`, `PostsCategoryFilter`, `EmptyPostBlock`, `Pagination`.

**Query parameters:**

| Parameter  | Meaning                   |
| ---------- | ------------------------- |
| `q`        | Search string             |
| `category` | Category filter           |
| `tag`      | Tag filter                |
| `page`     | Pagination page (1-based) |

### Single post, `/posts/:id`

`src/app/posts/[id]/page.tsx` → `src/domains/posts/post-detail-page.tsx`

Full post content. `:id` is the numeric ID from the post's frontmatter. The page also injects a `BlogPosting` JSON-LD `<Script>` and registers a dynamic OG image (see SEO routes below).

Components used: `PageHeader`, `PostAuthor`, `PostCategory`, `PostDate`, `PostReadTime`, `PostShare`, `PostTags`, `BackToPostButton`, `PostCard` (recommended posts), `ClientCodeLoader`. `<pre>` blocks are overridden by `<CodeBlock>` for expand / collapse.

### Journey, `/journey`

`src/app/journey/page.tsx` → `src/domains/journey/`

Career and education timeline. Components: `JourneyCard`, `JourneyScroller`.

### Projects, `/projects`

`src/app/projects/page.tsx` → `src/domains/projects/`

Grid of projects. Components: `ProjectCard`, `ProjectCardDemoLink`, `ProjectsFooter`.

### Contact Me, `/contact-me`

`src/app/contact-me/page.tsx` → `src/domains/contact-me/`

reCAPTCHA-protected contact form. Components: `ContactForm`. Wraps the form in `<GoogleReCaptchaProvider>` scoped to this page only (the provider is not in the root layout).

### Lens, `/lens`

`src/app/lens/page.tsx` → `src/domains/lens/`

Photo gallery. Components: `LensCard`, `LensGalleryModal`, `useGalleryKeyboard` (Escape closes, arrow keys navigate, body scroll locked while open).

### Recommendations, `/recommendations`

`src/app/recommendations/page.tsx` → `src/domains/recommendations/`

Testimonials. Components: `RecommendationCard`, `RecommendationsFooter`.

### Error page

`src/app/error.tsx` → `src/domains/error/`

Per-route error boundary. Reports the error to Sentry when enabled and offers a "Try again" button.

### Global error

`src/app/global-error.tsx`

Top-level fallback for errors that escape the layout. Renders a barebones HTML shell and reports to Sentry (when not on localhost).

### 404

`src/app/not-found.tsx` → `src/domains/not-found/`

Friendly 404 with an animated text and a link back to the home page.

---

## SEO routes

These routes exist alongside the human-readable pages.

| Route                          | File                                         | Purpose                                                            |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| `/sitemap.xml`                 | `src/app/sitemap.ts`                         | Static routes + every active post                                  |
| `/robots.txt`                  | `src/app/robots.ts`                          | Production allow rules; preview returns `Disallow: /`              |
| `/feed.xml`                    | `src/app/feed.xml/route.ts`                  | RSS 2.0 feed, cached `s-maxage=3600, stale-while-revalidate=86400` |
| `/manifest.webmanifest`        | `src/app/manifest.ts`                        | PWA manifest                                                       |
| `/posts/<id>/opengraph-image`  | `src/app/posts/[id]/opengraph-image.tsx`     | 1200×630 dynamic OG image per post (via `next/og`)                 |
| `/icon.png`, `/apple-icon.png` | `src/app/icon.png`, `src/app/apple-icon.png` | Favicons                                                           |

---

## Redirects

Configured in `next.config.ts`. All are 301 (permanent).

| Old URL                | New URL                                   |
| ---------------------- | ----------------------------------------- |
| `/skills`              | `/journey`                                |
| `/experiences`         | `/journey`                                |
| `/educations`          | `/journey`                                |
| `/resume.pdf`          | `/`                                       |
| `/random-sex-position` | `https://ramiiin.ir/random-sex-position/` |
| `/csv-row-printer`     | `https://ramiiin.ir/csv-row-printer/`     |

---

## API routes

All API routes are inside `src/app/api/`.

### `GET /api`

`src/app/api/route.ts`: Health check.

```json
{ "message": "API is ready :D" }
```

### `GET /api/posts/search`

`src/app/api/posts/search/route.ts`: searches blog posts via `getPosts(null, q)`.

| Parameter | Required | Notes                                     |
| --------- | -------- | ----------------------------------------- |
| `q`       | no       | Search string. Empty string returns `[]`. |

Successful response (200):

```json
{
  "success": true,
  "data": [{ "id": 1, "title": "…", "...": "PostMetadata fields" }],
  "message": "Search completed successfully"
}
```

Failure response (500):

```json
{ "success": false, "message": "An error occurred while searching for posts." }
```

### `POST /api/recaptcha-verify`

`src/app/api/recaptcha-verify/route.ts`: verifies a reCAPTCHA v3 token against Google.

Request body:

```json
{ "token": "<recaptcha-token>" }
```

Status codes:

| Status | Meaning                                                           |
| ------ | ----------------------------------------------------------------- |
| 200    | Success, token valid, score ≥ 0.5, action = `contact_form_submit` |
| 400    | Token missing, Google rejection, low score, or wrong action       |
| 500    | Unexpected failure (e.g. JSON parse error, network error)         |
| 503    | `GOOGLE_RECAPTCHA_SECRET_KEY` not configured on the server        |

### `GET | POST /api/react-sample`

`src/app/api/react-sample/route.ts`: fake demo API used by a public sample repo for tutorials. Not used by this site. Accepts `admin/admin` on POST.
