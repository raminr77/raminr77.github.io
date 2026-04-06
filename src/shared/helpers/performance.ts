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

// Performance observer for monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor Core Web Vitals
  monitorWebVitals() {
    if (typeof window === 'undefined') return;

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportMetric('LCP', lastEntry.startTime);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch {
      // LCP observer not supported
    }

    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as FirstInputEntry[];
      entries.forEach((entry) => {
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch {
      // FID observer not supported
    }

    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as LayoutShiftEntry[];
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.reportMetric('CLS', clsValue);
        }
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch {
      // CLS observer not supported
    }
  }

  // Report metrics to analytics
  private reportMetric(name: string, value: number) {
    const w = window as WindowWithGtag;
    if (typeof window !== 'undefined' && w.gtag) {
      w.gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        non_interaction: true
      });
    }
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Memory optimization
export const optimizeMemoryUsage = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeunload', () => {
    PerformanceMonitor.getInstance().disconnect();
  });

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
