import Link from 'next/link';
import { ResumeDownloadBtn } from '@/shared/components/resume-download-btn';

export default function () {
  return (
    <div className='text-white h-screen flex flex-col items-center justify-center w-full'>
      <ResumeDownloadBtn />
      <Link
        href='/'
        className='mt-10 left-11 py-2 px-10 text-sm text-white duration-300 border border-solid border-white opacity-10 hover:opacity-100'
      >
        HOME PAGE
      </Link>
    </div>
  );
}
