---
description: Run bundle analyzer and summarize the biggest chunks per route
allowed-tools: Bash(pnpm build:analyze:*), Read, Bash(ls:*)
---

Run `pnpm build:analyze` (which sets `ANALYZE=true next build --webpack`) and summarize the report.

## Steps

1. Run `pnpm build:analyze`. This generates HTML reports under `.next/analyze/` (or similar — confirm path from output).
2. After the build, list the report files: `ls -la .next/analyze/ 2>/dev/null` (or wherever `@next/bundle-analyzer` wrote them).
3. From the build output, capture the per-route "First Load JS" table and present it sorted descending.
4. Highlight:
   - Any route over **200 kB** First Load JS.
   - Any single chunk over **100 kB** in the largest 5 chunks list.
   - Shared chunks vs. route-specific chunks.
5. Suggest concrete next steps if anything is over budget (e.g. dynamic-import a heavy lib, move client → server, split a component).
6. Print the path to the HTML report so the user can open it in a browser.

Do **not** open the browser automatically — just give the path.
