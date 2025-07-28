'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { clsx } from 'clsx';

import { ToggleThemeButton } from '@/shared/components/toggle-theme-button';
import { animator, pageTitleGenerator } from '@/shared/helpers';
import { MENU_ITEM_ROUTES, ROUTES } from '@/shared/constants';
import { BurgerMenu } from '@/layout/components/burger-menu';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import styles from './header.module.scss';

export function Header() {
  const pathname: string = usePathname();
  const pageTitle = pageTitleGenerator(pathname);

  return (
    <header
      className={clsx(
        'fixed top-0 z-50 flex w-full items-center justify-center pt-5 md:pt-10 lg:pt-16',
        {
          'backdrop-blur-sm': pathname !== ROUTES.HOME
        }
      )}
    >
      <nav className="flex w-11/12 flex-row-reverse items-center justify-between p-3">
        <BurgerMenu />
        <div
          className={clsx('hidden flex-col justify-center max-md:flex', {
            'max-md:hidden': pathname === ROUTES.HOME
          })}
        >
          <h1
            className={clsx(
              'text-2xl font-bold',
              titleFont.className,
              animator({ name: 'fadeInLeft' })
            )}
          >
            {PERSONAL_DATA.fullName}
          </h1>
          <p className={clsx('text-lg', animator({ name: 'fadeIn', delay: '1s' }))}>
            {pageTitle}
          </p>
        </div>
        <ul
          className={clsx(
            'flex w-full items-center justify-center gap-2 text-xl max-md:hidden',
            styles['header__desktop-items-container']
          )}
        >
          {MENU_ITEM_ROUTES.map(({ id, title, url }, index: number) => (
            <li
              key={`${title}-${id}-desktop`}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
              className={animator({ name: 'fadeIn', speed: 'slow' })}
            >
              <Link
                href={url}
                className="border-b border-transparent bg-transparent px-4 py-3 duration-200 hover:border-orange-500"
              >
                {title}
              </Link>
            </li>
          ))}
          <li className={clsx('ml-4', animator({ name: 'fadeIn', delay: '3s' }))}>
            <ToggleThemeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
