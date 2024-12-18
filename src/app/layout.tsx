import type { Metadata } from 'next';

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
      </body>
    </html>
  );
}
