'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

import { GENERAL_SITE_DATA } from '@/data';
import { ENV } from '@/shared/constants';

const DecryptedText = dynamic(
  () =>
    import('@/shared/components/decrypted-text').then((module) => ({
      default: module.DecryptedText
    })),
  { ssr: false }
);

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const { errorPage } = GENERAL_SITE_DATA;

  useEffect(() => {
    if (ENV.SENTRY_ENABLED) {
      Sentry.captureException(error);
    }
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
