'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import { GTM_EVENTS } from '@/shared/constants';
import { RESUME_FILE } from '@/data';

import styles from './resume-downloader-button.module.scss';

export function ResumeDownloaderButton() {
  return (
    <a
      target="_blank"
      href={RESUME_FILE.url}
      download={RESUME_FILE.fileName}
      onClick={() => sendGTMEvent(GTM_EVENTS.DOWNLOAD_RESUME)}
      className={clsx(
        'relative block rounded px-4 text-xl leading-10 duration-500',
        styles['resume-downloader-button']
      )}
    >
      {RESUME_FILE.actionLabel}
    </a>
  );
}
