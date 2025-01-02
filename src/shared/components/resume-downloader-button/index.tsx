import { clsx } from 'clsx';
import Link from 'next/link';
import { RESUME_FILE } from '@/data/resume-file';

import styles from './resume-downloader-button.module.scss';

export function ResumeDownloaderButton() {
  return (
    <Link
      target="_blank"
      href={RESUME_FILE.url}
      download={RESUME_FILE.fileName}
      className={clsx('duration-500 relative leading-10 block text-xl px-4 rounded', styles['resume-downloader-button'])}
    >
      Download Resume
    </Link>
  )
}
