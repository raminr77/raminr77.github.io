import { clsx } from 'clsx';
import Link from 'next/link';
import { RESUME_FILE } from '@/data';

import styles from './resume-downloader-button.module.scss';

export function ResumeDownloaderButton() {
  return (
    <Link
      target='_blank'
      href={RESUME_FILE.url}
      download={RESUME_FILE.fileName}
      className={clsx(
        'relative block rounded px-4 text-xl leading-10 duration-500',
        styles['resume-downloader-button']
      )}
    >
      {RESUME_FILE.actionLabel}
    </Link>
  );
}
