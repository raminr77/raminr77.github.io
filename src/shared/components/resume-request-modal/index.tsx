'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { clsx } from 'clsx';
import { motion, useReducedMotion } from 'motion/react';

import { GENERAL_SITE_DATA, RESUME_FILE } from '@/data';
import { Icons } from '@/shared/components/icons';
import { ENV } from '@/shared/constants';
import { downloadFile } from '@/shared/helpers';
import type { ResumeDelivery } from '@/shared/services';

import { ResumeRequestForm } from './resume-request-form';
import { ResumeRequestSuccess } from './resume-request-success';

interface ResumeRequestModalProps {
  onClose: () => void;
}

interface ResumeResult {
  email: string;
  delivery: ResumeDelivery;
}

const TRANSITION_DURATION = 0.25;
const PANEL_OFFSET = 24;

export function ResumeRequestModal({ onClose }: ResumeRequestModalProps) {
  const { resumeModal } = GENERAL_SITE_DATA;
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [result, setResult] = useState<ResumeResult | null>(null);

  const handleSuccess = useCallback((email: string, delivery: ResumeDelivery) => {
    setResult({ email, delivery });
    if (delivery.downloadUrl) {
      downloadFile(delivery.downloadUrl, RESUME_FILE.fileName);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const transition = { duration: shouldReduceMotion ? 0 : TRANSITION_DURATION };

  return createPortal(
    <motion.div
      key="resume-backdrop"
      onClick={onClose}
      exit={{ opacity: 0 }}
      transition={transition}
      animate={{ opacity: 1 }}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      data-testid="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 p-5 backdrop-blur-sm dark:bg-black/50"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        transition={transition}
        aria-labelledby={titleId}
        data-testid="resume-modal"
        onClick={(event) => event.stopPropagation()}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: PANEL_OFFSET / 2, scale: 0.97 }}
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: PANEL_OFFSET, scale: 0.96 }
        }
        className={clsx(
          'relative w-full max-w-md overflow-hidden border p-6 shadow-2xl backdrop-blur-xl',
          'border-white/60 bg-white/50 shadow-black/10',
          'dark:border-white/15 dark:bg-white/5 dark:shadow-black/60'
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500 to-transparent"
        />
        <button
          type="button"
          onClick={onClose}
          title={resumeModal.closeTitle}
          aria-label={resumeModal.closeAriaLabel}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border bg-transparent shadow backdrop-blur-sm duration-500 hover:border-amber-500 hover:bg-slate-300/5"
        >
          <Icons name="close" />
        </button>

        <GoogleReCaptchaProvider
          reCaptchaKey={ENV.GOOGLE_RECAPTCHA_SITE_KEY}
          scriptProps={{ async: true, defer: true }}
        >
          {result ? (
            <ResumeRequestSuccess
              titleId={titleId}
              email={result.email}
              onClose={onClose}
              downloadUrl={result.delivery.downloadUrl}
            />
          ) : (
            <ResumeRequestForm titleId={titleId} onSuccess={handleSuccess} />
          )}
        </GoogleReCaptchaProvider>
      </motion.div>
    </motion.div>,
    document.body
  );
}
