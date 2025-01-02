import { clsx } from 'clsx';
import { animator } from '@/shared/helpers';

export function Summary() {
  return (
    <div
      className={clsx(
        'mb-2 max-w-screen-md w-11/12 leading-6 text-lg p-5 backdrop-blur-sm z-40',
        animator({ name: 'fadeIn', delay: '2s' }),
      )}
    >
      You meet Ramin, a <strong>software engineer</strong> with <strong>over 6 years</strong> of experience in web development. <br />With a strong focus on front-end and familiarity with back-end technologies. <br />
      Proudly I contributed to large-scale projects within the <strong>Digikala Group</strong>.
      <br />
      These projects have <strong>over 10 million</strong> daily visits and <strong>over 40 million</strong> active users. <br />
      The story of these exciting projects continues and now I am working at <strong>Boozt</strong> company.<br />
      I really believe that nothing is more important and exciting than learning and teaching web-based technologies and there is still so much for me to learn.
    </div>
  );
}
