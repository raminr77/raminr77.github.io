import { PageContainer } from '@/app/layout/page-container';
import { EDUCATIONS_DATA } from '@/data/educations';
import { EducationItemRow } from '@/domains/educations/components/education-item-row';
import { animator } from '@/shared/utils/animator';

export function EducationsPage() {
  return (
    <PageContainer title='Educations' className='select-none' animationName='fadeInUp'>
      <h3 className='font-title-bold text-2xl mb-4'>Educations</h3>
      {EDUCATIONS_DATA.map((item) => (
        <EducationItemRow
          data={item}
          key={item.id}
          className={animator({ name: 'fadeIn', delay: '1s' })}
        />
      ))}
    </PageContainer>
  );
}
