import { PageContainer } from '@/app/layout/page-container';
import { MAIN_DATA } from '@/data';

export function AboutMePage() {
  return (
    <PageContainer title='About' animationName='slideInUp'>
      <div className='w-10/12 mx-auto mt-5 select-none'>
        <h3 className='font-title-bold text-2xl mb-3'>About {MAIN_DATA.FIRST_NAME}</h3>
        <div
          className='leading-7 text-justify'
          dangerouslySetInnerHTML={{ __html: MAIN_DATA.ABOUT_ME }}
        />
      </div>
    </PageContainer>
  );
}
