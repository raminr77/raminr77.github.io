import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Image } from '@/shared/components/Image';
import { MENU } from '@/shared/constants/menu';
import { animator } from '@/shared/utils/animator';
import styles from './burger-menu.module.scss';

export function BurgerMenu() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const toggleMenu = () => setShowBurgerMenu(!showBurgerMenu);

  return (
    <div>
      <button
        onClick={toggleMenu}
        className={classNames(
          'absolute top-5 right-5 xl:hidden z-30 invert cursor-pointer'
        )}
      >
        <Image
          alt='MENU'
          width={30}
          height={30}
          className={animator({ name: 'bounceIn' })}
          src={`./images/${showBurgerMenu ? 'close' : 'menu'}.png`}
        />
      </button>

      {showBurgerMenu && (
        <div
          className={classNames(
            'fixed w-full h-screen top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center flex-col',
            animator({ name: 'fadeInRight', speed: 'fast' }),
            styles.BurgerMenu__contentContainer
          )}
        >
          {MENU.map(({ id, title, url }) => (
            <Link onClick={toggleMenu} key={id} href={url}>
              <div className='text-white duration-300 p-3 mb-2 font-title text-xl border-b-2 border-solid border-transparent hover:border-white'>
                {title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
