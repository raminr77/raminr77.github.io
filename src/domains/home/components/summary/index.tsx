import Link from 'next/link';

import { clsx } from 'clsx';

import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { PERSONAL_DATA } from '@/data';

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

      <Link
        href={ROUTES.ABOUT_ME}
        className="border-b px-3 pb-1 duration-200 hover:px-5"
        onClick={() => sendGTMEvent(GTM_EVENTS.MORE_ABOUT_ME)}
      >
        More About {PERSONAL_DATA.firstName}
      </Link>
    </div>
  );
}
