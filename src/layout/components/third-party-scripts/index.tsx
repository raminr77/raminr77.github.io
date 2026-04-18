'use client';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import React, { useEffect, useState, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

import { getCookiesModalStatus, type CookiesModalStatus } from '@/shared/helpers';
import { COOKIES_MODAL_STATUS, ENV } from '@/shared/constants';

import { COOKIES_STATUS_CHANGE } from '../../constants/custom-events';
import { GAPageView } from './ga-page-view';

const PerformanceMonitor = React.lazy(() =>
  import('@/shared/components/performance-monitor').then((module) => ({
    default: module.PerformanceMonitor
  }))
);

export function ThirdPartyScripts() {
  const [status, setStatus] = useState<CookiesModalStatus>(COOKIES_MODAL_STATUS.NONE);

  useEffect(() => {
    const onCookiesChange = (e: Event) => {
      setStatus((e as CustomEvent<CookiesModalStatus>).detail);
    };
    window.addEventListener(COOKIES_STATUS_CHANGE, onCookiesChange);
    return () => window.removeEventListener(COOKIES_STATUS_CHANGE, onCookiesChange);
  }, []);

  useEffect(() => {
    // Developer signiture
    console.log(
      '%cHi, curious developer 👋',
      'color:#fff; background:#111827; padding:10px 16px; font-size:20px; font-weight:bold; margin:16px; border-radius:4px;'
    );
    console.log(
      "%cWelcome to Ramin's personal website.\nIf you're interested in web development, feel free to explore the source code and reach out!\nGithub: https://github.com/raminr77/raminr77.github.io",
      `color:#60a5fa; font-size:16px; padding:16px; line-height:1.5;`
    );

    setStatus(getCookiesModalStatus());
  }, []);

  const isAccepted = status === COOKIES_MODAL_STATUS.ACCEPT;

  return (
    <>
      <SpeedInsights />

      {ENV.ANALYZE_MODE && (
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
      )}

      {isAccepted && !!ENV.GOOGLE_ADSENSE && (
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ENV.GOOGLE_ADSENSE}`}
        />
      )}

      {isAccepted && !!ENV.GOOGLE_ANALYTICS_CODE && (
        <>
          <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_CODE} />
          <GAPageView />
        </>
      )}

      {isAccepted && !!ENV.GOOGLE_TAG_MANAGER_CODE && (
        <GoogleTagManager gtmId={ENV.GOOGLE_TAG_MANAGER_CODE} />
      )}
    </>
  );
}
