import classNames from 'classnames';
import { PageContainer } from '@/app/layout/page-container';
import { PROJECTS_DATA } from '@/data/projects';
import { animator } from '@/shared/utils/animator';
import { ProjectItem } from './components/project-item';

export function ProjectsPage() {
  return (
    <PageContainer title='Projects' className='select-none' animationName='fadeInUp'>
      <h3 className='font-title-bold text-2xl mb-4'>Projects</h3>
      <div
        className={classNames(
          'grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        {PROJECTS_DATA.map((item) => (
          <ProjectItem key={item.id} data={item} />
        ))}
      </div>
    </PageContainer>
  );
}
