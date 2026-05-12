# Testing

Testing strategy, setup, and how to run the suites.

---

## Overview

| Type               | Tool                         | What it tests                       |
| ------------------ | ---------------------------- | ----------------------------------- |
| Unit / integration | Jest + React Testing Library | Individual functions and components |
| End-to-end (E2E)   | Playwright                   | Full user flows in a real browser   |

At the time of writing the project ships **41 test suites / 227 tests** for the unit layer and 16 Playwright specs covering the main user journeys.

---

## Unit and integration tests (Jest)

### Jest configuration

`jest.config.js`. Key settings:

| Setting                  | Value                                                             | Why                                                  |
| ------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------- |
| `testEnvironment`        | `jest-environment-jsdom`                                          | Simulates a browser environment for component tests  |
| `setupFilesAfterEach`    | `<rootDir>/jest.setup.ts`                                         | Loads `@testing-library/jest-dom` matchers           |
| `moduleNameMapper`       | `^@/(.*)$ → <rootDir>/src/$1`, CSS / SCSS → `identity-obj-proxy`  | Resolves the `@/` alias; mocks CSS module imports    |
| `cacheDirectory`         | `<rootDir>/.jest-cache`                                           | Speeds up repeated runs                              |
| `testPathIgnorePatterns` | `/.next/`, `/node_modules/`, `/e2e/`                              | Don't run E2E specs as unit tests                    |
| `collectCoverageFrom`    | `src/**/*.{ts,tsx}` minus tests / barrels / route handlers / data | Coverage scope kept honest                           |
| `coverageReporters`      | `text`, `text-summary`, `json-summary`, `lcov`, `html`            | Coverage outputs for both local terminal and CI      |
| `coverageThreshold`      | global lines 27, statements 27, functions 20, branches 30         | Baseline ratchet — coverage may grow but not regress |

The threshold is intentionally set just below the current numbers so any drop fails the suite. Bump it as new tests are added.

### Running Jest

```bash
pnpm test             # full suite
pnpm test:watch       # watch mode
pnpm test:coverage    # with coverage report (enforces threshold)
pnpm test -- <name>   # filter by file/folder name
```

### Where tests live

Co-located next to the code they test, either as `<name>.test.ts(x)` siblings or in a `__tests__/` folder.

```text
src/shared/hooks/use-debounce.test.ts
src/shared/services/email-service.test.ts
src/shared/helpers/posts/get-posts.test.ts
src/shared/components/code-block/code-block.test.tsx
src/shared/components/tracked-link/tracked-link.test.tsx
src/domains/posts/__tests__/post-card.test.tsx
src/domains/journey/__tests__/journey-card.test.tsx
src/domains/lens/hooks/use-gallery-keyboard.test.ts
src/app/api/posts/search/route.test.ts          # @jest-environment node
src/app/api/recaptcha-verify/route.test.ts      # @jest-environment node
```

### Conventions

- `describe('<exportName>')` per exported symbol.
- `beforeEach(() => { jest.clearAllMocks(); })`.
- `jest.mocked(fn)` for type-safe assertions on mocked functions.
- Prefer `screen.getByRole` and `screen.getByText`; reach for `data-testid` only when nothing else works.
- Use `userEvent.setup()` rather than `fireEvent`.

### Route-handler tests

Tests for `route.ts` files need the Node environment because `Request` / `Response` are not defined in jsdom. Add the docblock at the top:

```ts
/**
 * @jest-environment node
 */
```

### Standard mocks

```ts
jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  redirect: jest.fn()
}));

jest.mock('@/shared/helpers', () => ({
  ...jest.requireActual('@/shared/helpers'),
  notify: { error: jest.fn(), success: jest.fn(), info: jest.fn(), warning: jest.fn() }
}));
```

For modules that read the filesystem (post helpers):

```ts
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;
```

To pre-prime the posts cache between tests:

```ts
import { __resetPostsCacheForTests } from '@/shared/helpers/posts/get-posts';

beforeEach(() => __resetPostsCacheForTests());
```

---

## End-to-end tests (Playwright)

### Playwright configuration

`playwright.config.ts`. Notable settings:

- `testDir: './e2e'`
- `baseURL`: `http://localhost:3000` (override with `PLAYWRIGHT_BASE_URL`)
- `webServer`: runs `pnpm run build && pnpm run start` in CI; reuses an existing server locally
- `fullyParallel: true`
- `forbidOnly: !!process.env.CI`
- `retries: process.env.CI ? 2 : 0`
- Trace on first retry; screenshot on failure; video on failure
- Service workers blocked (so caching can't interfere with assertions)
- `chromium` is the only project (no cross-browser fan-out by default)
- Default reCAPTCHA / GA / Sentry env values point to safe stubs

### Running Playwright

```bash
pnpm test:e2e             # full suite (headless)
pnpm test:e2e:ui          # interactive UI
pnpm test:e2e:report      # open the last HTML report
pnpm test:e2e -- --grep "contact"   # filter specs
```

First-time setup:

```bash
pnpm test:e2e:install
```

### Specs

```text
e2e/about-me.spec.ts
e2e/contact.spec.ts
e2e/contact-validation.spec.ts
e2e/lens.spec.ts
e2e/navigation.spec.ts
e2e/navigation-full.spec.ts
e2e/pages.spec.ts
e2e/post-detail.spec.ts
e2e/posts.spec.ts
e2e/posts-filter.spec.ts
e2e/projects.spec.ts
e2e/recommendations.spec.ts
e2e/routing.spec.ts
e2e/search.spec.ts
e2e/search-extended.spec.ts
e2e/theme.spec.ts
```

### Writing a spec

```ts
import { test, expect } from '@playwright/test';

test('user can navigate to the projects page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /projects/i }).click();
  await expect(page).toHaveURL(/\/projects\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/projects/i);
});
```

Prefer role-based selectors over CSS / XPath. They are more resilient to refactors.

---

## CI

Unit and E2E tests both run on every push and PR via `.github/workflows/tests.yml`. Coverage is uploaded as an artifact (and commented on PRs via `MishaKav/jest-coverage-comment`). See [deployment.md](./deployment.md) for the full CI table.
