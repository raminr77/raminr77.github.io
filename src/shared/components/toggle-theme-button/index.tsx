'use client';
import { useEffect, useState } from 'react';

const THEMES = { light: 'light', dark: 'dark' } as const;
type Theme = keyof typeof THEMES;

export function ToggleThemeButton({ isBurgerMenu = false }: { isBurgerMenu?: boolean }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return THEMES.dark;

    const localTheme = localStorage.theme as Theme | undefined;
    if (localTheme) return localTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? THEMES.dark : THEMES.light;
  });

  useEffect(() => {
    document.documentElement.classList.remove(THEMES.light, THEMES.dark);
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
  }, [theme]);

  // const handleThemeChange = () => {
  //   const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
  //   setTheme(newTheme);
  // };

  // const buttonText = `Switch to ${theme === THEMES.light ? 'dark' : 'light'} mode`;

  // return (
  //   <button
  //     type="button"
  //     title={buttonText}
  //     aria-label="Toggle theme"
  //     onClick={handleThemeChange}
  //     className="cursor-pointer text-2xl"
  //   >
  //     {isBurgerMenu && buttonText}
  //     {theme === THEMES.light ? '🌙' : '☀️'}
  //   </button>
  // );
  return null;
}
