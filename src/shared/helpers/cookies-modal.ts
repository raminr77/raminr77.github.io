import { COOKIES_MODAL_STATUS, LOCAL_STORAGE_KEYS } from '../constants';

export type CookiesModalStatus = keyof typeof COOKIES_MODAL_STATUS;

export function getCookiesModalStatus(): CookiesModalStatus {
  if (typeof window === 'undefined') return COOKIES_MODAL_STATUS.NONE;
  return (
    (localStorage.getItem(LOCAL_STORAGE_KEYS.COOKIES_MODAL) as
      | CookiesModalStatus
      | undefined) ?? COOKIES_MODAL_STATUS.NONE
  );
}

export function updateCookiesModalStatus(status: CookiesModalStatus): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COOKIES_MODAL, status);
  }
}
