import React from 'react';
import type { Metadata } from 'next';
import Script from "next/script";

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
    <body>
      {children}

      <Script src="/service-worker.js" />
    </body>
    </html>
  );
}
