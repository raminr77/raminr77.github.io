import { render, screen } from '@testing-library/react';

import { PostCategory } from '../components/post-category';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

jest.mock('@/shared/constants', () => ({
  GTM_EVENTS: { POST_CARD: (label: string) => label }
}));

jest.mock('@/shared/helpers/posts/utils', () => ({
  generateFilteredPostUrl: ({ category }: { category?: string }) =>
    `/posts/?category=${category}`
}));

describe('<PostCategory />', () => {
  it('renders the category name in uppercase', () => {
    render(<PostCategory category="react" />);
    expect(screen.getByText('REACT')).toBeInTheDocument();
  });

  it('renders a link to the category filter page', () => {
    render(<PostCategory category="typescript" />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/posts?category=typescript'
    );
  });

  it('does not show a label by default', () => {
    render(<PostCategory category="react" />);
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
  });

  it('shows a label when showLabel is true', () => {
    render(<PostCategory category="react" showLabel />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders the category icon', () => {
    render(<PostCategory category="react" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
