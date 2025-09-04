import type { Metadata } from 'next';
import Link from 'next/link';

import { clsx } from 'clsx';

import { DecryptedText } from '@/shared/components/decrypted-text';
import { titleFont } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Not Found Page'
};

export function NotFoundPage() {
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center select-none">
      <DecryptedText
        parentClassName={clsx(titleFont.className, 'text-4xl font-extrabold')}
        text="Not Found"
      />
      <DecryptedText speed={100} text="Could not find requested resource" />
      <Link
        href="/"
        className="mt-4 border-b px-4 pb-1 leading-10 duration-300 hover:px-8"
      >
        Return Home
      </Link>
    </main>
  );
}
