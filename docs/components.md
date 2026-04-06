# Components

This document describes every component in the project — where it lives, what it does, and its props.

Components are split into three groups:

- **Shared components** — used across multiple pages
- **Domain components** — belong to a specific feature/page
- **Layout components** — appear on every page

---

## Shared Components

Located in `src/shared/components/`.

---

### Button

**Path**: `src/shared/components/Button/`

A reusable button. Supports loading state, disabled state, and custom styles.

**Props:**

| Prop        | Type                   | Required | Description               |
| ----------- | ---------------------- | -------- | ------------------------- |
| `label`     | `string`               | Yes      | Button text               |
| `type`      | `'submit' \| 'button'` | Yes      | HTML button type          |
| `testId`    | `string`               | No       | Data attribute for tests  |
| `loading`   | `boolean`              | No       | Shows a spinner when true |
| `className` | `string`               | No       | Extra CSS classes         |
| `disabled`  | `boolean`              | No       | Disables the button       |
| `onClick`   | `MouseEventHandler`    | No       | Click handler             |

When `loading` is true, the button shows a `Spinner` component and is automatically disabled.

---

### TextInput

**Path**: `src/shared/components/TextInput/`

A flexible input field. Can render as a text input, email input, password input, or textarea.

**Props:**

| Prop          | Type                                            | Default  | Description                         |
| ------------- | ----------------------------------------------- | -------- | ----------------------------------- |
| `type`        | `'text' \| 'password' \| 'email' \| 'textarea'` | `'text'` | Input type                          |
| `label`       | `string`                                        | -        | Label text shown above the input    |
| `value`       | `string`                                        | -        | Current value                       |
| `error`       | `string \| null`                                | -        | Error message shown below the input |
| `required`    | `boolean`                                       | -        | Marks the field as required         |
| `placeholder` | `string`                                        | -        | Placeholder text                    |

---

### Spinner

**Path**: `src/shared/components/Spinner/`

An animated SVG loading spinner. Used inside the `Button` component when loading.

No props — it is purely visual.

---

### CustomCursor

**Path**: `src/shared/components/CustomCursor/`

Replaces the default browser cursor with a custom styled cursor. Follows mouse movement.

No props.

---

### ToggleThemeButton

**Path**: `src/shared/components/ToggleThemeButton/`

A button that switches between dark and light theme. Shows a sun or moon icon depending on the current theme.

No props.

---

### PixelCanvas

**Path**: `src/shared/components/PixelCanvas/`

A canvas-based animation that creates a grid of pixels with a 3D hover effect. Used as a decorative background element.

**Props** (passed as data attributes on the web component):

| Prop             | Type      | Description                        |
| ---------------- | --------- | ---------------------------------- |
| `data-gap`       | `number`  | Gap between pixels                 |
| `data-speed`     | `number`  | Animation speed                    |
| `data-colors`    | `string`  | Comma-separated list of hex colors |
| `data-play-ones` | `boolean` | Play animation once then stop      |
| `data-auto-play` | `boolean` | Start animation automatically      |

---

### PixelCard

**Path**: `src/shared/components/PixelCard/`

A card component with a pixel animation hover effect powered by `PixelCanvas`.

---

### DecryptedText

**Path**: `src/shared/components/DecryptedText/`

Displays text that animates as if it is being "decrypted" — characters scramble and then reveal the real text.

---

### ResumeDownloaderButton

**Path**: `src/shared/components/ResumeDownloaderButton/`

A button that triggers a download of Ramin's resume PDF. The URL comes from `src/data/resume-file.ts`.

---

### PerformanceMonitor

**Path**: `src/shared/components/PerformanceMonitor/`

A non-visual component that sets up Core Web Vitals monitoring. Reports metrics to Google Analytics. Mounted once in the root layout.

---

### ClientCodeLoader

**Path**: `src/shared/components/ClientCodeLoader/`

Renders a code snippet with syntax highlighting. Used in blog posts that contain code blocks.

---

### Tooltip

**Path**: `src/shared/components/Tooltip/`

A small floating tooltip that appears on hover. Wraps any element and shows a text label.

---

### Icons

**Path**: `src/shared/components/Icons/`

A collection of SVG icon components. Each icon is its own component that accepts standard SVG props like `width`, `height`, and `className`.

---

## Domain Components

These components are specific to one feature and live inside `src/domains/`.

---

### Home Domain

**Path**: `src/domains/home/`

#### HeroTextAnimator

Animates the main heading on the home page. Letters appear one by one with a reveal effect.

#### Summary

Displays the short bio text under the hero heading.

---

### Posts Domain

**Path**: `src/domains/posts/`

#### PostCard

Shows a preview of one blog post in the posts list. Displays title, date, category, tags, and description.

#### PostsSearch

A search input that filters posts as you type. Uses debouncing to avoid searching on every keystroke.

#### PostsCategoryFilter

A dropdown that filters posts by category.

#### EmptyPostBlock

Shown when a search or filter returns no results. Has a message and a "clear filters" link.

#### PostDate

Renders a formatted date string. Example: `January 15, 2024`.

#### PostTags

Renders a list of tag badges. Each tag is a link that filters the posts list.

#### PostCategory

Renders the category badge for a post.

#### PostAuthor

Displays the author's name and optionally an avatar.

#### PostReadTime

Shows the estimated reading time for a post. Example: `5 min read`.

#### PostShare

Social sharing buttons. Lets the user share the post on Twitter, LinkedIn, etc.

#### BackToPostsButton

A back button that links to the `/posts` page.

---

### Projects Domain

**Path**: `src/domains/projects/`

#### ProjectCard

One card per project. Shows: project name, description, your role, tech stack (as badges), and links to the live site or GitHub.

---

### Journey Domain

**Path**: `src/domains/journey/`

#### JourneyCard

One card per timeline entry. Shows: company/school name, dates, title/role, and a description.

---

### About Me Domain

**Path**: `src/domains/about-me/`

#### RecommendationsBox

A compact section inside the About Me page that shows a few recommendations. Links to the full `/recommendations` page.

---

### Contact Me Domain

**Path**: `src/domains/contact-me/`

#### ContactForm

The full contact form. Includes:

- Email input with validation
- Subject input
- Message textarea
- Google reCAPTCHA v3 integration (invisible)
- Submit button with loading state
- Toast notification on success or error

Uses `react-hook-form` for form state and validation.

---

### Lens Domain

**Path**: `src/domains/lens/`

#### LensCard

One card per photo in the gallery grid. Shows a thumbnail. Clicking it opens the modal.

#### LensGalleryModal

A full-screen modal that shows the selected photo at full size. Supports keyboard navigation (arrow keys, Escape to close).

#### LensEmptyBlock

Shown when there are no images to display.

---

## Layout Components

Located in `src/layout/components/`. These appear on every page.

---

### Header

**Path**: `src/layout/components/Header/`

The top navigation bar. Contains:

- Site logo/name
- Navigation links to each page
- Theme toggle button
- Mobile burger menu button

---

### BurgerMenu

**Path**: `src/layout/components/BurgerMenu/`

The mobile hamburger menu. Hidden on desktop. Opens a slide-in navigation panel on small screens.

---

### ContentContainer

**Path**: `src/layout/components/ContentContainer/`

A wrapper that gives consistent padding and max-width to page content. Most pages wrap their content in this.

**Props:**

| Prop            | Type             | Description                          |
| --------------- | ---------------- | ------------------------------------ |
| `title`         | `string`         | Optional page title shown at the top |
| `children`      | `ReactNode`      | Page content                         |
| `className`     | `string`         | Extra CSS classes                    |
| `animationName` | `AnimationNames` | Entrance animation                   |

---

### ProgressBar

**Path**: `src/layout/components/ProgressBar/`

A thin bar at the top of the page that animates during route transitions. Gives the user feedback that a new page is loading.

---

### CookiesModal

**Path**: `src/layout/components/CookiesModal/`

A cookie consent banner shown to first-time visitors. The user can accept or reject cookies. The choice is saved in `localStorage`.

---

### ServiceWorkerRegistrar

**Path**: `src/layout/components/ServiceWorkerRegistrar/`

Registers the PWA service worker. Runs once when the app loads. Only active in production.

---

### ThirdPartyScripts

**Path**: `src/layout/components/ThirdPartyScripts/`

Loads external scripts: Google Analytics, Google Tag Manager, Google AdSense. Only loads them after the user accepts cookies.
