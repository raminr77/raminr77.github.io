'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

import { FEATURE_FLAGS, GTM_EVENTS, LOCAL_STORAGE_KEYS } from '@/shared/constants';
import { Icons } from '@/shared/components/icons';
import { GENERAL_SITE_DATA } from '@/data';

const THEMES = { light: 'light', dark: 'dark' } as const;
export type Theme = keyof typeof THEMES;

export function ToggleThemeButton({ isBurgerMenu = false }: { isBurgerMenu?: boolean }) {
  const { switchToDark, switchToLight } = GENERAL_SITE_DATA.theme;
  const [theme, setTheme] = useState<Theme>(THEMES.dark);

  useEffect(() => {
    const previousTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme | null;
    if (previousTheme) {
      setTheme(previousTheme);
      return;
    }
    setTheme(THEMES.dark);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.dark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(THEMES.light, THEMES.dark);
    document.documentElement.classList.add(theme);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    sendGTMEvent(GTM_EVENTS.TOGGLE_THEME(newTheme));
    setTheme(newTheme);
  };

  const buttonText = theme === THEMES.light ? switchToDark : switchToLight;

  return FEATURE_FLAGS.TOGGLE_THEME_BUTTON ? (
    <button
      type="button"
      title={buttonText}
      aria-label="Toggle theme"
      onClick={handleThemeChange}
      className="flex items-center gap-4 cursor-pointer text-2xl"
    >
      {isBurgerMenu && buttonText}
      <Icons name={theme === THEMES.light ? 'moon' : 'sun'} />
    </button>
  ) : null;
}
