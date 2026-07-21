# Sentry Web Vitals Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Report all six Core Web Vitals to Sentry (custom metrics + span measurements) and GTM on every production page load, replacing the broken ANALYZE_MODE-gated PerformanceMonitor.

**Architecture:** Initialize `web-vitals` callbacks in `instrumentation-client.ts` so collection starts before React hydrates. Each callback calls `reportWebVital`, which writes to Sentry custom metrics (always), Sentry span measurements (best-effort), and GTM. The `PerformanceMonitor` React component is removed.

**Tech Stack:** `web-vitals` v5, `@sentry/nextjs` v10, Jest 30, TypeScript 6.

## Global Constraints

- Package manager: `pnpm` — never `npm` or `yarn`.
- Named `interface` for every props/shape — no inline types.
- No `any`. Use `unknown` at boundaries and narrow before use.
- Full words for all identifiers — no single-letter variables.
- `pnpm check-all` (`prettier + eslint + tsc --noEmit`) must pass after every task.
- `pnpm test` (251 tests) must pass after every task.
- No commits unless explicitly requested.

---

## File Map

| File                                                  | Action   | Responsibility                                             |
| ----------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `package.json`                                        | Modify   | Add `web-vitals` dep                                       |
| `src/shared/helpers/performance.ts`                   | Refactor | `WEB_VITALS_THRESHOLDS`, `reportWebVital`, `initWebVitals` |
| `src/shared/helpers/performance.test.ts`              | Create   | Unit tests for `reportWebVital` and `initWebVitals`        |
| `src/app/instrumentation-client.ts`                   | Modify   | Call `initWebVitals`, remove dummy metrics                 |
| `src/instrumentation.ts`                              | Modify   | Remove dummy metrics                                       |
| `src/shared/components/performance-monitor/index.tsx` | Delete   | Superseded by instrumentation-client                       |
| `src/shared/components/index.ts`                      | Modify   | Remove `PerformanceMonitor` re-export                      |
| `src/layout/components/third-party-scripts/index.tsx` | Modify   | Remove `ANALYZE_MODE` block + dynamic import               |
| `docs/hooks-helpers-services.md`                      | Update   | Document new `initWebVitals` / `reportWebVital` API        |

---

## Task 1 — Install `web-vitals` and remove dummy Sentry calls

**Files:**

- Modify: `package.json`
- Modify: `src/instrumentation.ts`
- Modify: `src/app/instrumentation-client.ts`

**Interfaces:**

- Produces: `web-vitals` available as an import in subsequent tasks.

- [ ] **Step 1: Add `web-vitals` to dependencies**

In `package.json`, add to the `dependencies` block (alphabetically between `react-toastify` and the closing brace, or after `react-hook-form`):

```json
"web-vitals": "^5.0.0",
```

Run:

```bash
pnpm install
```

Expected: `web-vitals 5.x.x` appears in `node_modules/.pnpm`.

- [ ] **Step 2: Remove dummy metric calls from `src/instrumentation.ts`**

Open `src/instrumentation.ts`. Delete these two lines inside the `register()` function:

```ts
Sentry.metrics.count('user_action', 1);
Sentry.metrics.distribution('api_response_time', 150);
```

The `register()` function body after the change should only contain the `Sentry.init(...)` call and the integrations config.

- [ ] **Step 3: Remove dummy metric calls from `src/app/instrumentation-client.ts`**

Open `src/app/instrumentation-client.ts`. Delete these two lines inside the `if (ENV.SENTRY_ENABLED)` block:

```ts
Sentry.metrics.count('user_action', 1);
Sentry.metrics.distribution('api_response_time', 150);
```

- [ ] **Step 4: Verify no regressions**

```bash
pnpm check-all && pnpm test
```

Expected: all 251 tests pass, no lint or type errors.

---

## Task 2 — Refactor `performance.ts` — new `reportWebVital` + `initWebVitals`

**Files:**

- Modify: `src/shared/helpers/performance.ts`
- Create: `src/shared/helpers/performance.test.ts`

**Interfaces:**

- Produces:
  - `WEB_VITALS_THRESHOLDS` — same shape as before, plus `INP: { good: 200, poor: 500 }`
  - `reportWebVital(metric: Metric, pathname: string): void`
  - `initWebVitals(pathname: string): void`
  - `__resetVitalsForTests(): void` — resets module-level guard for tests

- [ ] **Step 1: Write the failing tests first**

Create `src/shared/helpers/performance.test.ts`:

```ts
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/nextjs';
import type { Metric } from 'web-vitals';

import {
  WEB_VITALS_THRESHOLDS,
  __resetVitalsForTests,
  initWebVitals,
  reportWebVital
} from './performance';

jest.mock('@sentry/nextjs', () => ({
  metrics: { distribution: jest.fn() },
  getActiveSpan: jest.fn(),
  setMeasurement: jest.fn()
}));

jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onFCP: jest.fn(),
  onFID: jest.fn(),
  onINP: jest.fn(),
  onLCP: jest.fn(),
  onTTFB: jest.fn()
}));

const mockGtag = jest.fn();

function makeMetric(name: Metric['name'], value: number): Metric {
  return {
    name,
    value,
    delta: value,
    id: 'v3-test',
    entries: [],
    navigationType: 'navigate',
    rating: 'good'
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  (window as Window & { gtag?: jest.Mock }).gtag = mockGtag;
  (Sentry.getActiveSpan as jest.Mock).mockReturnValue(null);
  __resetVitalsForTests();
});

describe('WEB_VITALS_THRESHOLDS', () => {
  it('includes INP thresholds', () => {
    expect(WEB_VITALS_THRESHOLDS.INP).toEqual({ good: 200, poor: 500 });
  });

  it('preserves existing LCP thresholds', () => {
    expect(WEB_VITALS_THRESHOLDS.LCP).toEqual({ good: 2500, poor: 4000 });
  });
});

describe('reportWebVital', () => {
  it('sends a Sentry distribution for LCP with millisecond unit', () => {
    reportWebVital(makeMetric('LCP', 2100), '/about');
    expect(Sentry.metrics.distribution).toHaveBeenCalledWith('web_vitals.lcp', 2100, {
      unit: 'millisecond',
      tags: { page: '/about' }
    });
  });

  it('sends a Sentry distribution for CLS with ratio unit', () => {
    reportWebVital(makeMetric('CLS', 0.05), '/');
    expect(Sentry.metrics.distribution).toHaveBeenCalledWith('web_vitals.cls', 0.05, {
      unit: 'ratio',
      tags: { page: '/' }
    });
  });

  it('calls setMeasurement when an active span exists', () => {
    (Sentry.getActiveSpan as jest.Mock).mockReturnValue({});
    reportWebVital(makeMetric('LCP', 2100), '/');
    expect(Sentry.setMeasurement).toHaveBeenCalledWith('lcp', 2100, 'millisecond');
  });

  it('skips setMeasurement when no active span', () => {
    reportWebVital(makeMetric('LCP', 2100), '/');
    expect(Sentry.setMeasurement).not.toHaveBeenCalled();
  });

  it('fires window.gtag with the vital name and Web Vitals category', () => {
    reportWebVital(makeMetric('FCP', 1500), '/posts');
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'FCP',
      expect.objectContaining({
        event_category: 'Web Vitals',
        non_interaction: true
      })
    );
  });

  it('rounds CLS value * 1000 for GTM to avoid sending 0', () => {
    reportWebVital(makeMetric('CLS', 0.08), '/');
    expect(mockGtag).toHaveBeenCalledWith(
      'event',
      'CLS',
      expect.objectContaining({ value: 80 })
    );
  });

  it('skips GTM when window.gtag is not defined', () => {
    delete (window as Window & { gtag?: jest.Mock }).gtag;
    reportWebVital(makeMetric('LCP', 2100), '/');
    expect(mockGtag).not.toHaveBeenCalled();
  });
});

describe('initWebVitals', () => {
  it('registers all six web-vitals callbacks', () => {
    initWebVitals('/');
    expect(onLCP).toHaveBeenCalledTimes(1);
    expect(onCLS).toHaveBeenCalledTimes(1);
    expect(onFCP).toHaveBeenCalledTimes(1);
    expect(onTTFB).toHaveBeenCalledTimes(1);
    expect(onINP).toHaveBeenCalledTimes(1);
    expect(onFID).toHaveBeenCalledTimes(1);
  });

  it('is idempotent — calling twice registers listeners only once', () => {
    initWebVitals('/');
    initWebVitals('/about');
    expect(onLCP).toHaveBeenCalledTimes(1);
  });

  it('does nothing in a non-browser environment', () => {
    const originalWindow = global.window;
    // @ts-expect-error — simulating SSR
    delete global.window;
    initWebVitals('/');
    expect(onLCP).not.toHaveBeenCalled();
    global.window = originalWindow;
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
pnpm test src/shared/helpers/performance.test.ts
```

Expected: FAIL — `reportWebVital`, `initWebVitals`, `__resetVitalsForTests` not exported.

- [ ] **Step 3: Replace `src/shared/helpers/performance.ts` with the new implementation**

Full file replacement:

```ts
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/nextjs';
import type { Metric } from 'web-vitals';

export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 }
} as const;

type VitalUnit = 'millisecond' | 'ratio';

interface WindowWithGtag extends Window {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
}

function getVitalUnit(name: string): VitalUnit {
  return name === 'CLS' ? 'ratio' : 'millisecond';
}

export function reportWebVital(metric: Metric, pathname: string): void {
  const unit = getVitalUnit(metric.name);
  const lowerName = metric.name.toLowerCase();

  Sentry.metrics.distribution(`web_vitals.${lowerName}`, metric.value, {
    unit,
    tags: { page: pathname }
  });

  const activeSpan = Sentry.getActiveSpan();
  if (activeSpan) {
    Sentry.setMeasurement(lowerName, metric.value, unit);
  }

  const windowWithGtag = window as WindowWithGtag;
  if (windowWithGtag.gtag) {
    const gtagValue =
      metric.name === 'CLS' ? Math.round(metric.value * 1000) : Math.round(metric.value);
    windowWithGtag.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: gtagValue,
      metric_id: metric.id,
      metric_delta: metric.delta,
      non_interaction: true
    });
  }
}

let vitalsInitialized = false;

export function initWebVitals(pathname: string): void {
  if (typeof window === 'undefined' || vitalsInitialized) return;
  vitalsInitialized = true;

  const report = (metric: Metric) => reportWebVital(metric, pathname);
  onLCP(report);
  onCLS(report);
  onFCP(report);
  onTTFB(report);
  onINP(report);
  onFID(report);
}

export function __resetVitalsForTests(): void {
  vitalsInitialized = false;
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
pnpm test src/shared/helpers/performance.test.ts
```

Expected: all tests pass (11 tests).

- [ ] **Step 5: Run full suite to confirm no regressions**

```bash
pnpm check-all && pnpm test
```

Expected: all 262 tests pass (251 existing + 11 new), no errors.

---

## Task 3 — Wire `initWebVitals` into `instrumentation-client.ts`

**Files:**

- Modify: `src/app/instrumentation-client.ts`

**Interfaces:**

- Consumes: `initWebVitals(pathname: string): void` from `@/shared/helpers/performance`
- Produces: web-vitals callbacks registered at module load time, before React hydrates.

- [ ] **Step 1: Add the import and call to `instrumentation-client.ts`**

Open `src/app/instrumentation-client.ts`. After the existing imports, add:

```ts
import { initWebVitals } from '@/shared/helpers/performance';
```

Then, after the closing brace of the `if (ENV.SENTRY_ENABLED)` block, add:

```ts
// Always initialize — reports to GTM unconditionally, Sentry only when enabled.
initWebVitals(window.location.pathname);
```

The final file should look like:

```ts
import * as Sentry from '@sentry/nextjs';

import { initWebVitals } from '@/shared/helpers/performance';
import { ENV } from '@/shared/constants';

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

const CLIENT_TRACES_SAMPLE_RATE = isProduction ? 0.1 : 1.0;
const REPLAYS_SESSION_SAMPLE_RATE = isProduction ? 0.05 : 0.1;

if (ENV.SENTRY_ENABLED) {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    debug: false,
    enableLogs: true,
    replaysOnErrorSampleRate: 1.0,
    tracesSampleRate: CLIENT_TRACES_SAMPLE_RATE,
    replaysSessionSampleRate: REPLAYS_SESSION_SAMPLE_RATE,
    integrations: [
      Sentry.replayIntegration(),
      Sentry.browserTracingIntegration(),
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] })
    ]
  });
}

initWebVitals(window.location.pathname);
```

- [ ] **Step 2: Verify**

```bash
pnpm check-all && pnpm test
```

Expected: passes, no new errors.

---

## Task 4 — Remove `PerformanceMonitor` component and all references

**Files:**

- Delete: `src/shared/components/performance-monitor/index.tsx`
- Modify: `src/shared/components/index.ts`
- Modify: `src/layout/components/third-party-scripts/index.tsx`

**Interfaces:**

- Consumes: nothing (deletion task).
- Produces: no dead exports, no dead imports, TypeScript confirms zero references.

- [ ] **Step 1: Delete the component file**

```bash
rm /Users/ramrez/Projects/raminr77.github.io/src/shared/components/performance-monitor/index.tsx
```

- [ ] **Step 2: Remove the re-export from `src/shared/components/index.ts`**

Open `src/shared/components/index.ts`. Remove the line:

```ts
export { PerformanceMonitor } from './performance-monitor';
```

- [ ] **Step 3: Clean up `src/layout/components/third-party-scripts/index.tsx`**

Remove the `dynamic` import block at the top (lines 17–22 in the original):

```ts
const PerformanceMonitor = dynamic(
  () =>
    import('@/shared/components/performance-monitor').then((module) => ({
      default: module.PerformanceMonitor
    })),
  { ssr: false }
);
```

Remove the JSX block inside the return (inside `<>`):

```tsx
{
  ENV.ANALYZE_MODE && (
    <Suspense fallback={null}>
      <PerformanceMonitor />
    </Suspense>
  );
}
```

If `Suspense` is no longer used anywhere else in that file, remove its import from `react`.
If `dynamic` is no longer used, remove its import from `next/dynamic`.

- [ ] **Step 4: TypeScript confirms zero remaining references**

```bash
pnpm check-all && pnpm test
```

Expected: passes. Any missed reference would surface as a TS error here.

---

## Task 5 — Update documentation

**Files:**

- Modify: `docs/hooks-helpers-services.md`

- [ ] **Step 1: Replace the `PerformanceMonitor` section**

In `docs/hooks-helpers-services.md`, find the `### PerformanceMonitor` section and replace it entirely with:

````markdown
### Web Vitals — `initWebVitals` / `reportWebVital`

`src/shared/helpers/performance.ts`

Collects all six Core Web Vitals using the `web-vitals` library and reports them to
Sentry and GTM. Initialized once in `src/app/instrumentation-client.ts` at module load,
before React hydrates.

```ts
// Called once at module load — idempotent, safe to call multiple times.
initWebVitals(pathname: string): void

// Called by each web-vitals callback. Writes to:
//   - Sentry custom metrics  (web_vitals.lcp, web_vitals.cls, …)
//   - Sentry span measurement (lcp, cls, …) — when an active span exists
//   - GTM window.gtag        — when gtag is available
reportWebVital(metric: Metric, pathname: string): void
```
````

Thresholds follow Google's Core Web Vitals definitions:

| Vital | Unit  | Good    | Poor               |
| ----- | ----- | ------- | ------------------ |
| LCP   | ms    | ≤ 2 500 | > 4 000            |
| CLS   | ratio | ≤ 0.1   | > 0.25             |
| FCP   | ms    | ≤ 1 800 | > 3 000            |
| TTFB  | ms    | ≤ 800   | > 1 800            |
| INP   | ms    | ≤ 200   | > 500              |
| FID   | ms    | ≤ 100   | > 300 (deprecated) |

In Sentry, vitals appear in two places:

- **Metrics** tab: `web_vitals.<name>` distributions, tagged by `page`.
- **Performance → Transactions**: measurements on the page-load span.

````

- [ ] **Step 2: Final full verification**

```bash
pnpm check-all && pnpm test
````

Expected: all tests pass, zero lint/type errors.
