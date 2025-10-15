import { animator } from '@/shared/helpers';
import { PERSONAL_DATA } from '@/data';
import { clsx } from 'clsx';

import { MoreInformationButton } from './more-information-button';
import styles from './summary.module.scss';

export function Summary() {
  return (
    <div
      className={clsx(
        'z-40 mb-4 flex w-11/12 max-w-screen-md flex-col items-center justify-center gap-4 overflow-y-auto p-5 leading-6 backdrop-blur-sm md:text-lg',
        animator({ name: 'fadeIn', delay: '2s' })
      )}
    >
      <div
        className={clsx('block max-md:hidden', styles['summary__content'])}
        dangerouslySetInnerHTML={{ __html: PERSONAL_DATA.summary }}
      />

      <div
        className={clsx('hidden max-md:block', styles['summary__content'])}
        dangerouslySetInnerHTML={{ __html: PERSONAL_DATA.shortSummary }}
      />

      <MoreInformationButton />
    </div>
  );
}
