import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { PageHeader } from '@/app/layout/page-header';
import { MAIN_DATA } from '@/data';
import { animator } from '@/shared/utils/animator';
import styles from './page-container.module.scss';

interface Props extends GCommonCompnentPropertiesWithChildren {
  title: string;
}

export function PageContainer({ children, className, title }: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>{`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME} - ${title}`}</title>
      </Head>
      <PageHeader />
      <div
        className={classNames(
          'overflow-hidden bg-black relative text-white flex justify-center pt-5',
          animator({ name: 'slideInRight' }),
          styles.PageContainer__container,
          className
        )}
      >
        <div className='w-full max-w-screen-2xl flex justify-end px-5'>{children}</div>

        {/* Extera */}
        <h3
          className={classNames(
            'mix-blend-difference select-none font-title-bold absolute left-0 bottom-0 z-10 -rotate-90 origin-bottom-left mb-6 lg:mb-10 ml-20 lg:ml-28 text-white',
            styles.PageContainer__exteraTitle
          )}
        >
          {title.toUpperCase()}
        </h3>
        <div
          className={classNames(
            'absolute left-0 bottom-0',
            animator({ name: 'slideInLeft', delay: '1s' }),
            styles.PageContainer__exteraElement
          )}
        />
      </div>
    </React.Fragment>
  );
}
