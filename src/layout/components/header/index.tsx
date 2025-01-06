'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import { PERSONAL_DATA } from '@/data';
import { titleFont } from '@/app/fonts';
import { animator, pageTitleGenerator } from '@/shared/helpers';
import { usePathname } from 'next/navigation';
import { BurgerMenu } from '@/layout/components/burger-menu';
import { MENU_ITEM_ROUTES, ROUTES } from '@/shared/constants';

export function Header() {
  const pathname: string = usePathname();
  const pageTitle = pageTitleGenerator(pathname);

  return (
    <header className='fixed top-5 z-50 flex w-full items-center justify-center md:mt-10 lg:mt-16'>
      <nav className='flex w-11/12 flex-row-reverse items-center justify-between p-3'>
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
          <h3 className={clsx('text-lg', animator({ name: 'fadeIn', delay: '1s' }))}>
            {pageTitle}
          </h3>
        </div>
        <ul className='flex w-full items-center justify-center gap-2 text-xl max-md:hidden'>
          {MENU_ITEM_ROUTES.map(({ id, title, url }, index: number) => (
            <li
              key={`${title}-${id}-desktop`}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
              className={animator({ name: 'bounceInDown', speed: 'slow' })}
            >
              <Link
                href={url}
                className='border-b border-transparent bg-transparent px-4 py-3 duration-200 hover:border-orange-500'
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
