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
        'w-full flex items-center justify-between gap-4 flex-wrap fixed bottom-0 left-0 z-50 p-4 lg:py-2 select-none backdrop-blur-sm duration-500 hover:bg-slate-300/10 border-t border-slate-300/40 bg-transparent',
        animator({ name: 'fadeInUp' })
      )}
    >
      <div className="flex flex-col">
        <p className="text-xl text-bold">We use cookies</p>
        <p className="text-md">
          We use our own and third-party cookies to personalize content and to analyze web
          traffic.
        </p>
      </div>
      <div className="flex items-center gap-4 justify-end max-md:w-full max-[370px]:flex-col">
        <Button
          label="Reject"
          type="button"
          onClick={handleReject}
          className="max-[370px]:w-full"
        />
        <div className="max-sm:w-full min-w-50">
          <Button
            label="Accept"
            type="button"
            className="w-full"
            onClick={handleAccept}
          />
        </div>
      </div>
    </div>
  );
}
