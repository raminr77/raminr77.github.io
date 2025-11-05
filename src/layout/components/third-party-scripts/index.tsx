'use client';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';

import { getCookiesModalStatus, type CookiesModalStatus } from '@/shared/helpers';
import { COOKIES_MODAL_STATUS, ENV } from '@/shared/constants';

const PerformanceMonitor = () =>
  import('@/shared/components/performance-monitor').then((module) => ({
    default: module.PerformanceMonitor
  }));

export function ThirdPartyScripts() {
  const [status, setStatus] = useState<CookiesModalStatus>(COOKIES_MODAL_STATUS.NONE);

  useEffect(() => {
    setStatus(getCookiesModalStatus());
  }, []);

  if (status !== COOKIES_MODAL_STATUS.ACCEPT) return null;

  return (
    <>
      <SpeedInsights />

      {ENV.ANALYZE_MODE && (
        <Suspense fallback={null}>
          {/* @ts-expect-error async component for lazy import */}
          <PerformanceMonitor />
        </Suspense>
      )}

      {!!ENV.GOOGLE_ADSENSE && (
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ENV.GOOGLE_ADSENSE}`}
        />
      )}

      {!!ENV.GOOGLE_ANALYTICS_CODE && (
        <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_CODE} />
      )}

      {!!ENV.GOOGLE_TAG_MANAGER_CODE && (
        <GoogleTagManager gtmId={ENV.GOOGLE_TAG_MANAGER_CODE} />
      )}
    </>
  );
}
