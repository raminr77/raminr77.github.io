import Link from 'next/link';
import classNames from 'classnames';
import { CRO_DATA } from '@/shared/constants/cro';
import { MENU } from '@/shared/constants/menu';
import { animator } from '@/shared/utils/animator';
import styles from './black-section-menu.module.scss';

export function IndexBlackSectionMenu() {
  return (
    <div
      className={classNames(
        'fixed duration-300 bg-black',
        animator({ name: 'fadeInRight' }),
        styles.BlackSectionMenu__container
      )}
    >
      {MENU.map(({ id, title, url }) => (
        <Link key={id} href={url}>
          <div
            data-cro-id={CRO_DATA.HOME_PAGE_MENU}
            className={classNames(
              'relative pb-3 mb-5 font-title text-xl',
              styles.BlackSectionMenu__item
            )}
          >
            {title}
          </div>
        </Link>
      ))}
    </div>
  );
}
