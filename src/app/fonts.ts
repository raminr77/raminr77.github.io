import { Gantari, Playwrite_NZ } from 'next/font/google';

export const textFont = Playwrite_NZ({
  display: 'swap',
  adjustFontFallback: false
});

export const titleFont = Gantari({
  subsets: ['latin'],
  display: 'swap'
});
