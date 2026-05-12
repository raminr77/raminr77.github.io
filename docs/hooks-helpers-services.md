# Hooks, Helpers, and Services

Custom hooks, helper functions, and service clients. Most live in `src/shared/`; feature-specific ones live in their domain's `hooks/` or `helpers/` folder.

---

## Custom hooks

Located in `src/shared/hooks/` unless otherwise noted.

### `useDebounce`

`src/shared/hooks/use-debounce.ts`

Delays updating a value until the input stops changing for `delay` ms.

```ts
function useDebounce<T>(value: T, delay: number): T;
```

Used by `PostsSearch` to avoid querying on every keystroke.

### `useIsClient`

`src/shared/hooks/use-is-client.ts`

Returns `true` after the first client render. Use sparingly — `'use client'` components already only run in the browser inside `useEffect`. Use only when you need to gate a render branch on "we are in the browser".

```ts
function useIsClient(): boolean;
```

### `useTrack`

`src/shared/hooks/use-track.ts`

Returns a stable callback that fires a GTM event. Avoids the inline `() => sendGTMEvent(...)` pattern that creates a new function on every render.

```ts
function useTrack(payload: Parameters<typeof sendGTMEvent>[0]): () => void;
```

When a card's only client need is an analytics click, prefer `<TrackedLink>` or `<TrackedAnchor>` (which wrap `useTrack`) so the parent can stay a Server Component.

### `useGalleryKeyboard` (lens domain)

`src/domains/lens/hooks/use-gallery-keyboard.ts`

Wires up keyboard navigation for the lens modal: `Escape` closes, `ArrowLeft` / `ArrowRight` navigate. Also locks `body` scroll while the modal is mounted and restores the previous value on unmount.

```ts
function useGalleryKeyboard(handlers: {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}): void;
```

---

## Helper functions

Located in `src/shared/helpers/` unless otherwise noted.

### `animator`

`src/shared/helpers/animator.ts`

Builds the `animate.css` class string for a given configuration.

```ts
interface AnimatorProps {
  name: AnimationNames;
  repeat?: 1 | 2 | 3 | 'infinite';
  delay?: '1s' | '2s' | '3s' | '4s' | '5s';
  speed?: 'slow' | 'slower' | 'fast' | 'faster';
}

function animator(options: AnimatorProps): string;
```

Example:

```ts
animator({ name: 'fadeInUp', speed: 'fast', delay: '1s' });
// "animate__animated animate__fadeInUp animate__fast animate__delay-1s"
```

### `notify`

`src/shared/helpers/notify.ts`

Toast wrapper around `react-toastify` with sensible defaults (Slide transition, 3 s auto-close, hidden progress bar).

```ts
notify.default({ message });
notify.info({ message });
notify.error({ message });
notify.warning({ message });
notify.success({ message });
```

### `pageTitleGenerator`

`src/shared/helpers/page-title-generator.ts`

Looks up a `pathname` in `MENU_ITEM_ROUTES` and returns the matching page title. Falls back to `PERSONAL_DATA.title` (e.g. used inside the burger menu).

```ts
function pageTitleGenerator(pathname: string): string;
```

### Cookies-modal status

`src/shared/helpers/cookies-modal.ts`

Reads / writes the cookie consent status to `localStorage` under the key from `LOCAL_STORAGE_KEYS`. Status values come from `COOKIES_MODAL_STATUS` (`'none' | 'accept' | 'reject'`).

```ts
function getCookiesModalStatus(): CookiesModalStatus;
function updateCookiesModalStatus(status: CookiesModalStatus): void;
```

### `PerformanceMonitor`

`src/shared/helpers/performance.ts`

Singleton wrapper around three `PerformanceObserver`s (LCP, FID, CLS). `monitorWebVitals()` is idempotent — calling it twice does not stack listeners. Exposes `disconnect()` for clean unmount.

| Metric | Good     | Poor     | What it measures         |
| ------ | -------- | -------- | ------------------------ |
| LCP    | ≤ 2500ms | > 4000ms | Largest Contentful Paint |
| FID    | ≤ 100ms  | > 300ms  | First Input Delay        |
| CLS    | ≤ 0.1    | > 0.25   | Cumulative Layout Shift  |
| FCP    | ≤ 1800ms | > 3000ms | First Contentful Paint   |
| TTFB   | ≤ 800ms  | > 1800ms | Time to First Byte       |

Mounted by the `<PerformanceMonitor>` component when `ENV.ANALYZE_MODE` is on.

### Post helpers

`src/shared/helpers/posts/`

#### `getPosts`

```ts
function getPosts(filters?: PostFilters | null, searchValue?: string | null): Posts;
```

Reads all post markdown files once per Node process, filters by `isActive`, applies tag / category / search, and sorts newest first. Returns `{ categories: string[], data: PostMetadata[] }`. Categories include **all** active categories so the filter dropdown stays complete even when filtering is on.

Exports a `__resetPostsCacheForTests()` for unit tests.

#### `getPostContent`

```ts
function getPostContent(id: number): Post | null;
```

Reads a single post. Pads single-digit ids: `getPostContent(5)` reads `posts/post-05.md`.

#### `postSorter`

```ts
function postSorter(first: PostMetadata, second: PostMetadata): number;
```

`Array.sort` comparator — newest date first.

#### `filterPostsByKey`

```ts
function filterPostsByKey(post: PostMetadata, filter: PostFilters | null): boolean;
```

`true` if the post matches the tag or category in `filter`. `tag` takes precedence over `category` when both are set.

#### `searchPosts` (utility, not the route)

```ts
function searchPosts(post: PostMetadata, searchValue: string | null): boolean;
```

Returns `true` if the post's title, description, tags, or category contain the search string (case-insensitive).

#### `readingTime`

```ts
function readingTime(text: string): number;
```

Returns minutes (`Math.ceil(words / 300)`).

#### `generateFilteredPostUrl`

```ts
function generateFilteredPostUrl(filters: { tag?: string; category?: string }): string;
```

Builds a URL for the `/posts` listing with `URLSearchParams`. Tag-only or category-only filters get a single query parameter; both are encoded together.

---

## Services

Located in `src/shared/services/`. All async; all are thin clients over `fetch`.

### `sendEmail`

`src/shared/services/email-service.ts`

Sends the contact form data to `https://email-api.ramiin.se` (Cloudflare Worker maintained outside this repo). Calls `isValidGoogleReCaptcha` first; throws if the token is missing.

```ts
async function sendEmail(data: {
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}): Promise<boolean>;
```

### `isValidGoogleReCaptcha`

`src/shared/services/recaptcha-service.ts`

Verifies a token by POSTing it to the project-local `/api/recaptcha-verify` route (which then calls Google). Throws on failure and emits a `notify.error`.

```ts
async function isValidGoogleReCaptcha(input: { token: string }): Promise<boolean>;
```

### `searchPosts` (service, not the utility)

`src/shared/services/search-service.ts`

Calls `/api/posts/search?q=...` from the client side (used by the `PostsSearch` component).

```ts
async function searchPosts(query: string): Promise<PostMetadata[]>;
```

---

## Endpoints

`src/shared/api/constants/endpoints.ts`

```ts
ENDPOINTS = {
  verifyReCaptcha: '/api/recaptcha-verify',
  sendMessage: 'https://email-api.ramiin.se',
  googleVerifyReCaptcha: 'https://www.google.com/recaptcha/api/siteverify',
  searchPosts: (query: string) => `/api/posts/search?q=${encodeURIComponent(query)}`
};
```
