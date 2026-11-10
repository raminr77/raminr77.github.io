'use client';

import { GENERAL_SITE_DATA, RESUME_FILE } from '@/data';
import { Button } from '@/shared/components/button';

interface ResumeRequestSuccessProps {
  email: string;
  titleId: string;
  onClose: () => void;
  downloadUrl: string | null;
}

export function ResumeRequestSuccess({
  email,
  titleId,
  onClose,
  downloadUrl
}: ResumeRequestSuccessProps) {
  const { success } = GENERAL_SITE_DATA.resumeModal;

  return (
    <div role="status" data-testid="resume-success">
      <h2 id={titleId} className="pr-12 text-2xl">
        {success.title}
      </h2>
      <p className="mt-2 text-base">
        {success.sentTo} <strong className="break-all text-amber-500">{email}</strong>
      </p>

      {downloadUrl && (
        <p className="mt-4 text-sm opacity-80">
          {success.downloadHint}{' '}
          <a
            href={downloadUrl}
            rel="noopener noreferrer"
            download={RESUME_FILE.fileName}
            data-testid="resume-download-link"
            className="break-all text-amber-500 underline underline-offset-4"
          >
            {success.downloadLabel}
          </a>
        </p>
      )}

      <div className="mt-5 flex w-full justify-end">
        <Button type="button" onClick={onClose} label={success.closeButton} />
      </div>
    </div>
  );
}
