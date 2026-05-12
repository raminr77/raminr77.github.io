---
description: Write a test for a given file/function/component
argument-hint: <relative-or-absolute-path>
allowed-tools: Bash(pnpm test:*), Read, Write, Edit, mcp__plugin_context-mode_context-mode__ctx_batch_execute
---

Write a Jest test (or extend an existing one) for **$ARGUMENTS**.

## Steps

1. Read the target file. Identify:
   - Exports (functions / components / classes)
   - External dependencies that need mocking (fs, fetch, next/router, GTM, react-toastify, etc.)
   - Branches, conditions, and edge cases worth covering
2. Locate the existing test file (`<name>.test.ts(x)` next to the source, or in a `__tests__/` folder). If none exists, decide the conventional location:
   - Domain code → `src/domains/<domain>/__tests__/<name>.test.tsx`
   - Shared component → `src/shared/components/<name>/<name>.test.tsx`
   - Shared helper → `src/shared/helpers/<name>.test.ts`
   - Hook → `src/shared/hooks/<name>.test.ts`
   - API route → next to `route.ts` with `@jest-environment node` docblock
3. Write tests covering:
   - Happy path
   - Each branch / conditional
   - Error and null-input paths
   - For React components: render + the most important interaction (click, submit, navigate)
4. **Mocking rules**:
   - `@next/third-parties/google` → `jest.mock(..., () => ({ sendGTMEvent: jest.fn() }))`
   - `next/navigation` → mock `useRouter`, `usePathname`, `redirect` as needed
   - `fs` → use `jest.mock('fs')` and `jest.Mocked<typeof fs>`
   - `react-toastify` → mocked via `@/shared/helpers` notify export
   - Network calls → `global.fetch = jest.fn().mockResolvedValue(...)`
5. Run `pnpm test -- <name>` and ensure all tests pass.
6. Report final test count and confirm `pnpm test` (full suite) is still green.

## Conventions

- Use `describe('<exportName>', () => {...})` block per exported symbol.
- Each `it(...)` is a single behavioural assertion. Prefer multiple short `it`s over one long one.
- Reset mocks in `beforeEach(() => { jest.clearAllMocks(); })`.
- Route handler tests need `/** @jest-environment node */` because `Request`/`Response` aren't defined in jsdom.
