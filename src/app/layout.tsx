import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ToastContainer } from 'react-toastify';
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';

import { ProgressBar } from '@/layout/components/progress-bar';
import { ENV } from '@/shared/constants';
import { textFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

// Lazy load components for better performance
const CustomCursor = React.lazy(() =>
  import('@/shared/components/custom-cursor').then((module) => ({
    default: module.CustomCursor
  }))
);
const Header = React.lazy(() =>
  import('@/layout/components/header').then((module) => ({ default: module.Header }))
);
// const CookiesModal = React.lazy(() =>
//   import('@/layout/components/cookies-modal').then((module) => ({
//     default: module.CookiesModal
//   }))
// );
const PerformanceMonitor = React.lazy(() =>
  import('@/shared/components/performance-monitor').then((module) => ({
    default: module.PerformanceMonitor
  }))
);

import './globals.scss';
import 'animate.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${PERSONAL_DATA.fullName}`,
    default: `${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`
  },
  description: PERSONAL_DATA.pageDescription,
  keywords: [
    ...PERSONAL_DATA.persianKeywords,
    ...PERSONAL_DATA.englishKeywords,
    ...PERSONAL_DATA.swedishKeywords
  ],
  authors: {
    url: PERSONAL_DATA.url,
    name: PERSONAL_DATA.fullName
  },
  applicationName: PERSONAL_DATA.fullName,
  twitter: {
    title: PERSONAL_DATA.fullName,
    description: PERSONAL_DATA.pageDescription,
    card: 'summary_large_image',
    images: ['/images/social-banner.png']
  },
  appleWebApp: {
    title: PERSONAL_DATA.fullName,
    capable: true
  },
  metadataBase: new URL(PERSONAL_DATA.url),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PERSONAL_DATA.url,
    siteName: PERSONAL_DATA.fullName,
    description: PERSONAL_DATA.pageDescription,
    title: `${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`,
    images: [
      {
        width: 1200,
        height: 630,
        url: '/social-banner.png',
        alt: `${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={PERSONAL_DATA.pageDescription} />
        <link rel="preload" as="image" href="/images/background.webp" />
        {!!ENV.GOOGLE_ADSENSE && (
          <meta name="google-adsense-account" content={ENV.GOOGLE_ADSENSE} />
        )}
      </head>
      <body className={textFont.className}>
        <ProgressBar />

        <Image
          alt=""
          width={830}
          height={830}
          quality={75}
          loading="lazy"
          draggable={false}
          fetchPriority="high"
          src="/images/background.webp"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="shine-animation-top fixed top-0 left-0 pointer-events-none"
        />

        <Suspense fallback={<div className="cursor-default" />}>
          <CustomCursor />
        </Suspense>

        <Suspense fallback={<div className="h-16 w-full" />}>
          <Header />
        </Suspense>

        {children}

        {/* <CookiesModal /> */}

        <ToastContainer
          limit={4}
          newestOnTop
          theme="dark"
          position="bottom-center"
          progressClassName="!bg-orange-500"
          toastClassName="!bg-gray-800 !text-white"
        />

        <SpeedInsights />

        {ENV.ANALYZE_MODE && <PerformanceMonitor />}

        {/* Optimized script loading */}
        <Script src="/click-spark.js" strategy="lazyOnload" />
        <Script src="/service-worker.js" strategy="afterInteractive" />

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
      </body>
    </html>
  );
}
