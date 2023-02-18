import { useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import gsap from 'gsap';
import { MAIN_DATA } from '@/data';
import styles from './shared-section.module.scss';

export function IndexSharedSection() {
  const CHARACTERS = [
    { id: 1, text: 'R', replaceText: '.' },
    { id: 2, text: 'a', replaceText: 'e' },
    { id: 3, text: 'm', replaceText: 'z' },
    { id: 4, text: 'i', replaceText: 'a' },
    { id: 5, text: 'n', replaceText: 'e' },
    { id: 6, text: '', replaceText: 'i' }
  ];
  const fullNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fullNameRef.current) {
      const fullNameText = fullNameRef.current;
      const fullNameCharacters = fullNameRef.current.querySelectorAll('span');
      const replaceCharacters = fullNameRef.current.querySelectorAll(
        'span:not([data-text="."])'
      );
      const t1 = gsap.timeline();
      t1.set(fullNameText, { autoAlpha: 1 });
      t1.set(fullNameCharacters, { yPercent: -110 });
      t1.to(fullNameCharacters, {
        duration: 1,
        yPercent: 0,
        stagger: 0.1,
        ease: 'expo.inOut'
      });
      t1.to(replaceCharacters, {
        yoyo: true,
        repeat: -1,
        duration: 1,
        stagger: 0.1,
        yPercent: 110,
        ease: 'expo.inOut'
      });
    }
  }, []);

  return (
    <div
      className={classNames(
        'fixed z-10 mix-blend-difference text-white',
        styles.SharedSection__container
      )}
    >
      <h1 className='flex items-center pr-20' ref={fullNameRef}>
        {CHARACTERS.map(({ id, text, replaceText }) => (
          <span
            key={id}
            className='font-title-bold block relative'
            data-text={replaceText}
          >
            {text}
          </span>
        ))}
      </h1>
      <h3 className='font-title ml-3 mb-5'>{MAIN_DATA.TITLE}</h3>

      <Link href='/'>
        <div
          className={classNames(
            'w-52 h-12 overflow-hidden duration-300 relative flex items-center justify-center',
            styles.SharedSection__downloadBtn
          )}
        >
          <span className='absolute w-full top-0 right-0' />
          <span className='absolute h-full right-0 bottom-0' />
          <span className='absolute h-full top-0 left-0' />
          <span className='absolute w-full bottom-0 left-0' />
          Download CV
        </div>
      </Link>
    </div>
  );
}
