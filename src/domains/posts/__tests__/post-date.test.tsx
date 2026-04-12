import { render, screen } from '@testing-library/react';

import { PostDate } from '../components/post-date';

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

describe('<PostDate />', () => {
  it('renders a formatted date', () => {
    render(<PostDate date={new Date('2025-03-15')} />);
    expect(screen.getByText('March 15, 2025')).toBeInTheDocument();
  });

  it('renders the date icon', () => {
    render(<PostDate date={new Date('2025-01-01')} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('formats different months correctly', () => {
    render(<PostDate date={new Date('2024-12-25')} />);
    expect(screen.getByText('December 25, 2024')).toBeInTheDocument();
  });
});
