import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { DATA } from '@/data';
import { BlackSection } from './components/black-section';
import { WhiteSection } from './components/white-section';
import styles from './index.module.scss';

export function Index() {
  const page = useRef<HTMLInputElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (page.current != null) {
      const elm = page.current;
      gsap.to(elm.querySelector('#logo'), {
        duration: 6,
        rotation: 90,
        transformOrigin: 'bottom left',
        scrollTrigger: {
          trigger: elm.querySelector('#b-section'),
          end: '0 0',
          scrub: true
        }
      });
    }
  }, []);

  return (
    <main ref={page}>
      <div
        id='logo'
        className={classNames(
          'z-10 mix-blend-difference select-none text-white fixed',
          styles.Index
        )}
      >
        <h1 className={styles.Index__title}>{DATA.NAME}</h1>
        <h3 className={styles.Index__description}>{DATA.TITLE}</h3>
      </div>
      <section className='bg-white w-full h-screen'>
        <WhiteSection />
      </section>
      <section id='b-section' className='bg-black w-full h-screen text-white'>
        <BlackSection />
      </section>
    </main>
  );
}
