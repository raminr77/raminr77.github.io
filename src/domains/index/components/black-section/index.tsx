import classNames from 'classnames';
import { MAIN_DATA } from '@/data';
import { animator } from '@/shared/utils/animator';
import { IndexBlackSectionMenu } from './black-section-menu';
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
        <IndexBlackSectionMenu />
        <section
          className={classNames(
            'duration-300 absolute border border-solid border-white p-5 mr-10 max-w-3xl text-justify leading-7',
            animator({ name: 'fadeInUp', delay: '2s' }),
            styles.BlackSection__description
          )}
          dangerouslySetInnerHTML={{ __html: MAIN_DATA.SUMMERY }}
        />
      </div>
    </div>
  );
}
