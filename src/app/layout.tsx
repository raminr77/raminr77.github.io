import React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import type { Metadata } from 'next';
import { PERSONAL_DATA } from '@/data';
import { textFont } from '@/app/fonts';
import { ToastContainer } from 'react-toastify';
import { Header } from '@/layout/components/header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CustomCursor } from '@/shared/components/custom-cursor';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

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
  applicationName: PERSONAL_DATA.fullName
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={textFont.className}>
        <Image
          width={830}
          height={830}
          alt='top-shine'
          priority={false}
          draggable={false}
          src='/images/background.png'
          className='shine-animation-top pointer-events-none fixed left-0 top-0 blur-md'
        />
        <Image
          width={830}
          height={830}
          priority={false}
          draggable={false}
          alt='bottom-shine'
          src='/images/background.png'
          className='shine-animation-bottom pointer-events-none fixed -bottom-6 right-0 rotate-180 blur-lg'
        />
        <CustomCursor />

        <Header />
        {children}

        <ToastContainer position='bottom-center' theme='colored' />

        <SpeedInsights />
        <Script src='/click-spark.js' />
        <Script src='/service-worker.js' />
        <GoogleAnalytics gaId='G-K7FM8D9D43' />
        <GoogleTagManager gtmId='GTM-W8BNDMMW' />
      </body>
    </html>
  );
}
