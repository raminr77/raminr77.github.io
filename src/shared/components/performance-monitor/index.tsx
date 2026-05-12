'use client';

import { useEffect } from 'react';

import {
  PerformanceMonitor as PerformanceMonitorClass,
  initPerformanceMonitoring
} from '@/shared/helpers';

export function PerformanceMonitor() {
  useEffect(() => {
    initPerformanceMonitoring();

    return () => {
      PerformanceMonitorClass.getInstance().disconnect();
    };
  }, []);

  return null;
}
