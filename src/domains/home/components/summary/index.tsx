import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants';
import { PERSONAL_DATA } from '@/data';

export function Summary() {
  const topWordClasses = clsx(titleFont.className, 'font-semibold tracking-wide');
  return (
    <div
      className={clsx(
        'z-40 mb-4 flex w-11/12 max-w-screen-md flex-col items-center justify-center gap-4 overflow-y-auto p-5 leading-6 backdrop-blur-sm md:text-lg',
        animator({ name: 'fadeIn', delay: '2s' })
      )}
    >
      <div>
        You meet Ramin, a <strong className={topWordClasses}>Software Engineer</strong>{' '}
        with <strong className={topWordClasses}>over 6 years</strong> of experience in web
        development.
        <br />
        With a strong focus on back-end, front-end and familiarity with Data and Machine
        Learning technologies.
        <br />
        He contributed to large-scale projects within the{' '}
        <strong className={topWordClasses}>Digikala Group</strong> For 4 years.
        <br />
        These projects have <strong className={topWordClasses}>
          over 10 million
        </strong>{' '}
        daily visits and <strong className={topWordClasses}>over 40 million</strong>{' '}
        active users.
        <br />
        The story of these exciting projects continues in{' '}
        <strong className={topWordClasses}>Sweden 🇸🇪</strong> and now Ramin is working at{' '}
        <strong className={topWordClasses}>Boozt</strong> company.
      </div>
      <Link href={ROUTES.ABOUT_ME} className='border-b px-3 pb-1 duration-200 hover:px-5'>
        More About {PERSONAL_DATA.firstName}
      </Link>
    </div>
  );
}
