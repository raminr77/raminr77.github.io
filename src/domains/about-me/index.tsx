'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { clsx } from 'clsx';

import {
  ABOUT_ME_DATA,
  ABOUT_ME_CONTENT_TYPE,
  ABOUT_ME_COMPONENT_NAMES,
  type AboutMeContentItem
} from '@/data';
import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';
import { ContentContainer } from '@/layout/components/content-container';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { PERSONAL_DATA } from '@/data';

import { RecommendationsBox } from './components/recommendations-box';
import styles from './about-me.module.scss';
import { renderContent } from './helper';

const PixelCanvas = dynamic(() => import('@/shared/components/pixel-canvas'), {
  ssr: false
});

const ABOUT_ME_COMPONENTS = {
  [ABOUT_ME_COMPONENT_NAMES.recommendations]: (
    <RecommendationsBox key={ABOUT_ME_COMPONENT_NAMES.recommendations} />
  ),
  [ABOUT_ME_COMPONENT_NAMES.competition]: (
    <div
      key={ABOUT_ME_COMPONENT_NAMES.competition}
      className="flex items-center justify-center px-5 relative select-none py-5 overflow-hidden"
      style={{ maxHeight: 575 }}
    >
      <Image
        width={400}
        height={575}
        loading="lazy"
        draggable={false}
        alt={PERSONAL_DATA.fullName}
        title={PERSONAL_DATA.fullName}
        src="/images/personal-images/02.png"
        className="grayscale-75 pointer-events-none z-20 mt-4"
      />
      <PixelCanvas
        color="yellow"
        className="absolute z-0 h-full w-full grayscale invert duration-500 hover:grayscale-0 dark:invert-0"
      />
    </div>
  )
} as const;

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
            animator({ name: 'fadeIn', speed: 'slow' })
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
          animator({ name: 'fadeInUp', delay: '1s' }),
          titleFont.className
        )}
      >
        {`About ${PERSONAL_DATA.firstName}`}
      </h1>
      <p
        className={clsx('mt-1 text-left text-xl', animator({ name: 'fadeInUp' }))}
        style={{ animationDelay: '1.3s' }}
      >
        {`${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`}
      </p>
      <div
        className={clsx(
          'mb-5 mt-4 flex flex-col gap-4 text-justify text-lg',
          animator({ name: 'fadeIn' }),
          styles['about-me']
        )}
        style={{ animationDelay: '1.5s' }}
      >
        {ABOUT_ME_DATA.content.map((item: AboutMeContentItem, index: number) => {
          if (item.type === ABOUT_ME_CONTENT_TYPE.component) {
            return ABOUT_ME_COMPONENTS[item.name] ?? null;
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
