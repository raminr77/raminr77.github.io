import { render, screen } from '@testing-library/react';

import { RecommendationsPage } from '../index';

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

jest.mock('@/shared/components', () => ({
  PageHeader: ({ title, description }: { title: string; description?: string }) => (
    <header>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  )
}));

jest.mock('@/layout/components', () => ({
  ContentContainer: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="content-container">{children}</main>
  )
}));

jest.mock('../components', () => ({
  RecommendationCard: ({ data }: { data: { id: number; fullName: string } }) => (
    <article data-testid={`recommendation-card-${data.id}`}>{data.fullName}</article>
  ),
  RecommendationsFooter: () => <footer data-testid="recommendations-footer" />
}));

describe('<RecommendationsPage />', () => {
  it('renders the heading, the recommendation cards, and the footer', () => {
    render(<RecommendationsPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('content-container')).toBeInTheDocument();
    expect(screen.getByTestId('recommendations-footer')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^recommendation-card-/).length).toBeGreaterThan(0);
  });
});
