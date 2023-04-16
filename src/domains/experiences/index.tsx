import { PageContainer } from '@/app/layout/page-container';
import { EXPERIENCES_DATA } from '@/data/experiences';
import { animator } from '@/shared/utils/animator';
import { ExperienceItem } from './components/experience-item';

export function ExperiencesPage() {
  return (
    <PageContainer title='Experiences' className='select-none' animationName='fadeInUp'>
      <h3 className='font-title-bold text-2xl mb-4'>Experiences</h3>
      {EXPERIENCES_DATA.map((item) => (
        <ExperienceItem
          key={item.id}
          data={item}
          className={animator({ name: 'fadeIn', delay: '1s' })}
        />
      ))}
    </PageContainer>
  );
}
