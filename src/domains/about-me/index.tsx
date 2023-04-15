import classNames from 'classnames';
import { PageContainer } from '@/app/layout/page-container';
import { MAIN_DATA } from '@/data';
import { animator } from '@/shared/utils/animator';
import Slider from './components/slider';

export function AboutMePage() {
  return (
    <PageContainer title='About' animationName='slideInUp'>
      <div className='w-10/12 mx-auto mt-5 select-none'>
        <h3 className='font-title-bold text-2xl mb-3'>About {MAIN_DATA.FIRST_NAME}</h3>
        <div
          className='leading-7 text-justify'
          dangerouslySetInnerHTML={{ __html: MAIN_DATA.ABOUT_ME }}
        />
        <div
          className={classNames(
            'mx-auto my-10 flex items-center justify-center max-w-3xl w-full',
            animator({ name: 'fadeIn', delay: '1s' })
          )}
        >
          <Slider />
        </div>
      </div>
    </PageContainer>
  );
}
