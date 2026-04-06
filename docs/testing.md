# Testing

This document explains the testing strategy, setup, and how to run tests.

---

## Overview

The project has two types of tests:

| Type               | Tool                         | What It Tests                       |
| ------------------ | ---------------------------- | ----------------------------------- |
| Unit / Integration | Jest + React Testing Library | Individual functions and components |
| End-to-End (E2E)   | Playwright                   | Full user flows in a real browser   |

---

## Unit and Integration Tests (Jest)

### Setup

**Configuration file**: `jest.config.js`

Key settings:

- **Test environment**: `jsdom` — simulates a browser environment
- **Setup file**: `jest.setup.ts` — loads `@testing-library/jest-dom` matchers
- **Module alias**: `@/*` maps to `src/*` (same as in `tsconfig.json`)
- **CSS module mock**: CSS and SCSS module imports return a proxy object
- **Cache**: `.jest-cache/` (speeds up repeated runs)

### Running Tests

```bash
# Run all tests once
pnpm test

# Run in watch mode (reruns on file changes)
pnpm test:watch

# Run with coverage report
pnpm test:coverage
```

### Test File Locations

Tests live next to the code they test, in `__tests__/` subfolders or as `*.test.ts(x)` files:

```
src/
├── shared/
│   ├── helpers/
│   │   └── posts/
│   │       ├── get-posts.test.ts
│   │       └── utils.test.ts
│   └── hooks/
│       └── use-debounce.test.ts
└── domains/
    ├── contact-me/
    │   └── __tests__/
    │       └── ContactForm.test.tsx
    └── posts/
        └── __tests__/
            └── PostCard.test.tsx
```

### What Is Tested

**Helper functions:**

- `get-posts.test.ts` — tests filtering, searching, and sorting posts
- `utils.test.ts` — tests reading time calculation and URL generation

**Custom hooks:**

- `use-debounce.test.ts` — verifies debounce timing behavior

**Components:**

- `ContactForm.test.tsx` — tests form validation and submission states
- `PostCard.test.tsx` — tests that post data renders correctly

### Writing a New Test

Create a file next to the code you want to test:

```tsx
// src/shared/helpers/my-helper.test.ts
import { myHelper } from '../my-helper';

describe('myHelper', () => {
  it('returns the expected value', () => {
    expect(myHelper('input')).toBe('expected output');
  });
});
```

For React component tests:

```tsx
// src/domains/posts/__tests__/PostCard.test.tsx
import { render, screen } from '@testing-library/react'
import { PostCard } from '../components/PostCard'

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard title="My Post" date={new Date()} ... />)
    expect(screen.getByText('My Post')).toBeInTheDocument()
  })
})
```

---

## End-to-End Tests (Playwright)

E2E tests simulate real user interactions in a browser. They test full page flows — not just individual components.

### Setup

**Configuration file**: `playwright.config.ts`

Key settings:

- **Test directory**: `e2e/`
- **Base URL**: `http://localhost:3000`
- **Screenshots**: Taken on test failure
- **Video**: Retained on failure
- **Parallel execution**: Enabled for faster runs in CI
- **Reduced motion**: Emulated — disables CSS animations for reliable testing
- **reCAPTCHA mock**: reCAPTCHA is mocked so the contact form can be tested without real tokens

### Running E2E Tests

Before running, make sure the dev server is not already running (Playwright starts its own):

```bash
# Run all E2E tests
pnpm test:e2e

# Open the Playwright UI (visual test runner)
pnpm test:e2e:ui

# View the last test report
pnpm test:e2e:report
```

First-time setup — install browser binaries:

```bash
pnpm dlx playwright install
```

### Test Files

Located in the `e2e/` folder:

| File                 | What It Tests                                         |
| -------------------- | ----------------------------------------------------- |
| `navigation.spec.ts` | Clicking nav links, page transitions, header behavior |
| `posts.spec.ts`      | Blog listing, category filter, tag filter             |
| `search.spec.ts`     | Post search input, results display, empty state       |
| `contact.spec.ts`    | Contact form fill-in, validation errors, submission   |
| `lens.spec.ts`       | Gallery grid display, modal open/close                |
| `theme.spec.ts`      | Dark/light mode toggle, theme persistence             |
| `routing.spec.ts`    | URL routing, 404 page, redirects                      |

### Writing a New E2E Test

```typescript
// e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate to the projects page', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/projects/"]');
  await expect(page).toHaveURL('/projects/');
  await expect(page.locator('h1')).toContainText('Projects');
});
```

### Key Playwright Concepts Used

- `page.goto(url)` — navigate to a URL
- `page.click(selector)` — click an element
- `page.fill(selector, text)` — type into an input
- `page.locator(selector)` — select an element
- `expect(locator).toBeVisible()` — assert element is visible
- `expect(page).toHaveURL(url)` — assert the current URL

---

## CI Testing

Both Jest and Playwright tests run automatically in GitHub Actions on every pull request. See [deployment.md](./deployment.md) for details on the CI pipeline.

Tests must pass before a PR can be merged.
