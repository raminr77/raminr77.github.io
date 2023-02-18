import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';
import styles from './black-section.module.scss';

export function IndexBlackSection() {
  return (
    <div
      className={classNames(
        'w-full text-white absolute right-0 top-0 bottom-0 h-screen bg-black',
        animator({ name: 'slideInRight', delay: '1s' }),
        styles.BlackSection__container
      )}
    >
      <div className='w-full min-h-screen overflow-y-auto relative flex flex-col items-end'>
        <section>sss</section>
      </div>
    </div>
  );
}
