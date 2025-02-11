import type { Metadata } from 'next';
import Link from 'next/link';

import { clsx } from 'clsx';

import { titleFont } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Not Found Error'
};

export function NotFoundPage() {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center">
      <h1 className={clsx(titleFont.className, 'text-4xl font-extrabold')}>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="mt-4 border-b px-4 pb-1 leading-10 duration-300 hover:px-8"
      >
        Return Home
      </Link>
    </main>
  );
}
