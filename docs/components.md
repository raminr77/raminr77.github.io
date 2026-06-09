# Components

Every component in the project, where it lives and what it does.

Three groups:

- **Shared**: `src/shared/components/`, reusable across features.
- **Domain**: `src/domains/<feature>/components/`, scoped to one feature.
- **Layout**: `src/layout/components/`, present on every page.

All folder names are kebab-case. The export is always `export function ComponentName(...) {}`. Props are declared as a named `interface ComponentNameProps` above the component.

---

## Shared components

Located in `src/shared/components/`.

### Button

`src/shared/components/button/`

A semantic `<button>` with loading and disabled states. When `loading` is true, it shows the `Spinner` and disables itself automatically.

| Prop        | Type                   | Required | Default | Notes               |
| ----------- | ---------------------- | -------- | ------- | ------------------- |
| `label`     | `string`               | yes      | -       | Visible text        |
| `type`      | `'submit' \| 'button'` | yes      | -       | HTML type attribute |
| `loading`   | `boolean`              | no       | `false` | Shows the spinner   |
| `disabled`  | `boolean`              | no       | `false` |                     |
| `className` | `string`               | no       | -       | Extra classes       |
| `testId`    | `string`               | no       | -       | `data-testid`       |
| `onClick`   | `MouseEventHandler`    | no       | -       |                     |

### TextInput

`src/shared/components/text-input/`

A single input that renders as `text`, `email`, `password`, or `textarea`. Pairs with `react-hook-form` via `register`.

### Spinner

`src/shared/components/spinner/`

Purely visual SVG loading indicator. No props.

### CustomCursor

`src/shared/components/custom-cursor/`

Replaces the browser cursor with a canvas trail on desktop (≥ 1100 px). Returns `null` on smaller viewports. Listens to `mousemove` + `resize`; cleans up on unmount.

### ToggleThemeButton

`src/shared/components/toggle-theme-button/`

Switches between dark and light theme. Persists the choice to `localStorage`.

### PixelCanvas

`src/shared/components/pixel-canvas/`

Thin React wrapper around the `<pixel-canvas>` custom element defined in `src/shared/libs/pixel-canvas/`. Dynamic-imports the element registration on the client. Forwards configuration via `data-*` attributes.

### PixelCard

`src/shared/components/pixel-card/`

A decorative card that wraps `PixelCanvas` and an animator. Used in a few hero areas.

### DecryptedText

`src/shared/components/decrypted-text/`

Text that animates as if being decrypted. Two modes:

- `animateOn="view"`: runs once when the element scrolls into view (`IntersectionObserver`).
- `animateOn="hover"`: runs on hover.

### ResumeDownloaderButton

`src/shared/components/resume-downloader-button/`

Downloads the CV PDF (`/Software-Engineer-Ramin-Rezaei-CV.pdf`) and tracks the click via GTM.

### PerformanceMonitor

`src/shared/components/performance-monitor/`

Non-visual. On mount, calls `initPerformanceMonitoring()` (LCP / FID / CLS observers) and disconnects on unmount. Only mounted from `<ThirdPartyScripts>` when `ENV.ANALYZE_MODE` is on.

### ClientCodeLoader

`src/shared/components/client-code-loader/`

Bootstraps `highlight.js` + `highlightjs-copy` on the client. Highlights every `<code>` on the page and attaches a copy button. Mounted once on the post detail page. **Does not** own the expand / collapse behaviour, that belongs to `CodeBlock`.

### CodeBlock

`src/shared/components/code-block/`

A `'use client'` replacement for `<pre>` rendered by `markdown-to-jsx`. Wired in via `overrides: { pre: CodeBlock }` on the main markdown block. Measures the natural height of its `<pre>` (via `scrollHeight` in `useLayoutEffect`) and, when the height exceeds 480 px, clips the block and renders an absolute-positioned "Expand Code" / "Collapse Code" button at the bottom. Smooth-scrolls back to the top of the block on collapse. Respects `prefers-reduced-motion`.

| Prop        | Type        | Notes                                            |
| ----------- | ----------- | ------------------------------------------------ |
| `className` | `string`    | Forwarded from `markdown-to-jsx` (language hint) |
| `children`  | `ReactNode` | The rendered `<code>` element                    |

### TrackedLink

`src/shared/components/tracked-link/`

A `next/link` wrapper that fires a GTM event on click. Use for **internal** navigation when you want a Server Component to stay server-rendered (parent stays server, only the click handler is client).

```tsx
<TrackedLink href={ROUTES.POSTS} trackingPayload={GTM_EVENTS.MENU('Posts')}>
  Posts
</TrackedLink>
```

### TrackedAnchor

`src/shared/components/tracked-link/tracked-anchor.tsx`

The plain-`<a>` sister of `TrackedLink`. Use for external URLs (`target="_blank"`, `rel="noopener noreferrer"`). Same `trackingPayload` shape.

### Pagination

`src/shared/components/pagination/`

Page-link list with ellipsis logic for long page counts. Pure URL-driven; uses `next/link`.

### PageHeader

`src/shared/components/page-header/`

Title + optional description block at the top of a page. Animated entrance.

### Tooltip

`src/shared/components/tooltip/`

Small floating tooltip on hover / focus.

### Icons

`src/shared/components/icons/`

SVG icon set, lazy-loaded per icon via `React.lazy`. Pick an icon by name (`name="share"`, `name="close"`, …), see `ICONS` constant in `icons/index.tsx` for the full set.

---

## Domain components

### Home (`src/domains/home/`)

- **HeroTextAnimator**: animates the hero heading.
- **Summary**: short bio block.
- **MoreInformationButton**: CTA that links to the About Me page and tracks the click.

### Posts (`src/domains/posts/`)

- **PostCard**: preview card (Server Component, uses `TrackedLink`). Description is truncated to 210 chars.
- **PostsSearch**: debounced search input that calls `/api/posts/search`.
- **PostsCategoryFilter**: category dropdown.
- **EmptyPostBlock**: shown when filters return no posts.
- **PostDate**: formatted date.
- **PostTags**: tag chip list.
- **PostCategory**: category chip.
- **PostAuthor**: author byline.
- **PostReadTime**: estimated reading time (300 wpm).
- **PostShare**: copies the post URL to the clipboard (with a `document.execCommand('copy')` fallback for insecure contexts).
- **BackToPostButton**: link back to `/posts/`.

### Projects (`src/domains/projects/`)

- **ProjectCard**: project card with optional demo + GitHub links.
- **ProjectCardDemoLink**: small client wrapper around the demo link so the rest of the card stays server-rendered.
- **ProjectsFooter**: closing CTA.

### Journey (`src/domains/journey/`)

- **JourneyCard**: one entry (Server Component, uses `TrackedAnchor` + a directly-imported `PixelCanvas`).
- **JourneyScroller**: handles scroll-into-view for deep links.

### About Me (`src/domains/about-me/`)

- **RecommendationsBox**: compact preview of testimonials, linking to `/recommendations/`.

### Contact Me (`src/domains/contact-me/`)

- **ContactForm**: full contact form. `react-hook-form` for validation, reCAPTCHA v3 via `useGoogleReCaptcha`, `<Button loading>` for submission state, toast on success / error.

### Lens (`src/domains/lens/`)

- **LensCard**: one tile in the gallery grid. Opens the modal on click / Enter.
- **LensGalleryModal**: full-screen modal with previous / next buttons. Keyboard handling lives in `useGalleryKeyboard` (`src/domains/lens/hooks/`): Escape closes, arrow keys navigate.

### Recommendations (`src/domains/recommendations/`)

- **RecommendationCard**: bordered card with an amber left-accent. Uses `TrackedAnchor` so the parent stays server-rendered.
- **RecommendationsFooter**: closing CTA.

### Error / Not Found (`src/domains/error/`, `src/domains/not-found/`)

Stylized error UI shown by the route-level `error.tsx` and `not-found.tsx` boundaries.

---

## Layout components

Located in `src/layout/components/`. All present on every page.

### Header

`src/layout/components/header/`

Top navigation bar with menu links and the theme toggle. Used on every page.

### BurgerMenu

`src/layout/components/burger-menu/`

Mobile hamburger menu. Hidden on desktop. Opens an animated panel; close-out runs `animator({ name: 'fadeOutUp' })` then unmounts.

### ContentContainer

`src/layout/components/content-container/`

Shared wrapper that gives pages consistent padding and entrance animation.

| Prop            | Type             | Notes                           |
| --------------- | ---------------- | ------------------------------- |
| `children`      | `ReactNode`      | Page content                    |
| `className`     | `string`         | Extra classes                   |
| `animationName` | `AnimationNames` | Optional entrance animation key |

### ProgressBar

`src/layout/components/progress-bar/`

Thin route-transition bar at the top of the page. Driven by `usePathname()` + `requestAnimationFrame`. CSS variables (`--bar-color`, `--bar-height`) set once on mount.

### CookiesModal

`src/layout/components/cookies-modal/`

Cookie consent banner. The choice is saved to `localStorage` and a `cookies-status-change` custom event is dispatched so `ThirdPartyScripts` can react to it without a route change.

### ServiceWorkerRegistrar

`src/layout/components/service-worker-registrar/`

Registers `/service-worker.js`. Only runs in production. Failures go to Sentry when enabled.

### ThirdPartyScripts

`src/layout/components/third-party-scripts/`

Loads GA, GTM, AdSense, and Vercel Speed Insights. GA and GTM only load once the user accepts cookies. The `.ir` / `.se` GA measurement IDs are selected from the current hostname.
