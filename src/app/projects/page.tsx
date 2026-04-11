import { ProjectsPage } from '@/domains/projects';

export { metadata } from '@/domains/projects';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default function Page({ searchParams }: Props) {
  return <ProjectsPage searchParams={searchParams} />;
}
