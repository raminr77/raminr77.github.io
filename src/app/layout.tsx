import { ToastContainer } from 'react-toastify';
import React, { Suspense } from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';

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
const PerformanceMonitor = React.lazy(() =>
  import('@/shared/components/performance-monitor').then((module) => ({
    default: module.PerformanceMonitor
  }))
);

import 'animate.css';

import './globals.scss';
import clsx from 'clsx';

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
    // languages: {
    //   'en-US': '/en',
    // },
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
      <body className={clsx('site-top-shadow', textFont.className)}>
        <div
          style={{
            width: 830,
            height: 830,
            maxWidth: '100%',
            background: 'url(/images/background.png) no-repeat',
            backgroundSize: 'contain'
          }}
          className="shine-animation-top pointer-events-none fixed left-0 top-0 blur-md"
        />
        <div
          style={{
            width: 830,
            height: 830,
            maxWidth: '100%',
            background: 'url(/images/background.png) no-repeat',
            backgroundSize: 'contain'
          }}
          className="shine-animation-bottom pointer-events-none fixed -bottom-6 right-0 rotate-180 blur-lg"
        />

        <Suspense fallback={<div className="cursor-default" />}>
          <CustomCursor />
        </Suspense>

        <Suspense fallback={<div className="h-16 w-full" />}>
          <Header />
        </Suspense>

        {children}

        {/* <AiButton /> */}

        <ToastContainer
          limit={4}
          newestOnTop
          theme="dark"
          position="bottom-center"
          progressClassName="!bg-orange-500"
          toastClassName="!bg-gray-800 !text-white"
        />

        <SpeedInsights />

        <PerformanceMonitor />

        {/* Optimized script loading */}
        <Script src="/click-spark.js" strategy="lazyOnload" />
        <Script src="/service-worker.js" strategy="afterInteractive" />

        {process.env.GOOGLE_ANALYTICS_CODE && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_CODE} />
        )}
        {process.env.GOOGLE_TAG_MANAGER_CODE && (
          <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_CODE} />
        )}
      </body>
    </html>
  );
}
