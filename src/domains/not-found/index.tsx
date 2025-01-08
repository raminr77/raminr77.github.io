import { clsx } from 'clsx';
import Link from 'next/link';
import { titleFont } from '@/app/fonts';

export function NotFound() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center relative'>
      <h1 className={clsx(titleFont.className, 'text-4xl font-extrabold')}>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href='/'
        className='mt-4 border-b px-4 pb-1 leading-10 duration-300 hover:px-8'
      >
        Return Home
      </Link>
    </main>
  );
}
