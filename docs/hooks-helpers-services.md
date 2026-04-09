# Hooks, Helpers, and Services

This document covers all custom hooks, helper functions, and service functions in `src/shared/`.

---

## Custom Hooks

Located in `src/shared/hooks/`.

---

### `useDebounce`

**File**: `src/shared/hooks/use-debounce.ts`

Delays updating a value until the user stops changing it for a specified amount of time.

**Signature:**

```typescript
function useDebounce<T>(value: T, delay: number): T;
```

**Parameters:**

- `value` — the value to debounce
- `delay` — how many milliseconds to wait after the last change

**Returns:** The debounced value (only updates after the delay has passed with no new changes)

**Example:**

```tsx
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

// debouncedSearch only changes 300ms after the user stops typing
useEffect(() => {
  fetchResults(debouncedSearch);
}, [debouncedSearch]);
```

**Used in:** `PostsSearch` to avoid making an API request on every keystroke.

---

### `useIsClient`

**File**: `src/shared/hooks/use-is-client.ts`

Returns `true` if the component is running in the browser, `false` during server-side rendering.

**Signature:**

```typescript
function useIsClient(): boolean;
```

**Returns:** `boolean`

**Example:**

```tsx
const isClient = useIsClient();

if (!isClient) return null; // Don't render on server
return <div>{window.location.href}</div>;
```

**Used in:** Components that use browser APIs like `localStorage` or `window`.

---

## Helper Functions

Located in `src/shared/helpers/`.

---

### `animator`

**File**: `src/shared/helpers/animator.ts`

Builds the correct CSS class string for `animate.css` animations.

**Signature:**

```typescript
function animator(options: AnimatorProps): string;
```

**`AnimatorProps`:**

```typescript
interface AnimatorProps {
  name: AnimationNames; // The animation name (e.g. 'fadeInUp', 'zoomIn')
  repeat?: 1 | 2 | 3 | 'infinite';
  delay?: '1s' | '2s' | '3s' | '4s' | '5s';
  speed?: 'slow' | 'slower' | 'fast' | 'faster';
}
```

**Returns:** A string of CSS class names

**Example:**

```tsx
animator({ name: 'fadeInUp' });
// → "animate__animated animate__fadeInUp"

animator({ name: 'fadeInUp', speed: 'fast', delay: '1s' });
// → "animate__animated animate__fadeInUp animate__fast animate__delay-1s"
```

**Available animation names** include all `animate.css` categories: `fadeIn`, `fadeOut`, `zoomIn`, `slideInLeft`, `bounceIn`, `flipInX`, and many more.

---

### `notify`

**File**: `src/shared/helpers/notify.ts`

Shows toast notification pop-ups using `react-toastify`.

**Signature:**

```typescript
notify.default(options);
notify.info(options);
notify.error(options);
notify.warning(options);
notify.success(options);
```

**Example:**

```tsx
notify.success({ message: 'Email sent successfully!' });
notify.error({ message: 'Something went wrong.' });
```

**Used in:** `ContactForm` to show feedback after form submission.

---

### Post Helpers

**File**: `src/shared/helpers/posts/`

A collection of functions for reading and filtering blog posts. These run on the server because they read from the filesystem.

#### `getPosts(filters?, searchValue?)`

Reads all active posts from the `posts/` folder, applies optional filters, and returns them sorted by date (newest first).

```typescript
function getPosts(filters?: PostFilters, searchValue?: string): PostMetadata[];
```

**Parameters:**

- `filters` — `{ tag?: string, category?: string }` — optional filter
- `searchValue` — optional search string

**Returns:** Array of `PostMetadata` objects (no content, just metadata)

---

#### `getPostContent(id: number)`

Reads a single post by its numeric ID. Returns the full post including markdown content.

```typescript
function getPostContent(id: number): Post | null;
```

**Returns:** A `Post` object (metadata + content), or `null` if not found.

---

#### `readingTime(text: string)`

Estimates how many minutes it takes to read a given text. Uses an average reading speed of 200 words per minute.

```typescript
function readingTime(text: string): number;
```

**Returns:** Number of minutes (rounded up)

---

#### `postSorter(first, second)`

A comparator function for `Array.sort()`. Sorts posts by date, newest first.

```typescript
function postSorter(first: PostMetadata, second: PostMetadata): number;
```

---

#### `filterPostsByKey(post, filter)`

Returns `true` if a post matches the given filter (by tag or category).

```typescript
function filterPostsByKey(post: PostMetadata, filter: PostFilters): boolean;
```

---

#### `searchPosts(post, searchValue)`

Returns `true` if a post matches the given search string. Searches through title, description, tags, and category.

```typescript
function searchPosts(post: PostMetadata, searchValue: string): boolean;
```

---

#### `generateFilteredPostUrl(filters)`

Builds a URL string for the `/posts` page with filter query parameters.

```typescript
function generateFilteredPostUrl(filters: PostFilters): string;
```

**Example:**

```typescript
generateFilteredPostUrl({ category: 'Engineering' });
// → "/posts/?category=Engineering"

generateFilteredPostUrl({ tag: 'React' });
// → "/posts/?tag=React"
```

---

### Performance Helper

**File**: `src/shared/helpers/performance-monitor.ts`

A singleton class that monitors and reports Core Web Vitals.

```typescript
class PerformanceMonitor {
  static getInstance(): PerformanceMonitor;
  init(): void;
}
```

Tracked metrics and their thresholds:

| Metric | Good     | Poor     | What It Measures                                  |
| ------ | -------- | -------- | ------------------------------------------------- |
| LCP    | ≤ 2500ms | > 4000ms | Largest Contentful Paint — main content load time |
| FID    | ≤ 100ms  | > 300ms  | First Input Delay — response to first interaction |
| CLS    | ≤ 0.1    | > 0.25   | Cumulative Layout Shift — visual stability        |
| FCP    | ≤ 1800ms | > 3000ms | First Contentful Paint — time to first content    |
| TTFB   | ≤ 800ms  | > 1800ms | Time to First Byte — server response time         |

Metrics are sent to Google Analytics when recorded.

---

### Cookies Helper

**File**: `src/shared/helpers/cookies.ts`

Reads and writes the cookie consent status from `localStorage`.

```typescript
function getCookiesModalStatus(): CookiesModalStatus;
function updateCookiesModalStatus(status: CookiesModalStatus): void;
```

**`CookiesModalStatus`** values:

- `'none'` — user has not responded yet
- `'accepted'` — user accepted cookies
- `'rejected'` — user rejected cookies

---

### Page Title Helper

**File**: `src/shared/helpers/generate-page-title.ts`

Generates a consistent page `<title>` for SEO.

```typescript
function generatePageTitle(page: string): string;
```

**Example:**

```typescript
generatePageTitle('Posts');
// → "Posts | Ramin Rezaei"
```

---

## Services

Located in `src/shared/services/`. These are async functions that make API calls.

---

### Email Service

**File**: `src/shared/services/email.service.ts`

Sends the contact form data to the email API (a Cloudflare Worker).

```typescript
async function sendEmail(data: {
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}): Promise<boolean>;
```

**Returns:** `true` if the email was sent successfully, `false` otherwise.

**Endpoint:** `https://email-api.ramiin.se`

---

### reCAPTCHA Service

**File**: `src/shared/services/recaptcha.service.ts`

Verifies a reCAPTCHA v3 token by calling the `/api/recaptcha-verify` endpoint.

```typescript
async function isValidGoogleReCaptcha(data: { token: string }): Promise<boolean>;
```

**Returns:** `true` if the token is valid and the score is above the threshold (0.5).

---

### Search Service

**File**: `src/shared/services/search.service.ts`

Searches blog posts by calling the `/api/posts/search` endpoint.

```typescript
async function searchPosts(value: string): Promise<PostMetadata[]>;
```

**Returns:** An array of matching `PostMetadata` objects.
