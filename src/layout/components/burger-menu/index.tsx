'use client';

import React, { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { clsx } from 'clsx';

import { ToggleThemeButton } from '@/shared/components/toggle-theme-button';
import { MENU_ITEM_ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import { BurgerMenuToolsAnimation } from './burger-menu-tools-animation';
import styles from './burger-menu.module.scss';

const MENU_OUT_ANIMATION_CLASSES: string[] = animator({
  name: 'fadeOutUp',
  speed: 'fast'
}).split(' ');
const LINK_ITEM_OUT_ANIMATION_CLASSES: string[] = animator({
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
    <div className="md:hidden">
      {isActive && (
        <div
          ref={menuRef}
          className={clsx(
            'fixed bottom-0 left-0 top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-white p-5 dark:bg-black',
            styles['burger-menu__content-container'],
            animator({ name: 'fadeInDown', speed: 'fast' })
          )}
        >
          <div className="flex w-full flex-grow flex-col items-center justify-center gap-10 lg:gap-16">
            {MENU_ITEM_ROUTES.map(({ id, title, url }, index) => (
              <Link
                key={id}
                href={url}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                className={clsx(
                  titleFont.className,
                  styles['burger-menu__link'],
                  animator({ name: 'fadeInLeft', speed: 'fast' }),
                  'relative w-4/5 text-left text-4xl font-bold tracking-widest duration-200 lg:text-6xl'
                )}
              >
                {title.toUpperCase()}
              </Link>
            ))}
            {/* Toggle Theme */}
            <div
              className={clsx(
                animator({ name: 'fadeIn', speed: 'fast', delay: '1s' }),
                'w-4/5 relative flex justify-start items-center text-left mt-5'
              )}
            >
              <ToggleThemeButton isBurgerMenu />
            </div>
          </div>
          <BurgerMenuToolsAnimation />
        </div>
      )}

      <button
        onClick={handleToggle}
        title="Burger Menu"
        aria-label="Burger Menu Toggle"
        className={clsx(
          'relative h-12 w-12 rounded-full p-5',
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
    </div>
  );
}
