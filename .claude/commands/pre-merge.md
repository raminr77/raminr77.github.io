---
description: Full pre-merge verification — check-all + tests + build (no E2E)
allowed-tools: Bash(pnpm check-all:*), Bash(pnpm test:*), Bash(pnpm build:*)
---

Run the complete pre-merge verification chain. This is the same chain CI runs:

1. `pnpm check-all` — format · lint · types
2. `pnpm test` — Jest unit tests (199+)
3. `pnpm build` — full Next.js production build

Report each step's outcome with timing. If any step fails, print the failure output (max 60 lines) and stop. Do not auto-fix.

If everything passes, print:

```
🚀 Ready to merge
- format · lint · types: ✅
- unit tests: ✅ (<count> tests in <time>)
- production build: ✅ (<routes> routes generated)
```

Note: E2E tests (`pnpm test:e2e`) are not run here. Mention them in the summary as "skipped — run manually with `pnpm test:e2e`".
