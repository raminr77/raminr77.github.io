import { ToastContainer } from 'react-toastify';
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';

import {
  ServiceWorkerRegistrar,
  ThirdPartyScripts,
  ProgressBar
} from '@/layout/components';
import { CONTACT_ME_DATA, PERSONAL_DATA } from '@/data';
import { textFont, titleFont } from '@/app/fonts';
import { ENV } from '@/shared/constants';

// Lazy load components for better performance
const CustomCursor = React.lazy(() =>
  import('@/shared/components/custom-cursor').then((module) => ({
    default: module.CustomCursor
  }))
);
const Header = React.lazy(() =>
  import('@/layout/components/header').then((module) => ({ default: module.Header }))
);
const CookiesModal = React.lazy(() =>
  import('@/layout/components/cookies-modal').then((module) => ({
    default: module.CookiesModal
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
    canonical: PERSONAL_DATA.url
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-video-preview': -1,
      'max-image-preview': 'large'
    }
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
        url: '/images/social-banner.png',
        alt: `${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${textFont.variable} ${titleFont.variable} dark`}>
      <head>
        <link rel="preload" as="image" href="/images/background.webp" type="image/webp" />
        <meta
          name="thumbnail"
          content={`${PERSONAL_DATA.url}/images/icons/icon-512x512.png`}
        />
        {!!ENV.GOOGLE_ADSENSE && (
          <meta name="google-adsense-account" content={ENV.GOOGLE_ADSENSE} />
        )}
        {!!ENV.GOOGLE_TAG_MANAGER_CODE && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','functionality_storage':'denied','personalization_storage':'denied','security_storage':'granted'});`
            }}
          />
        )}
      </head>
      <body className="font-text">
        {!!ENV.GOOGLE_TAG_MANAGER_CODE && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${ENV.GOOGLE_TAG_MANAGER_CODE}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {!!ENV.GOOGLE_TAG_MANAGER_CODE && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ENV.GOOGLE_TAG_MANAGER_CODE}');`
            }}
          />
        )}

        <ProgressBar />

        <Image
          alt=""
          width={830}
          height={830}
          quality={75}
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

        <Suspense fallback={null}>
          <CookiesModal />
        </Suspense>

        <ToastContainer
          limit={4}
          newestOnTop
          theme="dark"
          position="bottom-center"
          progressClassName="!bg-orange-500"
          toastClassName="!bg-gray-800 !text-white"
        />

        {/* Optimized script loading */}
        <Script src="/click-spark.js" strategy="lazyOnload" />
        <ServiceWorkerRegistrar />

        <ThirdPartyScripts />

        {/* JSON Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              image: {
                width: 512,
                height: 512,
                '@type': 'ImageObject',
                url: `${PERSONAL_DATA.url}/images/icons/icon-512x512.png`
              },
              name: PERSONAL_DATA.fullName,
              url: PERSONAL_DATA.url,
              sameAs: CONTACT_ME_DATA.links
                .map((link) => link.url)
                .filter((url) => url.startsWith('http'))
            })
          }}
        />
      </body>
    </html>
  );
}
