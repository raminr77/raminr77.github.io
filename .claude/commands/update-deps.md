---
description: Safely check outdated deps and report upgrade impact (no install)
allowed-tools: Bash(pnpm outdated:*), Bash(pnpm info:*), mcp__plugin_context7_context7__resolve-library-id, mcp__plugin_context7_context7__query-docs
---

Show outdated packages and assess upgrade risk. **Do not run `pnpm add` or `pnpm update` unless the user explicitly asks.**

## Steps

1. Run `pnpm outdated --long` to get the full table of outdated packages.
2. Group findings:
   - **Patch** (safe, just apply)
   - **Minor** (review changelog briefly)
   - **Major** (high-risk, Next.js, React, Tailwind, motion, gsap, jest, eslint, typescript, @sentry/nextjs)
3. For each **major** bump in a critical lib (`next`, `react`, `react-dom`, `tailwindcss`, `typescript`, `eslint`, `jest`):
   - Fetch the upgrade guide via `context7` (resolve the library id, then query for "migration", "upgrade", or "breaking changes").
   - Summarize the migration steps in 3–5 bullets.
4. Print a table:

```
| Package | Current | Wanted | Latest | Bump  | Risk      |
|---------|---------|--------|--------|-------|-----------|
```

5. Recommend an order to upgrade (e.g. tooling first → React/Next together → libs).
6. End with: "Tell me which package(s) you want me to upgrade and I will branch off `dev`, apply the change, and run `/pre-merge`."

## Things to NOT do

- Do not modify `package.json` or `pnpm-lock.yaml`.
- Do not run `pnpm install` / `pnpm add` / `pnpm update`.
