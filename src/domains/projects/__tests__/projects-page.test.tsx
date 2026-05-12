import { render, screen } from '@testing-library/react';

import { ProjectsPage } from '../index';

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

jest.mock('@/shared/components', () => {
  const PAGE_SIZE = 9;
  return {
    PAGE_SIZE,
    PageHeader: ({ title, description }: { title: string; description?: string }) => (
      <header>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
    ),
    Pagination: ({ page, totalPages }: { page: number; totalPages: number }) => (
      <nav data-testid="pagination" data-page={page} data-total={totalPages} />
    )
  };
});

jest.mock('@/layout/components', () => ({
  ContentContainer: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="content-container">{children}</main>
  )
}));

jest.mock('../components', () => ({
  ProjectCard: ({ data }: { data: { id: number; title: string } }) => (
    <article data-testid={`project-card-${data.id}`}>{data.title}</article>
  ),
  ProjectsFooter: () => <footer data-testid="projects-footer" />
}));

async function renderPage(page?: string) {
  const ui = await ProjectsPage({
    searchParams: Promise.resolve(page ? { page } : {})
  });
  return render(ui);
}

describe('<ProjectsPage />', () => {
  it('renders the header, project cards, pagination, and footer', async () => {
    await renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('content-container')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('projects-footer')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^project-card-/).length).toBeGreaterThan(0);
  });

  it('clamps the page parameter to the first page when invalid', async () => {
    await renderPage('not-a-number');
    expect(screen.getByTestId('pagination')).toHaveAttribute('data-page', '1');
  });

  it('clamps the page parameter to the last page when too high', async () => {
    await renderPage('9999');
    const pagination = screen.getByTestId('pagination');
    const total = Number(pagination.dataset.total);
    expect(Number(pagination.dataset.page)).toBe(total);
  });
});
