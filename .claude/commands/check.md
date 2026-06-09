---
description: Run the full safety net, format check, lint, types, and unit tests
allowed-tools: Bash(pnpm check-all:*), Bash(pnpm test:*), mcp__plugin_context-mode_context-mode__ctx_execute
---

Run the project's verification chain in order and report a concise pass/fail summary for each step.

1. `pnpm check-all`: runs prettier (`check-format`), eslint (`check-lint` with `--max-warnings=0`), and `tsc --noEmit`.
2. `pnpm test`: runs the full Jest suite (199+ tests).

If any step fails:

- Print the **first 50 lines** of relevant error output.
- Do **not** attempt fixes unless the user explicitly asks.

If all steps pass, output exactly:

```
✅ format · lint · types · tests, all green
```
