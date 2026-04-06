# Styling

This document explains the styling setup — Tailwind CSS, SCSS modules, global styles, fonts, and theming.

---

## Overview

The project uses two styling approaches together:

1. **Tailwind CSS** — utility classes applied directly in JSX (e.g. `className="flex gap-4 text-lg"`)
2. **SCSS Modules** — component-scoped CSS files (e.g. `Button.module.scss`) for styles that are complex or need to be isolated

Both approaches work side by side. Use Tailwind for most styling and SCSS modules for complex or stateful styles.

---

## Tailwind CSS

**Version**: 4.2.2

Tailwind generates utility classes based on the configuration. Every file inside `src/` is scanned for Tailwind classes.

**Configuration file**: `tailwind.config.ts`

```typescript
content: ['./src/**/*.{js,ts,jsx,tsx,mdx}']
darkMode: 'class'

theme.extend:
  fontFamily:
    text: ['var(--font-text)']    // Hubballi font
    title: ['var(--font-title)']  // Gantari font
  colors:
    background: 'var(--background)'
    foreground: 'var(--foreground)'
```

**Key points:**

- `darkMode: 'class'` — dark mode is toggled by adding/removing the `dark` class on `<html>`.
- Font families and colors reference CSS variables, so they automatically update when the theme changes.
- The `background` and `foreground` colors from Tailwind map to the CSS variable values.

**PostCSS** (`postcss.config.mjs`) runs Tailwind's transform plugin:

```js
plugins: { '@tailwindcss/postcss': {} }
```

---

## Global Styles

**File**: `src/app/globals.scss`

This file sets up the design tokens (CSS variables), base styles, and shared animations.

### CSS Variables

```scss
:root {
  --primary: #ff8f00; // Main orange accent color
  --background: #0a0a0a; // Dark background
  --foreground: #ededed; // Light text
  --blog-title-background: #282c34;
  --code-block-background: rgb(40, 44, 52);
  --bar-height: 1px;
  --bar-color: #ff8f00;
}
```

In light mode, some of these values are overridden:

```scss
.light {
  --background: #ffffff;
  --foreground: #0a0a0a;
}
```

### Animations

Two reusable CSS animations are defined globally:

**shine-animation** — pulses opacity (used for decorative lines):

```scss
@keyframes shine {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

.shine-animation-top {
  animation: shine 3s ease-in-out infinite;
}
.shine-animation-bottom {
  animation: shine 3s ease-in-out infinite reverse;
}
```

**float-animation** — gently moves an element up and down:

```scss
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.float-animation {
  animation: float 4s ease-in-out infinite;
}
```

### Custom Scrollbar

The scrollbar is styled to match the site theme. On hover, the scrollbar thumb turns the primary orange color.

### Toast Notifications

The styles for `react-toastify` toast pop-ups are customized here to match the site's dark background and fonts.

---

## Fonts

**File**: `src/app/fonts.ts`

Two fonts are loaded from Google Fonts using Next.js's built-in font system (`next/font/google`).

| Font     | Variable       | Used For              | Weight                |
| -------- | -------------- | --------------------- | --------------------- |
| Hubballi | `--font-text`  | Body text, paragraphs | 400                   |
| Gantari  | `--font-title` | Headings, titles      | All weights (100–900) |

Both fonts use `display: 'swap'`, which means text shows in a fallback font while the custom font loads. This avoids invisible text during page load.

The fonts are injected as CSS variables on the `<html>` tag in `src/app/layout.tsx`.

**Usage in Tailwind:**

```jsx
<p className="font-text">Body text</p>
<h1 className="font-title">Heading</h1>
```

---

## SCSS Modules

Component-specific styles use CSS Modules with SCSS syntax. A module file is named `ComponentName.module.scss` and placed next to the component.

**How it works:**

```scss
// Button.module.scss
.button {
  padding: 0.5rem 1rem;
  &:hover {
    opacity: 0.8;
  }
}
```

```tsx
// Button.tsx
import styles from './Button.module.scss';

<button className={styles.button}>Click me</button>;
```

CSS Modules automatically scope class names so they do not clash with other components. The class name `button` in `Button.module.scss` will never conflict with a `button` class in another component.

---

## Theming: Dark and Light Mode

The theme system works through CSS classes and CSS variables.

**How it works:**

1. The current theme is stored in `localStorage` under the key `theme`.
2. On page load, the stored theme is read and the `dark` or `light` class is added to `<html>`.
3. CSS variables change based on which class is active:
   - `.dark` uses `--background: #0a0a0a` and `--foreground: #ededed`
   - `.light` uses `--background: #ffffff` and `--foreground: #0a0a0a`
4. Tailwind's `darkMode: 'class'` lets you write conditional dark-mode classes:
   ```jsx
   <div className="bg-white dark:bg-black">...</div>
   ```
5. The `ToggleThemeButton` component handles switching between themes and updating `localStorage`.

---

## The `clsx` Utility

The project uses `clsx` to build class name strings conditionally:

```tsx
import clsx from 'clsx'

<div className={clsx('base-class', isActive && 'active', className)}>
```

This is cleaner than string concatenation and handles `false`/`undefined` values automatically.

---

## Animate.css Integration

The project includes `animate.css` for quick CSS animations. The `animator()` helper in `src/shared/helpers/animator.ts` generates the correct class names.

**Usage:**

```tsx
import { animator } from '@/shared/helpers/animator';

<div className={animator({ name: 'fadeInUp', speed: 'fast', delay: '1s' })}>Content</div>;
```

This produces the correct `animate__` prefixed class names that `animate.css` expects.

---

## GSAP and Framer Motion

More complex animations use:

- **GSAP** (`gsap`) — for scroll-triggered animations, timelines, and advanced sequences.
- **Framer Motion** (`motion`) — for React component animations with simple declarative props.

These are used in specific components like `HeroTextAnimator` where fine-grained animation control is needed.
