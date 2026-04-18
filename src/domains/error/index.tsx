'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { GENERAL_SITE_DATA } from '@/data';

const DecryptedText = dynamic(
  () =>
    import('@/shared/components/decrypted-text').then((m) => ({
      default: m.DecryptedText
    })),
  { ssr: false }
);

export function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { errorPage } = GENERAL_SITE_DATA;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-dvh w-full select-none flex-col items-center justify-center gap-10">
      <DecryptedText
        parentClassName="text-4xl font-extrabold font-title"
        text={errorPage.title}
        speed={100}
      />
      <div className="text-xl">
        <DecryptedText speed={80} text={errorPage.lines[0]} />
        <br />
        <DecryptedText speed={100} text={errorPage.lines[1]} />
        <br />
        <DecryptedText speed={120} text={errorPage.lines[2]} />
      </div>

      <button
        className="cursor-pointer border-b px-4 leading-10 duration-300 hover:px-8 font-title"
        onClick={() => reset()}
      >
        {errorPage.tryAgain}
      </button>
    </div>
  );
}
