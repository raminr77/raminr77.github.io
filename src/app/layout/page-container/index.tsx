import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import { PageHeader } from '@/app/layout/page-header';
import { MAIN_DATA } from '@/data';
import { AnimationNames, animator } from '@/shared/utils/animator';
import styles from './page-container.module.scss';

interface Props extends GCommonCompnentPropertiesWithChildren {
  title: string;
  animationName?: AnimationNames;
}

export function PageContainer({
  title,
  children,
  className,
  animationName = 'slideInRight'
}: Props) {
  return (
    <React.Fragment>
      <Head>
        <title>{`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME} - ${title}`}</title>
      </Head>
      <PageHeader />
      <div
        className={classNames(
          'bg-zinc-900 relative text-white flex justify-center py-5',
          animator({ name: animationName }),
          styles.PageContainer__container,
          className
        )}
      >
        <div className='w-full z-10 max-w-screen-2xl px-5'>{children}</div>
      </div>
    </React.Fragment>
  );
}
