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
          'min-h-screen bg-black relative',
          animator({ name: 'slideInLeft' }),
          styles.PageContainer__container,
          className
        )}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
