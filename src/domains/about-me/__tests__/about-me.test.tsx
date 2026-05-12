import { render, screen } from '@testing-library/react';

import { AboutMePage } from '../index';

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

jest.mock('@/shared/components', () => ({
  ResumeDownloaderButton: () => (
    <button type="button" data-testid="resume-button">
      Download Resume
    </button>
  )
}));

jest.mock('@/layout/components', () => ({
  ContentContainer: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="content-container">{children}</main>
  )
}));

jest.mock('next/dynamic', () => () => {
  return function DynamicStub(props: { className?: string }) {
    return <div data-testid="dynamic-stub" className={props.className} />;
  };
});

jest.mock('../components', () => ({
  RecommendationsBox: () => <div data-testid="recommendations-box" />
}));

jest.mock('../helper', () => ({
  renderContent: (index: number) => (
    <div key={index} data-testid={`content-${index}`}>
      content {index}
    </div>
  )
}));

describe('<AboutMePage />', () => {
  it('renders the resume button and content container', () => {
    render(<AboutMePage />);
    expect(screen.getByTestId('content-container')).toBeInTheDocument();
    expect(screen.getByTestId('resume-button')).toBeInTheDocument();
  });

  it('renders at least one recommendations box or competition slot', () => {
    render(<AboutMePage />);
    expect(screen.getByTestId('recommendations-box')).toBeInTheDocument();
  });
});
