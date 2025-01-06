import { MENU_ITEM_ROUTES } from '@/shared/constants';
import { PERSONAL_DATA } from '@/data';

export function pageTitleGenerator(pathname: string): string {
  const pageData = MENU_ITEM_ROUTES.find((item) => item.url === pathname);
  return pageData?.title || PERSONAL_DATA.title;
}
