'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { usePathname } from 'next/navigation';
import styles from './burger-menu.module.scss';

const MENU_ITEMS = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'Posts', url: '/posts' },
  { id: 3, title: 'Journey', url: '/journey' },
  { id: 4, title: 'Projects', url: '/projects' },
  { id: 5, title: 'About Me', url: '/about-me' },
  { id: 6, title: 'Contact Me', url: '/contact-me' }
] as const;

const MENU_OUT_ANIMATION_CLASSES = animator({ name: 'fadeOutUp', speed: 'fast' }).split(
  ' '
);
const LINK_ITEM_OUT_ANIMATION_CLASSES = animator({
  name: 'fadeOutRight',
  speed: 'fast'
}).split(' ');

export function BurgerMenu() {
  const pagePath: string = usePathname();
  const [isActive, setIsActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    if (menuRef.current) {
      menuRef.current.classList.add(...MENU_OUT_ANIMATION_CLASSES);
      (menuRef.current.querySelectorAll('a') || []).forEach((item, index, list) => {
        item.classList.add(...LINK_ITEM_OUT_ANIMATION_CLASSES);
        item.style.animationDelay = `${(list.length - index) * 0.1}s`;
      });
      const timeOutId = setTimeout(() => {
        setIsActive(false);
        clearTimeout(timeOutId);
      }, 500);
    }
  };

  const handleToggle = () => {
    if (isActive) {
      handleClose();
      return;
    }
    setIsActive(true);
  };

  useEffect(() => {
    handleClose();
  }, [pagePath]);

  return (
    <>
      {isActive && (
        <div
          ref={menuRef}
          className={clsx(
            'fixed bottom-0 left-0 top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-white p-5 dark:bg-black',
            styles['burger-menu__content-container'],
            animator({ name: 'fadeInDown', speed: 'fast' })
          )}
        >
          <div className='flex w-full flex-grow flex-col items-center justify-center gap-10 lg:gap-16'>
            {MENU_ITEMS.map(({ id, title, url }, index) => (
              <Link
                key={id}
                href={url}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                className={clsx(
                  titleFont.className,
                  styles['burger-menu__link'],
                  'relative w-4/5 text-left text-4xl font-bold duration-200 lg:text-6xl',
                  animator({ name: 'fadeInLeft', speed: 'fast' })
                )}
              >
                {title.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className='flex w-full justify-end overflow-hidden max-md:hidden'></div>
        </div>
      )}

      <button
        onClick={handleToggle}
        className={clsx(
          'relative mt-16 h-16 w-16 rounded-full p-5',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        <div
          className={clsx(
            'absolute left-0 top-0 h-full w-full border',
            styles['burger-menu__button-outline-1']
          )}
        />
        <div
          className={clsx(
            'absolute left-0 top-0 h-full w-full border',
            styles['burger-menu__button-outline-2']
          )}
        />
        <div
          className={clsx('w-full', styles['burger-menu__button-content'], {
            [styles['burger-menu__button-content--is-active']]: isActive
          })}
        />
      </button>
    </>
  );
}
