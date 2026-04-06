# Configuration

This document explains every configuration file in the project and what each setting does.

---

## `next.config.ts`

The main Next.js configuration file.

### React Strict Mode

```typescript
reactStrictMode: true;
```

React renders components twice in development to detect side effects and deprecated usage. Disabled automatically in production.

### Performance Settings

```typescript
compress: true; // Gzip responses
generateEtags: true; // Cache validation headers
poweredByHeader: false; // Remove "X-Powered-By: Next.js" header
productionBrowserSourceMaps: false; // No source maps in production
```

### Image Optimization

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000,  // 1 year in seconds
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
}
```

- `formats` — serve AVIF first (smallest), fall back to WebP
- `deviceSizes` — breakpoints for responsive `srcset` attributes
- `imageSizes` — sizes for the `sizes` attribute on smaller images
- `minimumCacheTTL` — cache optimized images for 1 year
- `dangerouslyAllowSVG` — allows SVG files through the image optimizer (with a security policy)

### Experimental Features

```typescript
experimental: {
  optimizePackageImports: [
    'require-in-the-middle',
    'import-in-the-middle',
    'date-fns',
    'clsx'
  ];
}
```

Tells Next.js to tree-shake specific packages more aggressively, reducing bundle size.

### Turbopack

```typescript
turbopack: { ... }
```

Enables Turbopack for development builds (`pnpm dev`). Turbopack is significantly faster than Webpack for local development.

### Webpack (SVG Loader)

```typescript
webpack: (config) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  });
  return config;
};
```

Allows importing SVG files directly as React components:

```tsx
import Logo from './logo.svg';
<Logo className="w-8 h-8" />;
```

### CORS Headers

Added to all `/api/*` routes:

```typescript
{ key: 'Access-Control-Allow-Origin', value: '*' }
{ key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' }
{ key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }
```

### Redirects

```typescript
redirects: [
  { source: '/skills', destination: '/journey', permanent: true },
  { source: '/blog', destination: '/posts', permanent: true }
];
```

Old URLs are permanently redirected (301) to their new locations.

### Sentry Integration

Sentry is wrapped around the entire Next.js config using `withSentryConfig()`. It handles:

- Error tracking in production
- Source map uploading to Sentry (for readable stack traces)
- Performance monitoring

---

## `tsconfig.json`

TypeScript compiler configuration.

| Setting            | Value                  | Meaning                                              |
| ------------------ | ---------------------- | ---------------------------------------------------- |
| `target`           | `ES2015`               | Compile to ES2015 JavaScript                         |
| `module`           | `ESNext`               | Use ESNext module syntax                             |
| `moduleResolution` | `bundler`              | Let the bundler handle module resolution             |
| `jsx`              | `react-jsx`            | Use the new JSX transform (no `import React` needed) |
| `strict`           | `true`                 | Enable all strict type checks                        |
| `incremental`      | `true`                 | Cache compilation for faster rebuilds                |
| `paths`            | `{"@/*": ["./src/*"]}` | Enable `@/` as an alias for `src/`                   |

The `@/*` path alias is the most important setting. It allows clean imports:

```tsx
// Instead of this:
import { Button } from '../../../shared/components/Button';

// You can write this:
import { Button } from '@/shared/components/Button';
```

---

## `eslint.config.mjs`

ESLint rules for code quality.

**Rule sets enabled:**

- `typescript-eslint` recommended — TypeScript-specific rules with type checking
- `next/core-web-vitals` — Next.js performance and accessibility rules

**Ignored paths:**

- `.git/`, `.next/`, `coverage/`, `node_modules/`
- Config files (tsconfig, eslint itself, jest, playwright, etc.)
- `public/`, `.github/`

**Key behaviors:**

- Type-checked rules are enabled, meaning ESLint reads the TypeScript types to catch more errors.
- The `@typescript-eslint/no-explicit-any` rule is active — avoid using `any` type.
- Next.js rules enforce performance practices like using `next/image` instead of `<img>`.

---

## `.prettierrc`

Code formatting rules. All code is automatically formatted to these standards.

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

| Setting         | Value  | Meaning                                       |
| --------------- | ------ | --------------------------------------------- |
| `printWidth`    | 90     | Wrap lines longer than 90 characters          |
| `tabWidth`      | 2      | Use 2 spaces for indentation                  |
| `useTabs`       | false  | Use spaces, not tabs                          |
| `semi`          | true   | Always add semicolons                         |
| `singleQuote`   | true   | Use single quotes for strings                 |
| `arrowParens`   | always | Always wrap arrow function params: `(x) => x` |
| `trailingComma` | none   | No trailing commas after the last item        |

**Plugins:**

- `prettier-plugin-tailwindcss` — sorts Tailwind utility classes in a consistent order
- `prettier-plugin-sort-imports` — sorts `import` statements alphabetically

---

## `jest.config.js`

Jest configuration for unit and integration tests.

```javascript
{
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.module\\.(css|scss)$': 'identity-obj-proxy'
  },
  cacheDirectory: '.jest-cache',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/']
}
```

- `jsdom` environment — simulate browser APIs in Node.js
- `jest.setup.ts` — loads `@testing-library/jest-dom` for extra matchers like `toBeInTheDocument()`
- `moduleNameMapper` — resolves `@/` imports and returns a proxy object for CSS modules
- `identity-obj-proxy` — CSS module proxy returns the class name itself as the value (e.g. `styles.button` returns `"button"`)

---

## `playwright.config.ts`

Playwright configuration for end-to-end tests.

```typescript
{
  testDir: './e2e',
  baseURL: 'http://localhost:3000',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    reducedMotion: 'reduce'
  }
}
```

- `fullyParallel` — tests run in parallel for speed
- `retries` — in CI, failed tests retry up to 2 times to reduce flakiness
- `screenshot` — captures a screenshot when a test fails
- `video` — saves a video recording when a test fails
- `reducedMotion: 'reduce'` — disables CSS animations so tests are not timing-dependent

---

## `.editorconfig`

Ensures consistent formatting across different editors and operating systems.

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

- `lf` line endings (Unix style) — consistent across Windows, Mac, Linux
- `utf-8` charset
- Final newline at end of each file

---

## `.husky/pre-commit`

Git hook that runs before every commit. Executes `lint-staged`.

**`lint-staged` configuration (in `package.json`):**

```json
"lint-staged": {
  "*.{ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{js,mjs,cjs}": ["prettier --write"],
  "*.{css,scss}": ["prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

Only the files you changed are checked, not the entire project. This keeps commits fast.

---

## `.prettierignore`

Files that Prettier should skip:

```
*.svg
*.png
*.jpg
*.d.ts
.next/
node_modules/
public/
```

Binary files (images) and auto-generated files (`.d.ts`, `.next/`) are not formatted.
