'use client';
import { useRef, useState } from "react";

import { isSSR } from "@/shared/helpers";

const THEMES = { light: "light", dark: "dark" } as const;

export type Theme = keyof typeof THEMES;

export function ToggleThemeButton({ isBurgerMenu = false }: { isBurgerMenu?: boolean }) {
  const isFirstLoad = useRef<boolean>(true);
  const [theme, setTheme] = useState<Theme>(THEMES.light);

  const setDocumentTheme = (value: Theme) => {
    document.documentElement.classList.remove(THEMES.light, THEMES.dark);
    document.documentElement.classList.add(value);
    localStorage.theme = value;
  };

  const handleThemeChange = () => {
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    setDocumentTheme(newTheme);
    setTheme(newTheme);
  };

  if (isFirstLoad.current && !isSSR) {
    isFirstLoad.current = false;

    let isDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (localStorage.theme) {
      isDarkTheme = localStorage.theme === THEMES.dark;
    }

    const systemTheme: Theme = isDarkTheme ? THEMES.dark : THEMES.light;
    setDocumentTheme(systemTheme);
    setTheme(systemTheme);
  }

  // const buttonText = `Switch to ${theme === THEMES.light ? "dark" : "light"} mode `

  return null;

  // return (
  //   <button
  //     type="button"
  //     title={buttonText}
  //     aria-label="Toggle theme"
  //     onClick={handleThemeChange}
  //     className="cursor-pointer text-2xl"
  //   >
  //     {isBurgerMenu && buttonText}
  //     {theme === THEMES.light ? "🌙" : "☀️"}
  //   </button>
  // );
}
