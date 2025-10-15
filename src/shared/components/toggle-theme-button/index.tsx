'use client';
import { useEffect, useState } from 'react';

import { FEATURE_FLAGS, GTM_EVENTS } from '@/shared/constants';
import { sendGTMEvent } from '@next/third-parties/google';
import { Icons } from '@/shared/components/icons';

const THEMES = { light: 'light', dark: 'dark' } as const;
export type Theme = keyof typeof THEMES;

export function ToggleThemeButton({ isBurgerMenu = false }: { isBurgerMenu?: boolean }) {
  const [theme, setTheme] = useState<Theme>(THEMES.dark);

  useEffect(() => {
    const previousTheme = localStorage.getItem('theme') as Theme | null;
    if (previousTheme) {
      setTheme(previousTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(THEMES.light, THEMES.dark);
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    sendGTMEvent(GTM_EVENTS.TOGGLE_THEME(newTheme));
    setTheme(newTheme);
  };

  const buttonText = `Switch to ${theme === THEMES.light ? 'dark' : 'light'} mode`;

  return FEATURE_FLAGS.TOGGLE_THEME_BUTTON ? (
    <button
      type="button"
      title={buttonText}
      aria-label="Toggle theme"
      onClick={handleThemeChange}
      className="cursor-pointer text-2xl"
    >
      {isBurgerMenu && buttonText}
      <Icons name={theme === THEMES.light ? 'moon' : 'sun'} />
    </button>
  ) : null;
}
