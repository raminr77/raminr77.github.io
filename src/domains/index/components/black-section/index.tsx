import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';
import { IndexBlackSectionMenu } from './black-section-menu';
import { BlackSectionParticles } from './black-section-particles';
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
      <div className='w-full z-10 min-h-screen overflow-y-auto relative flex flex-col items-end'>
        <IndexBlackSectionMenu />
      </div>
      <BlackSectionParticles />
    </div>
  );
}
