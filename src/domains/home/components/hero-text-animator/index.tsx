'use client'
import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';
import { titleFont } from '@/app/fonts';
import { HETO_TEXT_CHARACTERS } from '@/domains/home/constants';

import styles from './hero-text-animator.module.scss';
import { PERSONAL_DATA } from '@/data';

export function HeroTextAnimator() {
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
    <div className='flex flex-col items-center justify-center'>
      <h1
        ref={titleRef}
        className={clsx(
          'select-none flex items-center text-8xl font-extrabold invisible overflow-hidden w-11/12 justify-center',
          titleFont.className
        )}
      >
        {HETO_TEXT_CHARACTERS.map(({ id, text, replaceText }) => (
          <span
            className={styles['hero-text-animator__character']}
            data-text={replaceText}
            key={id}
          >
            {text}
          </span>
        ))}
      </h1>
      <h3 className='text-2xl'>{PERSONAL_DATA.title}</h3>
    </div>
  );
}
