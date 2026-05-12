# Getting Started

This guide covers local setup, the available scripts, and what the Husky pre-commit hook actually runs.

---

## Requirements

| Tool    | Version                                                          | Purpose            |
| ------- | ---------------------------------------------------------------- | ------------------ |
| Node.js | matches `.nvmrc`                                                 | JavaScript runtime |
| pnpm    | 10.x (`packageManager` in `package.json` pins the exact version) | Package manager    |
| Git     | any recent version                                               | Version control    |

This project uses **pnpm**. Don't use `npm` or `yarn` — the lockfile is `pnpm-lock.yaml`.

---

## Installation

```bash
git clone https://github.com/raminr77/raminr77.github.io.git
cd raminr77.github.io
pnpm install
```

### Environment variables

Copy the example file and fill in the values that apply to your environment:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored. See [environment-variables.md](./environment-variables.md) for what each variable means.

---

## Running locally

```bash
pnpm dev      # http://localhost:3000 (Turbopack)
```

The dev server uses Turbopack for fast incremental rebuilds.

---

## Available scripts

| Script                 | Command                 | What it does                                                 |
| ---------------------- | ----------------------- | ------------------------------------------------------------ |
| Dev server             | `pnpm dev`              | Start the dev server with Turbopack                          |
| Dev (HTTPS)            | `pnpm dev-https`        | Same as above but over HTTPS (Next experimental flag)        |
| Build                  | `pnpm build`            | Production build                                             |
| Start                  | `pnpm start`            | Serve the production build                                   |
| Lint (fix)             | `pnpm lint`             | ESLint with `--fix` on the whole tree                        |
| Lint (strict)          | `pnpm check-lint`       | ESLint over `src/` with `--max-warnings=0` (used in CI)      |
| Format (write)         | `pnpm format`           | Prettier `--write` across the project                        |
| Format (check)         | `pnpm check-format`     | Prettier `--check` (used in CI)                              |
| Type check             | `pnpm check-types`      | `tsc --noEmit`                                               |
| All checks             | `pnpm check-all`        | format · lint · types (the full safety net)                  |
| Unit tests             | `pnpm test`             | Jest                                                         |
| Tests (watch)          | `pnpm test:watch`       | Jest in watch mode                                           |
| Tests (coverage)       | `pnpm test:coverage`    | Jest with coverage. Threshold defined in `jest.config.js`    |
| E2E                    | `pnpm test:e2e`         | Playwright                                                   |
| E2E (UI)               | `pnpm test:e2e:ui`      | Playwright's interactive UI                                  |
| E2E (report)           | `pnpm test:e2e:report`  | Open the last Playwright HTML report                         |
| E2E (install browsers) | `pnpm test:e2e:install` | Install Playwright browsers (run this once)                  |
| Bundle analyze         | `pnpm build:analyze`    | Production build with `@next/bundle-analyzer` (uses Webpack) |
| Lighthouse             | `pnpm performance`      | Build, start, and run Lighthouse against the local server    |
| Lighthouse only        | `pnpm lighthouse`       | Run Lighthouse against an already-running localhost:3000     |

---

## Husky pre-commit hook

`.husky/pre-commit` keeps commits fast by checking only what you touched:

1. **`pnpm lint-staged`** — Prettier and ESLint on the staged files (config in `package.json`).
2. **`pnpm check-types`** — full TypeScript check; ESLint can't see type errors.
3. **`pnpm exec jest --bail --findRelatedTests <staged>`** — runs the unit tests that touch the staged files (skipped automatically if no `.ts` / `.tsx` files are staged).

The full Jest suite, the production build, and the Playwright E2E suite run on CI rather than in the pre-commit hook. See [deployment.md](./deployment.md) for the CI table.

---

## Common workflows

| You want to…                   | Run                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| Add a blog post                | Create `posts/post-NN.md` (zero-pad ids ≤ 9). See [data-and-content.md](./data-and-content.md).  |
| Add a new page                 | Add a folder under `src/app/<route>/page.tsx` and a domain entry under `src/domains/<feature>/`. |
| Add a generic UI component     | `src/shared/components/<name>/` + register in `src/shared/components/index.ts`.                  |
| Add a feature-scoped component | `src/domains/<feature>/components/<name>/`.                                                      |
| Add a unit test                | Co-locate as `<name>.test.tsx` or under `__tests__/`. See [testing.md](./testing.md).            |
| Verify before pushing          | `pnpm check-all && pnpm test && pnpm build`                                                      |
