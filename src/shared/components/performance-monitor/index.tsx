'use client';

import { initPerformanceMonitoring } from '@/shared/helpers';
import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring on client side
    initPerformanceMonitoring();

    // Cleanup on unmount
    return () => {
      // Performance monitor cleanup is handled in the utility
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
