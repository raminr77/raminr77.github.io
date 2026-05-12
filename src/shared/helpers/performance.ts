/**
 * Performance optimization utilities
 */

import { ENV } from '@/shared/constants';

// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 } // Time to First Byte
};

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface WindowWithGtag extends Window {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
}

interface PerformanceWithMemory extends Performance {
  memory?: MemoryInfo;
}

// Performance observer for monitoring. Singleton with idempotent setup —
// re-mounts of the consumer component do not create duplicate observers.
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: PerformanceObserver[] = [];
  private vitalsStarted = false;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  monitorWebVitals() {
    if (typeof window === 'undefined' || this.vitalsStarted) return;
    this.vitalsStarted = true;

    this.observe('largest-contentful-paint', (list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) this.reportMetric('LCP', lastEntry.startTime);
    });

    this.observe('first-input', (list) => {
      (list.getEntries() as FirstInputEntry[]).forEach((entry) => {
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    });

    let clsValue = 0;
    this.observe('layout-shift', (list) => {
      (list.getEntries() as LayoutShiftEntry[]).forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.reportMetric('CLS', clsValue);
        }
      });
    });
  }

  private observe(type: string, callback: (list: PerformanceObserverEntryList) => void) {
    try {
      const observer = new PerformanceObserver(callback);
      observer.observe({ entryTypes: [type] });
      this.observers.push(observer);
    } catch {
      // Observer type not supported in this browser — silently skip.
    }
  }

  private reportMetric(name: string, value: number) {
    if (typeof window === 'undefined') return;
    const w = window as WindowWithGtag;
    if (!w.gtag) return;
    w.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(value),
      non_interaction: true
    });
  }

  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.vitalsStarted = false;
  }
}

// Idempotent — guard against duplicate listeners across re-inits.
let memoryOptimized = false;

export const optimizeMemoryUsage = () => {
  if (typeof window === 'undefined' || memoryOptimized) return;
  memoryOptimized = true;

  window.addEventListener(
    'beforeunload',
    () => {
      PerformanceMonitor.getInstance().disconnect();
    },
    { once: true }
  );

  if (ENV.NODE_ENV === 'development') {
    const intervalId = setInterval(() => {
      const perf = performance as PerformanceWithMemory;
      if (perf.memory) {
        console.log('Memory usage:', {
          used: Math.round(perf.memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(perf.memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(perf.memory.jsHeapSizeLimit / 1048576) + ' MB'
        });
      }
    }, 30000);

    window.addEventListener('beforeunload', () => clearInterval(intervalId), {
      once: true
    });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  const monitor = PerformanceMonitor.getInstance();
  monitor.monitorWebVitals();
  optimizeMemoryUsage();
};
