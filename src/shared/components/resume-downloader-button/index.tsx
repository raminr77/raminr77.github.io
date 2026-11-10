'use client';

import { useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';
import { AnimatePresence } from 'motion/react';

import { RESUME_FILE } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';

import styles from './resume-downloader-button.module.scss';

const ResumeRequestModal = dynamic(() =>
  import('@/shared/components/resume-request-modal').then(
    (module) => module.ResumeRequestModal
  )
);

export function ResumeDownloaderButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    sendGTMEvent(GTM_EVENTS.DOWNLOAD_RESUME);
    setIsModalOpen(true);
  }, []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-label={`Download ${RESUME_FILE.fileName}`}
        className={clsx(
          'relative block rounded px-4 text-xl leading-10 duration-500',
          styles['resume-downloader-button']
        )}
      >
        {RESUME_FILE.actionLabel}
      </button>
      <AnimatePresence>
        {isModalOpen && <ResumeRequestModal onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
