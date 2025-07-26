import { ToastContainer } from 'react-toastify';
import React from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';

import { CustomCursor } from '@/shared/components/custom-cursor';
import { AiButton } from '@/layout/components/ai-bot';
import { Header } from '@/layout/components/header';
import { textFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import 'animate.css';

import './globals.scss';

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
    canonical: '/',
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
      },
    ],
  },
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={textFont.className}>
        <Image
          width={830}
          height={830}
          loading="lazy"
          alt="top-shine"
          priority={false}
          draggable={false}
          src="/images/background.png"
          className="shine-animation-top pointer-events-none fixed left-0 top-0 blur-md"
        />
        <Image
          width={830}
          height={830}
          loading="lazy"
          priority={false}
          draggable={false}
          alt="bottom-shine"
          src="/images/background.png"
          className="shine-animation-bottom pointer-events-none fixed -bottom-6 right-0 rotate-180 blur-lg"
        />
        <CustomCursor />

        <Header />
        {children}

        <AiButton />

        <ToastContainer position="bottom-center" theme="colored" />

        <SpeedInsights />

        <Script src="/click-spark.js" defer />
        <Script src="/service-worker.js" defer />

        <GoogleAnalytics gaId="G-K7FM8D9D43" />
        <GoogleTagManager gtmId="GTM-W8BNDMMW" />
      </body>
    </html>
  );
}
