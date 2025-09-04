'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { clsx } from 'clsx';

import { HETO_TEXT_CHARACTERS } from '@/domains/home/constants';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import { DecryptedText } from '@/shared/components/decrypted-text';
import styles from './hero-text-animator.module.scss';

export function HeroTextAnimator() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const textCharacters = titleElement.querySelectorAll('h1');
      const replaceCharacters = titleElement.querySelectorAll('h1:not([data-text="."])');

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
    <div className="flex w-full flex-col items-center justify-center">
      <div
        ref={titleRef}
        className={clsx(
          'invisible mt-10 flex w-11/12 select-none items-center justify-center overflow-hidden text-8xl font-extrabold',
          titleFont.className
        )}
      >
        {HETO_TEXT_CHARACTERS.map(({ id, text, replaceText }) => (
          <h1
            className={styles['hero-text-animator__character']}
            data-text={replaceText}
            key={id}
          >
            {text}
          </h1>
        ))}
      </div>
      <DecryptedText
        sequential
        speed={80}
        parentClassName="text-3xl"
        text={PERSONAL_DATA.title}
      />
    </div>
  );
}
