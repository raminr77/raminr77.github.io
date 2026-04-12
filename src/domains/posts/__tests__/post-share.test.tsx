import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sendGTMEvent } from '@next/third-parties/google';
import { PostShare } from '../components/post-share';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

jest.mock('@/shared/helpers', () => ({
  notify: { success: jest.fn(), error: jest.fn() }
}));

jest.mock('@/shared/constants', () => ({
  GTM_EVENTS: { POST_CARD: (label: string) => label }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<PostShare />', () => {
  it('renders the Share button', () => {
    render(<PostShare postId={42} />);
    expect(screen.getByRole('button', { name: /share post/i })).toBeInTheDocument();
  });

  it('renders the "Share" label text', () => {
    render(<PostShare postId={42} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('fires a GTM event when the share button is clicked', async () => {
    const user = userEvent.setup();
    render(<PostShare postId={42} />);
    await user.click(screen.getByRole('button', { name: /share post/i }));
    expect(jest.mocked(sendGTMEvent)).toHaveBeenCalled();
  });

  it('renders the share icon', () => {
    render(<PostShare postId={42} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('has the correct aria-label and title', () => {
    render(<PostShare postId={42} />);
    const btn = screen.getByRole('button', { name: /share post/i });
    expect(btn).toHaveAttribute('aria-label', 'Share post');
    expect(btn).toHaveAttribute('title', 'Copy share link to clipboard');
  });
});
