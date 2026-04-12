import { render, screen } from '@testing-library/react';

import { PostAuthor } from '../components/post-author';

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

jest.mock('@/data', () => ({
  PERSONAL_DATA: { firstName: 'Ramin' }
}));

describe('<PostAuthor />', () => {
  it('renders the provided author name', () => {
    render(<PostAuthor author="Jane Doe" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('falls back to PERSONAL_DATA.firstName when author is empty', () => {
    render(<PostAuthor author="" />);
    expect(screen.getByText('Ramin')).toBeInTheDocument();
  });

  it('renders the author icon', () => {
    render(<PostAuthor author="Jane" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
