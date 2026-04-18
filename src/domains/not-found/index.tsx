import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { GENERAL_SITE_DATA } from '@/data';

const DecryptedText = dynamic(
  () =>
    import('@/shared/components/decrypted-text').then((m) => ({
      default: m.DecryptedText
    })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: 'Not Found Page'
};

export function NotFoundPage() {
  const { title, description, returnHome } = GENERAL_SITE_DATA.notFoundPage;
  return (
    <main className="relative flex h-dvh w-full flex-col items-center justify-center select-none">
      <DecryptedText parentClassName="text-4xl font-extrabold font-title" text={title} />
      <DecryptedText speed={100} text={description} />
      <Link
        href="/"
        className="mt-4 border-b px-4 pb-1 leading-10 duration-300 hover:px-8"
      >
        {returnHome}
      </Link>
    </main>
  );
}
