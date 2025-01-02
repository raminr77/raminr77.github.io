'use client'
import { useRef, useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';
import styles from './burger-menu.module.scss';
import { titleFont } from '@/app/fonts';

const MENU_ITEMS = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'Posts', url: '/' },
  { id: 3, title: 'Journey', url: '/' },
  { id: 4, title: 'Projects', url: '/' },
  { id: 5, title: 'About Me', url: '/' },
  { id: 6, title: 'Contact Me', url: '/contact-me' },
] as const;

const MENU_OUT_ANIMATION_CLASSES = animator({ name: 'fadeOutUp', speed: 'fast' }).split(' ');
const LINK_ITEM_OUT_ANIMATION_CLASSES = animator({ name: 'fadeOutRight', speed: 'fast' }).split(' ');

export function BurgerMenu() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    if (menuRef.current && isActive) {
      menuRef.current.classList.add(...MENU_OUT_ANIMATION_CLASSES);
      (menuRef.current.querySelectorAll('a') || []).forEach((item, index, list) => {
        item.classList.add(...LINK_ITEM_OUT_ANIMATION_CLASSES);
        item.style.animationDelay = `${(list.length - index) * 0.1}s`;
      })
      const timeOutId = setTimeout(() => {
        setIsActive(false);
        clearTimeout(timeOutId);
      }, 500);
      return;
    }
    setIsActive(true);
  }

  return (
    <>
      {isActive && (
        <div
          ref={menuRef}
          className={clsx(
            'fixed bottom-0 top-0 left-0 w-full h-dvh dark:bg-black bg-white flex items-center justify-center p-5 flex-col overflow-hidden gap-10 lg:gap-16',
            styles['burger-menu__content-container'],
            animator({ name: 'fadeInDown', speed: 'fast' })
          )}
        >
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
                'w-4/5 text-4xl lg:text-6xl font-bold text-left duration-200 relative',
                animator({ name: 'fadeInLeft', speed: 'fast' })
              )}
            >
              {title.toUpperCase()}
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={handleToggle}
        className={clsx(
          'h-16 w-16 rounded-full p-5 relative mt-16',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        <div className={clsx('w-full h-full border absolute top-0 left-0', styles['burger-menu__button-outline-1'])} />
        <div className={clsx('w-full h-full border absolute top-0 left-0', styles['burger-menu__button-outline-2'])} />
        <div
          className={clsx('w-full', styles['burger-menu__button-content'], {
            [styles['burger-menu__button-content--is-active']]: isActive
          })}
        />
      </button>
    </>
  );
}
