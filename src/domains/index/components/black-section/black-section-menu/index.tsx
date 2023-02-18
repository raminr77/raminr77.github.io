import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Image } from '@/shared/components/Image';
import { MENU } from '@/shared/constants/menu';
import { animator } from '@/shared/utils/animator';
import styles from './black-section-menu.module.scss';

export function IndexBlackSectionMenu() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const toggleBurgerMenu = () => setShowBurgerMenu(!showBurgerMenu);

  return (
    <div>
      <button
        onClick={toggleBurgerMenu}
        className={classNames(
          'fixed z-20 invert hidden right-5 top-5 cursor-pointer',
          styles.BlackSectionMenu__menuIcon
        )}
      >
        <Image
          alt='MENU'
          width={50}
          height={50}
          className={animator({ name: 'bounceIn' })}
          src={`./images/${showBurgerMenu ? 'close' : 'menu'}.png`}
        />
      </button>

      <div
        className={classNames(
          'fixed duration-300',
          animator({ name: 'fadeInRight' }),
          styles.BlackSectionMenu__itemsContainer
        )}
      >
        {MENU.map(({ id, title, url }) => (
          <Link key={id} href={url}>
            <div
              className={classNames(
                'relative pb-3 mb-5 font-title text-xl',
                styles.BlackSectionMenu__menuItem
              )}
            >
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
