# Configuration

Every configuration file in the project and what each setting actually does.

---

## `next.config.ts`

### Top-level

```ts
reactStrictMode: true;
reactCompiler: true; // React 19 compiler for automatic memoization
compress: true;
generateEtags: true;
poweredByHeader: false;
productionBrowserSourceMaps: false;
```

`reactCompiler` requires `babel-plugin-react-compiler` (added as a dev dependency).

### `images`

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000,   // 1 year
  dangerouslyAllowSVG: false   // SVGs are imported as React components via @svgr/webpack
}
```

`dangerouslyAllowSVG` is **off**. The project never streams SVG through `next/image`; instead, the webpack rule below transforms SVG imports into React components.

### `experimental.optimizePackageImports`

```ts
[
  'require-in-the-middle',
  'import-in-the-middle',
  'date-fns',
  'clsx',
  'motion',
  'react-toastify',
  'react-hook-form',
  '@next/third-parties'
];
```

Tells Next.js to aggressively tree-shake these packages. Add new heavy libraries here when introducing them.

### `turbopack`

```ts
turbopack: {
  root: __dirname;
}
```

Enables Turbopack for `pnpm dev`. Build still uses Webpack via `next build`.

### `webpack` (SVG loader)

```ts
webpack(config) {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true, svgoConfig: { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] } }}]
  });
  return config;
}
```

Imports of `.svg` files become React components:

```tsx
import Logo from './logo.svg';
<Logo className="w-8 h-8" />;
```

### `headers()`

Sets security and CORS headers in one place.

**Site-wide (all paths)** — defence-in-depth headers, mirrored in `vercel.json`:

| Header                      | Value                                                          |
| --------------------------- | -------------------------------------------------------------- |
| `X-Content-Type-Options`    | `nosniff`                                                      |
| `X-Frame-Options`           | `SAMEORIGIN`                                                   |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                              |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload`                 |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |

**`/api/:path*`** — CORS for the public-read endpoints:

| Header                         | Value                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `Access-Control-Allow-Origin`  | `*`                                                                                                                      |
| `Access-Control-Allow-Methods` | `GET,OPTIONS,PATCH,DELETE,POST,PUT`                                                                                      |
| `Access-Control-Allow-Headers` | `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version` |

**`*.pdf`** — cache the CV PDF for a year:

```ts
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
```

**`/feed.xml`** — short server cache + long SWR for the RSS feed:

```ts
{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' }
{ key: 'Content-Type', value: 'application/rss+xml; charset=utf-8' }
```

### `redirects()`

| Old URL                | New URL                                   |
| ---------------------- | ----------------------------------------- |
| `/skills`              | `/journey`                                |
| `/experiences`         | `/journey`                                |
| `/educations`          | `/journey`                                |
| `/resume.pdf`          | `/`                                       |
| `/random-sex-position` | `https://ramiiin.ir/random-sex-position/` |
| `/csv-row-printer`     | `https://ramiiin.ir/csv-row-printer/`     |

All are `permanent: true` (HTTP 301).

### Sentry wrapping

The whole config is wrapped in `withSentryConfig(withBundleAnalyzer(config), { org, project, … })`. This handles source map upload to Sentry (when not skipped) and instruments the build.

---

## `tsconfig.json`

| Setting            | Value                    | Notes                      |
| ------------------ | ------------------------ | -------------------------- |
| `target`           | `ES2015`                 | Compile target             |
| `module`           | `ESNext`                 | ES module syntax           |
| `moduleResolution` | `bundler`                | Modern resolution for Next |
| `jsx`              | `react-jsx`              | New JSX transform          |
| `strict`           | `true`                   | All strict checks on       |
| `incremental`      | `true`                   | Faster rebuilds            |
| `paths`            | `{ "@/*": ["./src/*"] }` | Alias `@/*` for `src/*`    |

Always prefer `@/<path>` over deep relative imports — Prettier's sort-imports plugin treats them consistently and they survive folder moves.

---

## `eslint.config.mjs`

Flat config. Rule sets in use:

- `typescript-eslint` with **type-checked** rules
- `@next/eslint-plugin-next` for Next-specific patterns
- `eslint-config-prettier` to disable formatting rules that conflict with Prettier
- SARIF reporter wired up for CI (`@microsoft/eslint-formatter-sarif`)

Notable behaviours:

- `pnpm check-lint` runs `eslint "src/**/*.{ts,tsx,js}" --max-warnings=0`. Any warning fails CI.
- `@typescript-eslint/no-explicit-any` is on. Use `unknown` and narrow.
- Type-checked rules read TS types directly, so they catch issues ESLint alone can't see.
- Ignored: `.next/`, `coverage/`, `node_modules/`, `public/`, `.github/`, config files.

---

## `.prettierrc`

```json
{
  "printWidth": 90,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "arrowParens": "always",
  "trailingComma": "none",
  "plugins": ["prettier-plugin-tailwindcss", "prettier-plugin-sort-imports"]
}
```

Plugins:

- `prettier-plugin-tailwindcss` — canonical Tailwind class order.
- `prettier-plugin-sort-imports` (Trivago variant pinned in deps) — predictable import order: 3rd-party → `@/*` → relative.

---

## `jest.config.js`

```js
{
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  maxWorkers: '50%',
  cacheDirectory: '<rootDir>/.jest-cache',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/e2e/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
    '!src/app/**/{layout,page,not-found,error,global-error,manifest,sitemap,robots,opengraph-image,instrumentation-client,fonts}.{ts,tsx}',
    '!src/app/**/route.ts',
    '!src/data/**',
    '!src/shared/components/**/index.ts'
  ],
  coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov', 'html'],
  coverageThreshold: {
    global: { lines: 27, statements: 27, functions: 20, branches: 30 }
  }
}
```

The threshold acts as a ratchet — coverage can grow but not regress. Bump the numbers up when new tests are added.

---

## `playwright.config.ts`

```ts
{
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    serviceWorkers: 'block',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: 'pnpm run build && pnpm run start', url: baseURL, … }
}
```

E2E runs build and start the production server in CI. Locally, it re-uses an existing server if one is already running on the configured port.

---

## `.editorconfig`

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

---

## `.husky/pre-commit`

The current pre-commit hook is intentionally fast:

```sh
pnpm lint-staged
pnpm check-types

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR -- '*.ts' '*.tsx' | tr '\n' ' ')
if [ -n "$STAGED_FILES" ]; then
  pnpm exec jest --bail --findRelatedTests $STAGED_FILES --passWithNoTests
fi
```

What it runs:

1. **`lint-staged`** — Prettier + ESLint on staged files (config in `package.json`).
2. **`check-types`** — full `tsc --noEmit`; TS errors caught here can't be caught by ESLint.
3. **`jest --findRelatedTests <staged>`** — runs only the tests that touch the staged files. Skipped if no `.ts` / `.tsx` is staged.

The full Jest suite, production build, and Playwright E2E run on CI rather than every commit.

`lint-staged` config in `package.json`:

```json
"lint-staged": {
  "**/*": ["prettier --write .", "eslint . --fix"]
}
```

---

## `.prettierignore`

Includes (non-exhaustive):

```text
*.svg
*.png
*.jpg
*.d.ts
.next/
node_modules/
public/
```

Binary files and auto-generated outputs are skipped.

---

## `.lighthouserc.json`

Lighthouse CI budgets used by the `lighthouse` workflow:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 1,
      "settings": { "preset": "desktop", "throttlingMethod": "simulate" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

A11y and SEO are `error` thresholds (PR fails). Performance and best-practices are `warn` thresholds (PR comments but doesn't fail).

---

## `vercel.json`

Mirrors the site-wide security headers from `next.config.ts` for the Vercel edge, plus the CORS headers for `/api/(.*)`. Keeping both in sync means previews and self-hosted runs both get the same headers.

---

## `.github/dependabot.yml`

Weekly npm updates targeting `dev`, monthly GitHub Actions updates. Groups updates by purpose so one PR covers `next + @next/*`, another covers `react + react-dom + @types/*`, etc. See [deployment.md](./deployment.md).
