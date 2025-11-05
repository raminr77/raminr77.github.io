'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  animator,
  CookiesModalStatus,
  getCookiesModalStatus,
  updateCookiesModalStatus
} from '@/shared/helpers';
import { COOKIES_MODAL_STATUS } from '@/shared/constants';
import { Button } from '@/shared/components/button';

export function CookiesModal() {
  const [cookiesModalStatus, setCookiesModalStatus] = useState<CookiesModalStatus>(
    COOKIES_MODAL_STATUS.NONE
  );

  useEffect(() => {
    try {
      const initial = getCookiesModalStatus();
      setCookiesModalStatus(initial);
    } catch {
      setCookiesModalStatus(COOKIES_MODAL_STATUS.NONE);
    }
  }, []);

  const handleAccept = () => {
    setCookiesModalStatus(COOKIES_MODAL_STATUS.ACCEPT);
    updateCookiesModalStatus(COOKIES_MODAL_STATUS.ACCEPT);
  };

  const handleReject = () => {
    setCookiesModalStatus(COOKIES_MODAL_STATUS.REJECT);
    updateCookiesModalStatus(COOKIES_MODAL_STATUS.REJECT);
  };

  if (cookiesModalStatus !== COOKIES_MODAL_STATUS.NONE) return null;

  return (
    <div
      className={clsx(
        'fixed flex flex-col gap-2 bottom-5 left-5 max-md:left-1/2 max-md:-translate-x-1/2 transform border p-4 w-11/12 max-w-sm select-none shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 border-slate-300/40 bg-transparent z-50',
        animator({ name: 'fadeInUp' })
      )}
    >
      <p>We use cookies</p>
      <p>
        We use our own and third-party cookies to personalize content and to analyze web
        traffic.
      </p>

      <div className="w-full flex items-center gap-4 mt-2">
        <Button label="Accept" type="button" className="w-full" onClick={handleAccept} />
        <Button label="Reject" type="button" onClick={handleReject} />
      </div>
    </div>
  );
}
