import Link from 'next/link';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { PROJECTS_DATA, type ProjectItem, PERSONAL_DATA } from '@/data';
import { ContentContainer } from '@/layout/components/content-container';
import { ProjectCard } from '@/domains/projects/components/project-card';

export const metadata: Metadata = {
  title: `${PERSONAL_DATA.fullName} | Projects`,
};

export function ProjectsPage() {
  return (
    <ContentContainer>
      <h1
        className={clsx(
          'select-none text-center text-3xl font-bold',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
        dangerouslySetInnerHTML={{ __html: PROJECTS_DATA.title }}
      />
      <h3
        className={clsx(
          titleFont.className,
          'mt-4 select-none text-center text-xl',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
        dangerouslySetInnerHTML={{ __html: PROJECTS_DATA.description }}
      />

      <div className='mt-8 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1 overflow-hidden'>
        {PROJECTS_DATA.items.map((item: ProjectItem, index: number) => (
          <ProjectCard key={index} data={item} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>

      <div
        className={clsx(
          'bo mt-10 flex flex-col items-center justify-center gap-3 border-t border-dashed pt-5',
          animator({ name: 'fadeInUp', delay: '1s' })
        )}
      >
        <h4>{PROJECTS_DATA.footer}</h4>
        <Link
          href={PROJECTS_DATA.footerActionURL}
          className='border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8 hover:text-orange-500'
        >
          {PROJECTS_DATA.footerActionLabel}
        </Link>
      </div>
    </ContentContainer>
  );
}
