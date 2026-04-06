# Getting Started

This guide explains how to set up the project on your local machine and run it.

---

## Requirements

Before you start, make sure you have these installed:

| Tool    | Version            | Purpose            |
| ------- | ------------------ | ------------------ |
| Node.js | 18 or higher       | JavaScript runtime |
| pnpm    | 10.33.0 or higher  | Package manager    |
| Git     | Any recent version | Version control    |

> This project uses **pnpm** as its package manager. Do not use `npm` or `yarn` — the lockfile is for pnpm.

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/raminr77/raminr77.github.io.git
cd raminr77.github.io
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Set up environment variables**

Copy the example env file and fill in the values:

```bash
cp .env.example .env.local
```

See [environment-variables.md](./environment-variables.md) for what each variable means.

---

## Running Locally

**Start the development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The development server uses **Turbopack** for fast builds and hot module replacement.

---

## Available Scripts

| Script         | Command              | What It Does                          |
| -------------- | -------------------- | ------------------------------------- |
| Dev server     | `pnpm dev`           | Start local dev server with Turbopack |
| Build          | `pnpm build`         | Create optimized production build     |
| Start          | `pnpm start`         | Run the production build locally      |
| Lint           | `pnpm lint`          | Check code with ESLint                |
| Format         | `pnpm format`        | Format code with Prettier             |
| Type check     | `pnpm type-check`    | Run TypeScript compiler               |
| Unit tests     | `pnpm test`          | Run Jest tests                        |
| Test watch     | `pnpm test:watch`    | Run Jest in watch mode                |
| Test coverage  | `pnpm test:coverage` | Generate coverage report              |
| E2E tests      | `pnpm test:e2e`      | Run Playwright end-to-end tests       |
| E2E UI mode    | `pnpm test:e2e:ui`   | Open Playwright test UI               |
| Bundle analyze | `pnpm build:analyze` | Build and open bundle visualizer      |
| Lighthouse     | `pnpm performance`   | Run Lighthouse performance audit      |

---

## First-Time Setup for E2E Tests

Playwright needs browser binaries. Install them once:

```bash
pnpm dlx playwright install
```

---

## Git Hooks

The project uses **Husky** for pre-commit hooks. When you commit code, it automatically:

1. Runs **Prettier** to format changed files
2. Runs **ESLint** to catch errors

This happens via **lint-staged** (only checks files you changed, not the whole project).

If the hooks fail, fix the reported issues before committing again.
