import { render, screen } from '@testing-library/react';

import { PageHeader } from './index';

describe('<PageHeader />', () => {
  it('renders the title', () => {
    render(<PageHeader title="My Title" description="Some description" />);
    expect(screen.getByRole('heading', { name: /my title/i })).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<PageHeader title="Title" description="A description text" />);
    expect(screen.getByText('A description text')).toBeInTheDocument();
  });

  it('does not render a description paragraph when description is empty', () => {
    const { container } = render(<PageHeader title="Title" description="" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders HTML in title via dangerouslySetInnerHTML', () => {
    render(<PageHeader title="<em>Bold</em> Title" description="" />);
    expect(document.querySelector('em')).toBeInTheDocument();
    expect(screen.getByText('Bold')).toBeInTheDocument();
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <PageHeader title="T" description="D" className="custom-wrapper" />
    );
    expect(container.firstChild).toHaveClass('custom-wrapper');
  });

  it('applies descriptionClassName to the description', () => {
    render(<PageHeader title="T" description="D" descriptionClassName="mb-10" />);
    expect(screen.getByText('D')).toHaveClass('mb-10');
  });
});
