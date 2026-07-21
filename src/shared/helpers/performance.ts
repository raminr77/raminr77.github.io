import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
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

function getVitalUnit(name: Metric['name']): VitalUnit {
  return name === 'CLS' ? 'ratio' : 'millisecond';
}

export function reportWebVital(metric: Metric, pathname: string): void {
  if (typeof window === 'undefined') return;
  const unit = getVitalUnit(metric.name);
  const lowerName = metric.name.toLowerCase();

  Sentry.metrics.distribution(`web_vitals.${lowerName}`, metric.value, {
    unit,
    attributes: { page: pathname }
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
// JSDOM does not allow deleting the window global, so tests override this flag
// to simulate a non-browser environment without manipulating globalThis.window.
let _browserOverride: boolean | null = null;

function isBrowser(): boolean {
  if (_browserOverride !== null) return _browserOverride;
  return typeof window !== 'undefined';
}

export function initWebVitals(pathname: string): void {
  if (!isBrowser() || vitalsInitialized) return;
  vitalsInitialized = true;

  const report = (metric: Metric) => reportWebVital(metric, pathname);
  onLCP(report);
  onCLS(report);
  onFCP(report);
  onTTFB(report);
  onINP(report);
}

export function __resetVitalsForTests(): void {
  vitalsInitialized = false;
  _browserOverride = null;
}

export function __setBrowserForTests(value: boolean): void {
  _browserOverride = value;
}
