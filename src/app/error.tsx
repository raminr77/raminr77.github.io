'use client';

import { useEffect } from 'react';
import { textFont, titleFont } from '@/app/fonts';
import { clsx } from 'clsx';

export default function Error({
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
    <div className='flex h-dvh w-full select-none flex-col items-center justify-center gap-10'>
      <h2 className={clsx('text-2xl', textFont.className)}>Something went wrong!</h2>
      <button
        className={clsx(
          'cursor-pointer border-b px-5 leading-10 duration-300 hover:px-8',
          titleFont.className
        )}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
