import { render, screen } from '@testing-library/react';

import { PostReadTime } from '../components/post-read-time';

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

describe('<PostReadTime />', () => {
  it('displays reading time in minutes', () => {
    // 300 words → 1 minute
    const words = 'word '.repeat(300);
    render(<PostReadTime words={words} />);
    expect(screen.getByText(/1 Minute/i)).toBeInTheDocument();
  });

  it('shows correct time for longer content', () => {
    // 600 words → 2 minutes
    const words = 'word '.repeat(600);
    render(<PostReadTime words={words} />);
    expect(screen.getByText(/2 Minute/i)).toBeInTheDocument();
  });

  it('renders the time icon', () => {
    render(<PostReadTime words="some text" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('includes "Reading Time" label', () => {
    render(<PostReadTime words="some text" />);
    expect(screen.getByText(/Reading Time/i)).toBeInTheDocument();
  });
});
