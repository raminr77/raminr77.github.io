import { useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import gsap from 'gsap';
import { MAIN_DATA } from '@/data';
import { ResumeDownloadBtn } from '@/shared/components/resume-download-btn';
import { CRO_DATA } from '@/shared/constants/cro';
import { GA_EVENT_NAMES } from '@/shared/constants/ga';
import { ROUTES } from '@/shared/routes';
import { gaEvent } from '@/shared/services/ga';
import { animator } from '@/shared/utils/animator';
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
        delay: 3,
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

      <ResumeDownloadBtn />

      <section
        className={classNames(
          'border border-solid border-white p-5 mt-10 mr-10 max-w-3xl text-justify leading-7 mb-3 duration-700 max-lg:max-h-80 max-lg:overflow-y-auto',
          animator({ name: 'fadeInUp', delay: '2s' }),
          styles.SharedSection__description
        )}
        dangerouslySetInnerHTML={{ __html: MAIN_DATA.SUMMERY }}
      />
      <Link
        onClick={() =>
          gaEvent({ action: GA_EVENT_NAMES.SHOW_MORE_TEXT, params: { text: 'about-me' } })
        }
        data-cro-id={CRO_DATA.CLICK_ABOUT_US_READ_MORE}
        className={classNames('text-sm', animator({ name: 'fadeIn', delay: '3s' }))}
        href={ROUTES.ABOUT_ME}
      >
        Read More ...
      </Link>
    </div>
  );
}
