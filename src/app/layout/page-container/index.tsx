import React from 'react';
import classNames from 'classnames';
import { PageHeader } from '@/app/layout/page-header';
import { animator } from '@/shared/utils/animator';
import styles from './page-container.module.scss';

export function PageContainer({
  children,
  className
}: GCommonCompnentPropertiesWithChildren) {
  return (
    <React.Fragment>
      <PageHeader />
      <div
        className={classNames(
          'min-h-screen bg-black relative text-white flex justify-center pt-5',
          animator({ name: 'slideInLeft' }),
          styles.PageContainer__container,
          className
        )}
      >
        <div className='max-w-screen-2xl'>{children}</div>
      </div>
    </React.Fragment>
  );
}
