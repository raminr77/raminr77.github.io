'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const DecryptedText = dynamic(() => import('@/shared/components/decrypted-text'), {
  ssr: false
});

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
      <DecryptedText
        parentClassName="text-4xl font-extrabold font-title"
        text="Something went wrong!"
        speed={100}
      />
      <div className="text-xl">
        <DecryptedText
          speed={80}
          text="We are experiencing an issue in our development process."
        />
        <br />
        <DecryptedText
          speed={100}
          text="We are working hard to resolve it as soon as possible."
        />
        <br />
        <DecryptedText speed={120} text="Thank you for your understanding." />
      </div>

      <button
        className="cursor-pointer border-b px-4 leading-10 duration-300 hover:px-8 font-title"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
