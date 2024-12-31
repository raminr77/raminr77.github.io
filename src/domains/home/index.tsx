'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './home.module.scss';
import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';

const CHARACTERS = [
  { id: 1, text: 'R', replaceText: '.' },
  { id: 2, text: 'a', replaceText: 'e' },
  { id: 3, text: 'm', replaceText: 'z' },
  { id: 4, text: 'i', replaceText: 'a' },
  { id: 5, text: 'n', replaceText: 'e' },
  { id: 6, text: '.', replaceText: 'i' }
] as const;

export function HomePage() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const textCharacters = titleElement.querySelectorAll('span');
      const replaceCharacters = titleRef.current.querySelectorAll(
        'span:not([data-text="."])'
      );

      const timeline = gsap.timeline();
      timeline.set(titleElement, { autoAlpha: 1 });
      timeline.set(textCharacters, { yPercent: -110 });
      timeline.to(textCharacters, {
        duration: 1,
        yPercent: 0,
        stagger: 0.1,
        ease: 'expo.inOut'
      });
      timeline.to(replaceCharacters, {
        delay: 6,
        yoyo: true,
        repeat: -1,
        duration: 1,
        stagger: 0.1,
        yPercent: 110,
        repeatDelay: 6,
        ease: 'expo.inOut'
      });
    }
  }, []);

  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center gap-4 select-none'>
      <h1
        ref={titleRef}
        className={clsx(
          'select-none flex items-center text-8xl font-extrabold invisible overflow-hidden w-11/12 justify-center',
          titleFont.className
        )}
      >
        {CHARACTERS.map(({ id, text, replaceText }) => (
          <span
            className={styles.home__character}
            data-text={replaceText}
            key={id}
          >
            {text}
          </span>
        ))}
      </h1>
      <h3 className='text-2xl'>Senior Software Engineer</h3>
    </main>
  );
}
