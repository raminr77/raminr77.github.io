# Styling

Tailwind CSS, SCSS modules, global styles, fonts, theming, and the animation libraries used in the project.

---

## Overview

Two approaches work side-by-side:

1. **Tailwind CSS** for the vast majority of styling, utility classes in JSX.
2. **SCSS modules** (`*.module.scss`) for component-scoped CSS that is too gnarly for utilities (custom selectors, pseudo-elements, keyframes, layered transitions).

Prefer Tailwind first. Reach for a module when:

- The same class needs a `::before` / `::after` pseudo-element.
- You need state-conditional CSS that can't be expressed with `data-*` + variants.
- You have keyframes that don't already live in `animate.css`.

---

## Tailwind CSS 4

The project uses Tailwind 4 with the `@tailwindcss/postcss` plugin.

**Configuration**: `tailwind.config.ts`

```ts
content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
darkMode: 'class',
theme: {
  extend: {
    fontFamily: {
      text: ['var(--font-text)'],
      title: ['var(--font-title)']
    },
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)'
    }
  }
}
```

Key points:

- `darkMode: 'class'`: dark mode is toggled by adding / removing the `dark` class on `<html>`.
- Tailwind colors `background` and `foreground` map to CSS variables, so a single class works for both themes.
- The `font-text` and `font-title` utilities reference Google Fonts loaded via `next/font/google`.

PostCSS config (`postcss.config.mjs`) just enables the Tailwind plugin:

```js
plugins: { '@tailwindcss/postcss': {} }
```

### Class-list ergonomics

`prettier-plugin-tailwindcss` sorts utility classes in the canonical order. `clsx` is imported as a **named** import everywhere (project convention):

```ts
import { clsx } from 'clsx';

<div className={clsx('base classes', condition && 'state', className)} />;
```

VS Code workspace settings (`.vscode/settings.json`) include a `tailwindCSS.experimental.classRegex` entry that gives IntelliSense for class strings nested inside `clsx(...)` calls.

---

## Global styles

`src/app/globals.scss`

Defines design tokens and shared keyframes.

### CSS variables

```scss
:root {
  --primary: #ff8f00;
  --background: #0a0a0a;
  --foreground: #ededed;
  --blog-title-background: #282c34;
  --code-block-background: rgb(40, 44, 52);
  --bar-height: 1px;
  --bar-color: #ff8f00;
}

.light {
  --background: #ffffff;
  --foreground: #0a0a0a;
}
```

### Shared keyframes

- `shine`: opacity pulse used for the top / bottom border lines in the layout.
- `float`: gentle up / down translate for circles on `journey-card`.

Both are exposed as utility classes (`.shine-animation-top`, `.shine-animation-bottom`, `.float-animation`).

### Scrollbar styling

Custom scrollbar theme that turns amber on hover. Defined in `globals.scss`.

### Toast theme

`react-toastify` styles are tweaked here to match the dark backdrop. Component-level overrides (e.g. progress class) are passed inline on `<ToastContainer>` in `src/app/layout.tsx`.

---

## Fonts

`src/app/fonts.ts` loads two Google Fonts via `next/font/google`:

| Font     | CSS variable   | Used for          | Weights              |
| -------- | -------------- | ----------------- | -------------------- |
| Hubballi | `--font-text`  | Body text         | 400                  |
| Gantari  | `--font-title` | Headings, accents | 100–900 (full range) |

Both use `display: 'swap'` so text shows in a fallback font while the custom font streams in. The CSS variables are applied to `<html>` in `src/app/layout.tsx`, which makes them available to every Tailwind `font-text` / `font-title` utility.

---

## SCSS modules

A module is named `<component-name>.module.scss` and lives next to its component (kebab-case to match the folder).

```scss
// recommendation-card.module.scss
.recommendation-card {
  &::before { … }
}
```

```tsx
// recommendation-card/index.tsx
import styles from './recommendation-card.module.scss';

<div className={styles['recommendation-card']} />;
```

CSS Modules auto-scope class names. Use `styles['kebab-case']` because BEM-style names work better with `::before` pseudo-selectors than camelCase.

Modules used in the project:

- `hero-text-animator.module.scss`
- `summary.module.scss`
- `post-card.module.scss`, `post-detail-page.module.scss`
- `journey-card.module.scss`
- `recommendation-card.module.scss`
- `about-me.module.scss`
- `progress-bar.module.scss`
- `burger-menu.module.scss`
- `header.module.scss`
- `resume-downloader-button.module.scss`
- `code-block.module.scss` (gradient overlay + toggle button)
- `client-code-loader.scss` (global-ish, applies to every `pre`)

---

## Theming

1. `localStorage` key from `LOCAL_STORAGE_KEYS.THEME` holds `'dark'` or `'light'`.
2. `<ToggleThemeButton>` reads / writes the key and toggles the `dark` / `light` class on `<html>`.
3. Tailwind's `darkMode: 'class'` reads the same class for `dark:` variants.
4. CSS variables in `globals.scss` swap values per class, so non-Tailwind code (SCSS modules) also follows the theme.

`<html>` ships pre-set to `dark` (see `src/app/layout.tsx`) so first paint has the dark palette.

---

## Animation libraries

The project uses three different animation tools, each for what it does best:

- **animate.css**: quick one-shot animations applied via classes. Use through the `animator()` helper (see [hooks-helpers-services.md](./hooks-helpers-services.md)).
- **Motion** (the Framer Motion rebrand, package name `motion`), declarative React animations. Used by `DecryptedText` (via `motion.span`).
- **GSAP** + **@gsap/react**: imperative timelines for sequenced effects.

The project also has the custom `<pixel-canvas>` element (`src/shared/libs/pixel-canvas/`) for the canvas-based pixel grid hover effect on certain cards.

All three respect `prefers-reduced-motion` where it applies:

- `progress-bar/index.tsx` skips the loading animation when reduced motion is on.
- `pixel-canvas/index.ts` skips per-pixel delays.
- `code-block` uses a `@media (prefers-reduced-motion: reduce)` block to drop transitions.
