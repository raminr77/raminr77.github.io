import { Gantari, Hubballi } from 'next/font/google';

const textFont = Hubballi({
  preload: true,
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-text'
});

const titleFont = Gantari({
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-title'
});

export { textFont, titleFont };
