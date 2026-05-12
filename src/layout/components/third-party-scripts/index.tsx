'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import { getCookiesModalStatus, type CookiesModalStatus } from '@/shared/helpers';
import { COOKIES_MODAL_STATUS, ENV } from '@/shared/constants';

import { COOKIES_STATUS_CHANGE } from '../../constants/custom-events';

import { GAPageView } from './ga-page-view';

const PerformanceMonitor = dynamic(
  () =>
    import('@/shared/components/performance-monitor').then((module) => ({
      default: module.PerformanceMonitor
    })),
  { ssr: false }
);

interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

function updateGTMConsent(status: CookiesModalStatus): void {
  if (typeof window === 'undefined') return;
  const windowWithGtag = window as WindowWithGtag;
  if (!windowWithGtag.gtag) return;
  const consentState = status === COOKIES_MODAL_STATUS.ACCEPT ? 'granted' : 'denied';
  windowWithGtag.gtag('consent', 'update', {
    ad_storage: consentState,
    analytics_storage: consentState,
    functionality_storage: consentState,
    personalization_storage: consentState
  });
}

export function ThirdPartyScripts() {
  const [status, setStatus] = useState<CookiesModalStatus>(COOKIES_MODAL_STATUS.NONE);
  const [isIrDomain, setIsIrDomain] = useState(false);

  useEffect(() => {
    const handleCookiesChange = (cookiesEvent: Event): void => {
      const newStatus = (cookiesEvent as CustomEvent<CookiesModalStatus>).detail;
      setStatus(newStatus);
      updateGTMConsent(newStatus);
    };
    window.addEventListener(COOKIES_STATUS_CHANGE, handleCookiesChange);
    return () => window.removeEventListener(COOKIES_STATUS_CHANGE, handleCookiesChange);
  }, []);

  useEffect(() => {
    setIsIrDomain(/\.ir$/.test(window.location.hostname));

    if (ENV.NODE_ENV === 'production') {
      // Developer signature for curious visitors viewing the console.
      console.log(
        '%cHi, curious developer 👋',
        'color:#fff; background:#111827; padding:10px 16px; font-size:20px; font-weight:bold; margin:16px; border-radius:4px;'
      );
      console.log(
        "%cWelcome to Ramin's personal website.\nIf you're interested in web development, feel free to explore the source code and reach out!\nGithub: https://github.com/raminr77/raminr77.github.io",
        `color:#60a5fa; font-size:16px; padding:16px; line-height:1.5;`
      );
    }

    const savedStatus = getCookiesModalStatus();
    setStatus(savedStatus);
    if (savedStatus !== COOKIES_MODAL_STATUS.NONE) {
      updateGTMConsent(savedStatus);
    }
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

      {isAccepted && (
        <>
          {!!ENV.GOOGLE_ANALYTICS_CODE_SE_DOMAIN && !isIrDomain && (
            <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_CODE_SE_DOMAIN} />
          )}
          {!!ENV.GOOGLE_ANALYTICS_CODE_IR_DOMAIN && isIrDomain && (
            <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_CODE_IR_DOMAIN} />
          )}
          {(!!ENV.GOOGLE_ANALYTICS_CODE_SE_DOMAIN ||
            !!ENV.GOOGLE_ANALYTICS_CODE_IR_DOMAIN) && (
            <Suspense fallback={null}>
              <GAPageView />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}
