'use client';

import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { clsx } from 'clsx';
import gsap from 'gsap';

import { HETO_TEXT_CHARACTERS } from '@/domains/home/constants';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import styles from './hero-text-animator.module.scss';

const DecryptedText = dynamic(() => import('@/shared/components/decrypted-text'), {
  ssr: false
});

export function HeroTextAnimator() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (titleRef.current) {
        const titleElement = titleRef.current;
        const textCharacters = titleElement.querySelectorAll('span');
        const replaceCharacters = titleElement.querySelectorAll(
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
    },
    { scope: titleRef }
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1
        ref={titleRef}
        className={clsx(
          'invisible mt-10 flex w-11/12 select-none items-center justify-center overflow-hidden text-8xl font-extrabold',
          titleFont.className
        )}
      >
        {HETO_TEXT_CHARACTERS.map(({ id, text, replaceText }) => (
          <span
            className={styles['hero-text-animator__character']}
            data-text={replaceText}
            aria-hidden="true"
            key={id}
          >
            {text}
          </span>
        ))}
      </h1>
      <DecryptedText
        sequential
        speed={80}
        parentClassName="text-3xl"
        text={PERSONAL_DATA.title}
      />
    </div>
  );
}
