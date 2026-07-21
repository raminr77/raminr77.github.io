# Sentry Web Vitals Integration — Design Spec

**Date:** 2026-07-21  
**Status:** Approved

---

## Problem

No performance data appears in Sentry. Two root causes:

1. **`<PerformanceMonitor>` is gated behind `ENV.ANALYZE_MODE`** — it is never mounted in
   production or preview. Vitals collection never starts.
2. **`reportMetric` only writes to GTM** — even if the component ran, Sentry would receive
   nothing. There is no call to `Sentry.metrics.*` or `Sentry.setMeasurement` anywhere.

Secondary issues:

- Manual `PerformanceObserver` misses FCP, TTFB, and INP (the modern FID replacement).
- Two dummy test calls (`Sentry.metrics.count / distribution`) pollute the Sentry Metrics dashboard.

---

## Goal

All six Core Web Vitals are captured for every page load where Sentry is enabled, reported to:

- **Sentry Metrics** (custom distribution) — 100 % capture, independent of trace sampling.
- **Sentry Performance Transactions** (span measurement) — appears on the page-load span when sampled.
- **GTM** (via `window.gtag`) — existing behaviour preserved.

Vitals visible in Sentry:

| Vital | Unit  | Good / Poor thresholds                               |
| ----- | ----- | ---------------------------------------------------- |
| LCP   | ms    | ≤ 2 500 / > 4 000                                    |
| CLS   | ratio | ≤ 0.1 / > 0.25                                       |
| FCP   | ms    | ≤ 1 800 / > 3 000                                    |
| TTFB  | ms    | ≤ 800 / > 1 800                                      |
| INP   | ms    | ≤ 200 / > 500                                        |
| FID   | ms    | ≤ 100 / > 300 (deprecated, kept for backward compat) |

---

## Architecture

```
src/app/instrumentation-client.ts   ← single initialization point
  Sentry.init(...)
  initWebVitals()
    └─ onLCP / onCLS / onFCP / onTTFB / onINP / onFID  (web-vitals v5)
         └─ reportWebVital(metric, pathname)
               ├─ Sentry.metrics.distribution(...)   always
               ├─ Sentry.setMeasurement(...)          when active span exists
               └─ window.gtag(...)                    when gtag available
```

Web Vitals are initialized once, at module load of `instrumentation-client.ts`, before React
hydrates. This guarantees early metrics (FCP, TTFB) are not missed.

The `PerformanceMonitor` React component is removed — its only job (calling
`initPerformanceMonitoring`) is superseded by the instrumentation-client approach.

---

## Files Changed

### 1. `package.json`

Add `web-vitals` to `dependencies` (it is already a transitive dep of Next.js; pinning it
explicitly locks the version and makes the import explicit).

```json
"web-vitals": "^5.0.0"
```

### 2. `src/shared/helpers/performance.ts` — refactored

**Remove:**

- `PerformanceMonitor` class and all manual `PerformanceObserver` usage.
- `initPerformanceMonitoring` (superseded).
- `optimizeMemoryUsage` (the only observer teardown was for the manual observers; nothing to tear
  down after switching to `web-vitals`).

**Keep / update:**

- `WEB_VITALS_THRESHOLDS` — add INP threshold, keep all others.
- `reportWebVital(metric, pathname)` — new unified reporter:
  - calls `Sentry.metrics.distribution` (custom metric).
  - calls `Sentry.setMeasurement` (transaction measurement, best-effort on active span).
  - calls `window.gtag` (GTM, conditional on availability).
- `initWebVitals(pathname)` — registers all six `web-vitals` callbacks, idempotent guard.

### 3. `src/app/instrumentation-client.ts`

**Remove:**

```ts
Sentry.metrics.count('user_action', 1);
Sentry.metrics.distribution('api_response_time', 150);
```

**Add** after `Sentry.init`:

```ts
import { initWebVitals } from '@/shared/helpers/performance';
initWebVitals(window.location.pathname);
```

### 4. `src/instrumentation.ts` (server-side)

**Remove** the same two dummy metric calls.

### 5. `src/shared/components/performance-monitor/index.tsx`

**Remove** the file entirely — it is no longer used anywhere.

### 6. `src/shared/components/index.ts`

**Remove** the `PerformanceMonitor` re-export.

### 7. `src/layout/components/third-party-scripts/index.tsx`

**Remove** the `ANALYZE_MODE` block and the `dynamic` import of `PerformanceMonitor`.

### 8. `docs/hooks-helpers-services.md`

Update the `PerformanceMonitor` section to reflect the new `initWebVitals` / `reportWebVital`
API and the full six-vital table.

---

## Sentry API Details (SDK v10)

```ts
// Custom metric — always captured, visible in Sentry > Metrics
Sentry.metrics.distribution(`web_vitals.${name.toLowerCase()}`, value, {
  unit, // 'millisecond' | 'ratio'
  tags: { page: pathname }
});

// Span measurement — visible in Sentry > Performance > Transaction > Measurements
const activeSpan = Sentry.getActiveSpan();
if (activeSpan) {
  Sentry.setMeasurement(name.toLowerCase(), value, unit);
}
```

CLS unit: `'ratio'` (value is a unitless decimal, e.g. 0.08).  
All other vitals unit: `'millisecond'`.

---

## Sentry Metric Names

Custom distribution names follow the `web_vitals.<name>` convention:

| Vital | Distribution name | Measurement name |
| ----- | ----------------- | ---------------- |
| LCP   | `web_vitals.lcp`  | `lcp`            |
| CLS   | `web_vitals.cls`  | `cls`            |
| FCP   | `web_vitals.fcp`  | `fcp`            |
| TTFB  | `web_vitals.ttfb` | `ttfb`           |
| INP   | `web_vitals.inp`  | `inp`            |
| FID   | `web_vitals.fid`  | `fid`            |

All tagged with `{ page: pathname }` for per-route breakdown in the Sentry dashboard.

---

## What Is NOT Changed

- Sentry DSN, sample rates, replay config — untouched.
- GTM event names and consent gating — untouched.
- `WEB_VITALS_THRESHOLDS` constants — kept, INP threshold added.
- `useTrack` / `GTM_EVENTS` — untouched (web vitals are system metrics, not user events).
- `SpeedInsights` (Vercel) — untouched, still mounted.

---

## Test Plan

1. Enable Sentry locally (`NEXT_PUBLIC_SENTRY_ENABLED=true`, valid DSN).
2. Open the app in a browser, navigate a few pages, click something (triggers INP/FID).
3. Sentry > Metrics: check for `web_vitals.lcp`, `web_vitals.cls`, etc. with `page` tag.
4. Sentry > Performance > Transactions: open a page-load transaction, check Measurements section.
5. GTM Debug panel: confirm vitals still fire as `event` with `Web Vitals` category.
6. Run `pnpm check-all && pnpm test` — no regressions.
