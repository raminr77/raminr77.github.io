---
description: Performance audit — bundle, Core Web Vitals risks, RSC boundaries, observer leaks
allowed-tools: Bash(pnpm build:*), Bash(pnpm build:analyze:*), Bash(grep:*), Bash(rg:*), mcp__plugin_context-mode_context-mode__ctx_batch_execute, Read
---

Run a performance audit. Use the `perf-auditor` subagent if available; otherwise execute this checklist directly.

## Checklist

### 1. RSC / Client-component boundary

- Run: `grep -rln "'use client'" src/ | wc -l`. Report the count; flag if it grew since the May 2026 audit (was 44).
- Identify components marked `'use client'` that only have static content + a single `onClick` analytics call — those are candidates for the `useTrack` hook + server parent pattern.
- Verify no `React.lazy(...)` in Server Components — grep `React.lazy` outside `'use client'` files.

### 2. Dynamic imports

- Find all `next/dynamic` usages. Verify `ssr: false` only appears in files that are themselves `'use client'`.

### 3. Heavy libraries

- Confirm `motion`, `gsap`, `react-toastify`, `react-hook-form`, `@next/third-parties` are listed in `next.config.ts` → `experimental.optimizePackageImports`.
- Check `package.json` for duplicate animation libs (we already use `motion` + `gsap` + `animate.css` — flag if a fourth slips in).

### 4. Effect & observer leaks

- Grep `new PerformanceObserver|new IntersectionObserver|new ResizeObserver|new MutationObserver` and verify each has a matching `.disconnect()` or `.unobserve()` in the cleanup.
- Grep `addEventListener` and verify each has a matching `removeEventListener`.

### 5. Images

- Find `<img ` (raw img tags) anywhere under `src/` — should be 0; flag any.
- For each `<Image src={...} />`, confirm `width`+`height` OR `fill` is set, and an `alt` is provided.

### 6. Server-side caching

- Verify `getPosts` / `getPostContent` still parse markdown once per process (module-level cache present).

### 7. Build size (optional, slow)

If the user wants numbers, run `pnpm build` and capture per-route First Load JS. Anything over 200 kB is worth investigating.

## Output

Produce a short report grouped by severity (🔴 Critical → 🟠 High → 🟡 Medium → 🟢 OK). Each finding: file:line + suggestion.

Do **not** apply fixes unless the user asks. End with:

```
Run /audit-perf again after fixes to verify.
```
