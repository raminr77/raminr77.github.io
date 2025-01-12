import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { RESUME_FILE_DATA } from '@/data/resume-file';
import { Image } from '@/shared/components/Image';
import { CRO_DATA } from '@/shared/constants/cro';
import { GA_EVENT_NAMES } from '@/shared/constants/ga';
import { MENU } from '@/shared/constants/menu';
import { gaEvent } from '@/shared/services/ga';
import { animator } from '@/shared/utils/animator';
import styles from './burger-menu.module.scss';

export function BurgerMenu() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const toggleMenu = () => setShowBurgerMenu(!showBurgerMenu);

  const click = (title: string) => () => {
    gaEvent({
      action: GA_EVENT_NAMES.BURGER_MENU_ITEM,
      params: { name: title }
    });
    toggleMenu();
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        data-cro-id={CRO_DATA.CLICK_TOGGLE_BURGER_MENU}
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
            <Link
              onClick={click(title)}
              key={id}
              href={url}
              data-cro-id={CRO_DATA.CLICK_BURGER_MENU}
            >
              <div className='text-white duration-300 p-3 mb-2 font-title text-xl border-b-2 border-solid border-transparent hover:border-white'>
                {title}
              </div>
            </Link>
          ))}

          <Link
            download={RESUME_FILE_DATA.NAME}
            href={RESUME_FILE_DATA.URL}
            className='inline-block'
            target='_blank'
            data-cro-id={CRO_DATA.CLICK_BURGER_MENU_DOWNLOAD_CV}
            onClick={() =>
              gaEvent({
                action: GA_EVENT_NAMES.RESUME_DOWNLOAD,
                params: { device: 'mobile', file: 'resume' }
              })
            }
          >
            <div className='text-white duration-300 p-3 mb-2 font-title text-xl border-b-2 border-solid border-transparent hover:border-white'>
              {RESUME_FILE_DATA.ACTION_TEXT}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
