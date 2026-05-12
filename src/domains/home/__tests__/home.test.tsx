import { render, screen } from '@testing-library/react';

import { HomePage } from '../index';

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

jest.mock('@/domains/home/components', () => ({
  HeroTextAnimator: () => <h1 data-testid="hero">Hero</h1>,
  Summary: () => <p data-testid="summary">Summary block</p>
}));

jest.mock('@/shared/components', () => ({
  ResumeDownloaderButton: () => (
    <button type="button" data-testid="resume-button">
      Download Resume
    </button>
  )
}));

describe('<HomePage />', () => {
  it('renders the hero, summary, and resume button', () => {
    render(<HomePage />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByTestId('resume-button')).toBeInTheDocument();
  });

  it('uses a <main> landmark', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
