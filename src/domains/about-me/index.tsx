'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { clsx } from 'clsx';

import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';
import { ContentContainer } from '@/layout/components/content-container';
import { ABOUT_ME_DATA, type AboutMeContentItem } from '@/data';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import { RecommendationSlider } from './components/RecommendationSlider';
import styles from './about-me.module.scss';
import { renderContent } from './helper';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

export function AboutMePage() {
  return (
    <ContentContainer className="text-center">
      <div className="relative mb-10 flex w-full select-none justify-center">
        <Image
          width={384}
          height={480}
          loading="lazy"
          className={clsx(
            'pointer-events-none z-20 w-4/5 max-w-96',
            animator({ name: 'fadeIn', speed: 'slow', delay: '1s' })
          )}
          draggable={false}
          src={ABOUT_ME_DATA.heroURL}
          alt={PERSONAL_DATA.fullName}
          title={PERSONAL_DATA.fullName}
        />

        <PixelCanvas
          playOnes
          color="green"
          className="absolute z-0 h-full w-full grayscale invert duration-500 hover:grayscale-0 dark:invert-0"
        />
      </div>
      <h1
        className={clsx(
          'text-left text-4xl font-extrabold',
          animator({ name: 'fadeInUp' }),
          titleFont.className
        )}
        style={{ animationDelay: `${0.3}s` }}
      >
        {`About ${PERSONAL_DATA.firstName}`}
      </h1>
      <p
        className={clsx('mt-1 text-left text-xl', animator({ name: 'fadeInUp' }))}
        style={{ animationDelay: `${2 * 0.3}s` }}
      >
        {`${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`}
      </p>
      <div
        className={clsx(
          'mb-5 mt-4 flex flex-col gap-4 text-justify text-lg',
          animator({ name: 'fadeIn', delay: '1s' }),
          styles['about-me']
        )}
      >
        {ABOUT_ME_DATA.content.map((item: AboutMeContentItem, index: number) => {
          if (index === 3) {
            return <RecommendationSlider key="linkedIn-Recommendations" />;
          }
          return renderContent(index, item);
        })}
      </div>

      <div className="my-10 flex flex-col items-start gap-4">
        <p className="text-xl">You can download my resume here:</p>
        <ResumeDownloaderButton />
      </div>

      <br />
    </ContentContainer>
  );
}
