import React from 'react';
import type { Metadata } from 'next';
import { textFont } from '@/app/fonts';
import Script from 'next/script';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Ramin Rezaei | Software Engineer',
  description: 'Ramin Rezaei - Software Engineer'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={textFont.className}>
        <img
          alt='shine'
          draggable={false}
          src='/images/background.png'
          className='shine-animation pointer-events-none absolute -top-6 left-0 blur-md'
        />

        {children}

        <Script src='/service-worker.js' />
      </body>
    </html>
  );
}
