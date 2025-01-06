'use client';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { titleFont } from '@/app/fonts';

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
      <h2 className={clsx('text-4xl font-extrabold', titleFont.className)}>
        Something went wrong!
      </h2>
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
