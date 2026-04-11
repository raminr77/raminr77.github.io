import type { Metadata } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';

import { ProjectCard } from '@/domains/projects/components/project-card';
import { ContentContainer } from '@/layout/components/content-container';
import { Pagination, PAGE_SIZE } from '@/shared/components/pagination';
import { PageHeader } from '@/shared/components/page-header';
import { PROJECTS_DATA, type ProjectItem } from '@/data';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';

export const metadata: Metadata = {
  title: 'Projects'
};

// Sorted by id descending so the highest id (most recently added) appears first
const SORTED_PROJECTS = [...PROJECTS_DATA.items].sort((a, b) => b.id - a.id);

interface ProjectsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const totalPages = Math.ceil(SORTED_PROJECTS.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const projects = SORTED_PROJECTS.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <ContentContainer>
      <PageHeader title={PROJECTS_DATA.title} description={PROJECTS_DATA.description} />

      <div className="mt-8 grid grid-cols-3 gap-4 overflow-hidden max-lg:grid-cols-2 max-md:grid-cols-1">
        {projects.map((item: ProjectItem, index: number) => (
          <ProjectCard key={item.id} data={item} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>

      <Pagination page={safePage} totalPages={totalPages} basePath={ROUTES.PROJECTS} />

      <div
        className={clsx(
          'mt-10 flex flex-col items-center justify-center gap-3 pt-4',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        <p>{PROJECTS_DATA.footer}</p>
        <Link
          href={PROJECTS_DATA.footerActionURL}
          className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8"
        >
          {PROJECTS_DATA.footerActionLabel}
        </Link>
      </div>
    </ContentContainer>
  );
}
