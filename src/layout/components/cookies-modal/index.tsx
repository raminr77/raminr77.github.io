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
import { Button } from '@/shared/components';
import { GENERAL_SITE_DATA } from '@/data';

import { COOKIES_STATUS_CHANGE } from '../../constants/custom-events';

export function CookiesModal() {
  const { cookiesModal } = GENERAL_SITE_DATA;
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
    window.dispatchEvent(
      new CustomEvent(COOKIES_STATUS_CHANGE, { detail: COOKIES_MODAL_STATUS.ACCEPT })
    );
  };

  const handleReject = () => {
    setCookiesModalStatus(COOKIES_MODAL_STATUS.REJECT);
    updateCookiesModalStatus(COOKIES_MODAL_STATUS.REJECT);
    window.dispatchEvent(
      new CustomEvent(COOKIES_STATUS_CHANGE, { detail: COOKIES_MODAL_STATUS.REJECT })
    );
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
        <p className="text-xl text-bold">{cookiesModal.title}</p>
        <p className="text-md">{cookiesModal.description}</p>
      </div>
      <div className="flex items-center gap-4 justify-end max-md:w-full max-[370px]:flex-col">
        <Button
          type="button"
          onClick={handleReject}
          label={cookiesModal.reject}
          className="max-[370px]:w-full"
        />
        <div className="max-sm:w-full min-w-50">
          <Button
            type="button"
            className="w-full"
            onClick={handleAccept}
            label={cookiesModal.accept}
          />
        </div>
      </div>
    </div>
  );
}
