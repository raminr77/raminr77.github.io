'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import { GTM_EVENTS, MENU_ITEM_ROUTES, ROUTES } from '@/shared/constants';
import { BurgerMenu } from '@/layout/components/burger-menu';
import { ToggleThemeButton } from '@/shared/components';
import { animator } from '@/shared/helpers';

import styles from './header.module.scss';

export function Header() {
  const pathname: string = usePathname();
  const prefersReducedMotion: boolean | null = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        <ul
          onMouseLeave={() => setHoveredIndex(null)}
          className={clsx(
            'flex w-full items-center justify-center gap-2 text-xl max-md:hidden',
            styles['header__desktop-items-container']
          )}
        >
          {MENU_ITEM_ROUTES.map(({ id, title, url }, index: number) => (
            <li
              key={`${title}-${id}-desktop`}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
              className={clsx('relative', animator({ name: 'fadeIn', speed: 'slow' }))}
            >
              <Link
                href={url}
                onClick={() => sendGTMEvent(GTM_EVENTS.MENU(title))}
                className="bg-transparent px-4 py-3 whitespace-nowrap"
              >
                {title}
              </Link>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layoutId="nav-underline"
                    data-testid="nav-underline"
                    className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-orange-500"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 32 }
                    }
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
          <li
            key="theme-toggle-desktop"
            className={clsx('ml-4', animator({ name: 'fadeIn', delay: '3s' }))}
          >
            <ToggleThemeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
