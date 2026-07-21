import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/nextjs';
import type { Metric } from 'web-vitals';

import {
  WEB_VITALS_THRESHOLDS,
  __resetVitalsForTests,
  __setBrowserForTests,
  initWebVitals,
  reportWebVital
} from './performance';

// onFID was removed in web-vitals v4 — not present in v5

jest.mock('@sentry/nextjs', () => ({
  metrics: { distribution: jest.fn() },
  getActiveSpan: jest.fn(),
  setMeasurement: jest.fn()
}));

jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onFCP: jest.fn(),
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
      attributes: { page: '/about' }
    });
  });

  it('sends a Sentry distribution for CLS with ratio unit', () => {
    reportWebVital(makeMetric('CLS', 0.05), '/');
    expect(Sentry.metrics.distribution).toHaveBeenCalledWith('web_vitals.cls', 0.05, {
      unit: 'ratio',
      attributes: { page: '/' }
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
  it('registers all five web-vitals callbacks', () => {
    initWebVitals('/');
    expect(onLCP).toHaveBeenCalledTimes(1);
    expect(onCLS).toHaveBeenCalledTimes(1);
    expect(onFCP).toHaveBeenCalledTimes(1);
    expect(onTTFB).toHaveBeenCalledTimes(1);
    expect(onINP).toHaveBeenCalledTimes(1);
  });

  it('is idempotent — calling twice registers listeners only once', () => {
    initWebVitals('/');
    initWebVitals('/about');
    expect(onLCP).toHaveBeenCalledTimes(1);
  });

  it('does nothing in a non-browser environment', () => {
    // JSDOM does not allow deleting globalThis.window (non-configurable property),
    // so we use __setBrowserForTests to simulate SSR — same guard, no JSDOM hacks.
    __setBrowserForTests(false);
    initWebVitals('/');
    expect(onLCP).not.toHaveBeenCalled();
  });
});
