import { BurgerMenu } from '@/layout/components/burger-menu';
import { MENU_ITEM_ROUTES } from '@/shared/constants';
import Link from 'next/link';
import { animator } from '@/shared/helpers';

export function Header() {
  return (
    <header className='fixed top-0 z-50 flex w-full items-center justify-center'>
      <nav className='flex w-11/12 flex-row-reverse items-center p-3'>
        <BurgerMenu />
        <ul className='mt-16 flex w-full items-center justify-center gap-2 text-xl max-md:hidden'>
          {MENU_ITEM_ROUTES.map(({ id, title, url }, index) => (
            <li
              key={`${title}-${id}-desktop`}
              className={animator({ name: 'bounceInDown', speed: 'slow' })}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
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
