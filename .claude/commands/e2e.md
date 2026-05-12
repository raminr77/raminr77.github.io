---
description: Run Playwright E2E tests (full suite or filtered)
argument-hint: [optional grep-pattern]
allowed-tools: Bash(pnpm test\:e2e:*), Bash(pnpm dev:*)
---

Run the Playwright E2E suite for: **$ARGUMENTS** (omit for full suite).

## Steps

1. If $ARGUMENTS is empty, run `pnpm test:e2e`. Otherwise run `pnpm test:e2e -- --grep "$ARGUMENTS"`.
2. Playwright needs the dev/preview server. The config is expected to handle webServer setup automatically — if it fails complaining about a server, surface the message and ask the user to start `pnpm dev` first.
3. On success, print a 1-line summary: `<N> e2e tests passed in <duration>`.
4. On failure:
   - Print the failed spec names and the first failing assertion's stack trace.
   - Mention `pnpm test:e2e:ui` and `pnpm test:e2e:report` for interactive debugging.
   - Do not auto-retry unless the user asks.

## Tips

- Run a single file: `/e2e contact-validation`
- Run with UI: ask the user to run `pnpm test:e2e:ui` directly (interactive, not suitable for this command).
