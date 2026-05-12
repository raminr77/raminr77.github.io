import { render, screen } from '@testing-library/react';

import { JourneyPage } from '../index';

jest.mock('@/shared/components', () => ({
  PageHeader: ({ title, description }: { title: string; description?: string }) => (
    <header>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  )
}));

jest.mock('../components', () => ({
  JourneyCard: ({
    data,
    order
  }: {
    data: { id: number; title: string };
    order: number;
  }) => (
    <article data-testid={`journey-card-${data.id}`} data-order={order}>
      {data.title}
    </article>
  ),
  JourneyScroller: ({ items }: { items: { id: number }[] }) => (
    <div data-testid="journey-scroller" data-count={items.length} />
  )
}));

describe('<JourneyPage />', () => {
  it('renders the page header with title and description', () => {
    render(<JourneyPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the journey scroller (desktop view)', () => {
    render(<JourneyPage />);
    expect(screen.getByTestId('journey-scroller')).toBeInTheDocument();
  });

  it('renders the same set of items in the mobile fallback list', () => {
    render(<JourneyPage />);
    const cards = screen.getAllByTestId(/^journey-card-/);
    expect(cards.length).toBeGreaterThan(0);
    const scroller = screen.getByTestId('journey-scroller');
    expect(Number(scroller.dataset.count)).toBe(cards.length);
  });
});
