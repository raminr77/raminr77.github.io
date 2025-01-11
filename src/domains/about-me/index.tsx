import { clsx } from 'clsx';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PERSONAL_DATA } from '@/data';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { ABOUT_ME_DATA, type AboutMeContentItem } from '@/data';
import { ContentContainer } from '@/layout/components/content-container';
import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';

import { renderContent } from './helper';

import styles from './about-me.module.scss';

export const metadata: Metadata = {
  title: `About ${PERSONAL_DATA.fullName}`,
};

export function AboutMePage() {
  return (
    <ContentContainer className='text-center'>
      <div className='flex w-full select-none justify-center'>
        <Image
          width={384}
          height={480}
          className={clsx(
            'w-4/5 max-w-96',
            animator({ name: 'fadeIn', speed: 'slow', delay: '1s' })
          )}
          draggable={false}
          src={ABOUT_ME_DATA.heroURL}
          alt={PERSONAL_DATA.fullName}
          title={PERSONAL_DATA.fullName}
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
      <h3
        className={clsx('mt-1 text-left text-xl', animator({ name: 'fadeInUp' }))}
        style={{ animationDelay: `${2 * 0.3}s` }}
      >
        {`${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`}
      </h3>
      <div
        className={clsx(
          'mb-5 mt-4 flex flex-col gap-4 text-justify text-lg',
          animator({ name: 'fadeIn', delay: '1s' }),
          styles['about-me']
        )}
      >
        {ABOUT_ME_DATA.content.map((item: AboutMeContentItem, index: number) =>
          renderContent(index, item)
        )}
      </div>

      <div className='my-10 flex flex-col items-start gap-4'>
        <p className='text-xl'>You can download my resume here:</p>
        <ResumeDownloaderButton />
      </div>
    </ContentContainer>
  );
}
