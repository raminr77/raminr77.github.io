import { render, screen } from '@testing-library/react';

import { EmptyPostBlock } from '../components/empty-post-block';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/constants', () => ({
  ROUTES: { POSTS: '/posts/' },
  GTM_EVENTS: { CLEAR_FILTERS: 'clear_filters' }
}));

describe('<EmptyPostBlock />', () => {
  it('renders the "No posts found" heading', () => {
    render(<EmptyPostBlock hasFilter={false} />);
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  it('renders the descriptive message', () => {
    render(<EmptyPostBlock hasFilter={false} />);
    expect(
      screen.getByText(/no posts that match your search or filters/i)
    ).toBeInTheDocument();
  });

  it('shows the clear filter link when hasFilter is true', () => {
    render(<EmptyPostBlock hasFilter />);
    const link = screen.getByRole('link', { name: /clear your filter/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/posts');
  });

  it('hides the clear filter link when hasFilter is false', () => {
    render(<EmptyPostBlock hasFilter={false} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
