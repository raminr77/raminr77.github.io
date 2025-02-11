'use client';

import { useEffect } from 'react';

import { clsx } from 'clsx';

import { titleFont } from '@/app/fonts';

export function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-dvh w-full select-none flex-col items-center justify-center gap-10">
      <h2 className={clsx('text-4xl font-extrabold', titleFont.className)}>
        Something went wrong!
      </h2>
      <p className="text-xl">
        We are experiencing an issue in our development process.
        <br />
        We are working hard to resolve it as soon as possible.
        <br />
        Thank you for your understanding.
      </p>

      <button
        className={clsx(
          'cursor-pointer border-b px-4 leading-10 duration-300 hover:px-8',
          titleFont.className
        )}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
