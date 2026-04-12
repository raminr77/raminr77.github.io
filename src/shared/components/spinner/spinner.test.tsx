import { render } from '@testing-library/react';

import { Spinner } from './index';

describe('<Spinner />', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has aria-hidden to be decorative', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has the spin animation class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
  });
});
