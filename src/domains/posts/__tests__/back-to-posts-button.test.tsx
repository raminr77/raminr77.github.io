import { render, screen } from '@testing-library/react';

import { BackToPostButton } from '../components/back-to-posts-button';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/constants', () => ({
  ROUTES: { POSTS: '/posts/' },
  GTM_EVENTS: { POST_CARD: (label: string) => label }
}));

describe('<BackToPostButton />', () => {
  it('renders a link', () => {
    render(<BackToPostButton />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('links to the posts list page', () => {
    render(<BackToPostButton />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts');
  });

  it('displays the label text', () => {
    render(<BackToPostButton />);
    expect(screen.getByText(/back to all posts/i)).toBeInTheDocument();
  });
});
