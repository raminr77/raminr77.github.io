import { Gantari, Hubballi } from 'next/font/google';

export const textFont = Hubballi({
  preload: true,
  weight: '400',
  display: 'swap'
});

export const titleFont = Gantari({
  preload: true,
  display: 'swap',
  subsets: ['latin']
});
