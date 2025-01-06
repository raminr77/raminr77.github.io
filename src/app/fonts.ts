import { Gantari, Hubballi } from 'next/font/google';

export const textFont = Hubballi({
  weight: '400',
  preload: false
});

export const titleFont = Gantari({
  subsets: ['latin'],
  display: 'swap',
  preload: false
});
