import { COOKIES_MODAL_STATUS, LOCAL_STORAGE_KEYS } from '../constants';

export type CookiesModalStatus = keyof typeof COOKIES_MODAL_STATUS;

export function getCookiesModalStatus(): CookiesModalStatus {
  return (
    (localStorage.getItem(LOCAL_STORAGE_KEYS.COOKIES_MODAL) as
      | CookiesModalStatus
      | undefined) ?? COOKIES_MODAL_STATUS.NONE
  );
}

export function updateCookiesModalStatus(status: CookiesModalStatus): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.COOKIES_MODAL, status);
}
