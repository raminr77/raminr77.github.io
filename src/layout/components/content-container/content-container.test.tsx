import { render, screen } from '@testing-library/react';

import { ContentContainer } from './index';

jest.mock('@/shared/helpers', () => ({
  animator: ({ name }: { name: string }) => `animator-${name}`
}));

describe('<ContentContainer />', () => {
  it('renders children inside a <main> landmark', () => {
    render(
      <ContentContainer>
        <p data-testid="child">child content</p>
      </ContentContainer>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies the default fadeIn animator class to the inner wrapper', () => {
    const { container } = render(
      <ContentContainer>
        <span />
      </ContentContainer>
    );

    const inner = container.querySelector('main > div');
    expect(inner?.className).toContain('animator-fadeIn');
  });

  it('respects a custom animationName prop', () => {
    const { container } = render(
      <ContentContainer animationName="zoomIn">
        <span />
      </ContentContainer>
    );

    const inner = container.querySelector('main > div');
    expect(inner?.className).toContain('animator-zoomIn');
  });

  it('forwards className to the inner wrapper', () => {
    const { container } = render(
      <ContentContainer className="extra-class">
        <span />
      </ContentContainer>
    );

    const inner = container.querySelector('main > div');
    expect(inner?.className).toContain('extra-class');
  });
});
