import { render, screen } from '@testing-library/react';

import { Pagination, PAGE_SIZE } from './index';

describe('PAGE_SIZE', () => {
  it('equals 9', () => {
    expect(PAGE_SIZE).toBe(9);
  });
});

describe('Pagination', () => {
  describe('visibility', () => {
    it('renders nothing when totalPages is 0', () => {
      const { container } = render(
        <Pagination page={1} totalPages={0} basePath="/posts" />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when totalPages is 1', () => {
      const { container } = render(
        <Pagination page={1} totalPages={1} basePath="/posts" />
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders a nav element when totalPages > 1', () => {
      render(<Pagination page={1} totalPages={3} basePath="/posts" />);
      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    });
  });

  describe('disabled states', () => {
    it('marks the previous button as disabled on the first page', () => {
      render(<Pagination page={1} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Previous page')).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });

    it('marks the next button as disabled on the last page', () => {
      render(<Pagination page={3} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Next page')).toHaveAttribute('aria-disabled', 'true');
    });

    it('neither prev nor next is disabled on a middle page', () => {
      render(<Pagination page={2} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Previous page')).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(screen.getByLabelText('Next page')).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
  });

  describe('accessibility', () => {
    it('marks the current page with aria-current="page"', () => {
      render(<Pagination page={2} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Page 2')).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark non-current pages with aria-current', () => {
      render(<Pagination page={2} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Page 1')).not.toHaveAttribute('aria-current');
      expect(screen.getByLabelText('Page 3')).not.toHaveAttribute('aria-current');
    });
  });

  describe('href generation', () => {
    it('page 1 link has a clean href without a page param', () => {
      render(<Pagination page={2} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Page 1')).toHaveAttribute('href', '/posts');
    });

    it('page > 1 link includes the page query param', () => {
      render(<Pagination page={1} totalPages={3} basePath="/posts" />);
      expect(screen.getByLabelText('Page 2')).toHaveAttribute('href', '/posts?page=2');
    });

    it('previous button links to page - 1', () => {
      render(<Pagination page={3} totalPages={5} basePath="/posts" />);
      expect(screen.getByLabelText('Previous page')).toHaveAttribute(
        'href',
        '/posts?page=2'
      );
    });

    it('next button links to page + 1', () => {
      render(<Pagination page={2} totalPages={5} basePath="/posts" />);
      expect(screen.getByLabelText('Next page')).toHaveAttribute('href', '/posts?page=3');
    });

    it('previous button on page 2 links to page 1 without page param', () => {
      render(<Pagination page={2} totalPages={5} basePath="/posts" />);
      expect(screen.getByLabelText('Previous page')).toHaveAttribute('href', '/posts');
    });
  });

  describe('searchParams preservation', () => {
    it('preserves existing search params in page hrefs', () => {
      render(
        <Pagination
          page={1}
          totalPages={3}
          basePath="/posts"
          searchParams={{ category: 'react' }}
        />
      );
      expect(screen.getByLabelText('Page 2')).toHaveAttribute(
        'href',
        '/posts?category=react&page=2'
      );
    });

    it('removes the page param for page 1 while preserving other params', () => {
      render(
        <Pagination
          page={2}
          totalPages={3}
          basePath="/posts"
          searchParams={{ category: 'react', page: '2' }}
        />
      );
      expect(screen.getByLabelText('Page 1')).toHaveAttribute(
        'href',
        '/posts?category=react'
      );
    });
  });

  describe('page number rendering', () => {
    it('renders all page numbers for small page counts (≤ 7)', () => {
      render(<Pagination page={1} totalPages={5} basePath="/posts" />);
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
      }
    });

    it('always renders the first and last page for large counts', () => {
      render(<Pagination page={5} totalPages={10} basePath="/posts" />);
      expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Page 10')).toBeInTheDocument();
    });

    it('renders ellipsis when current page is far from both ends', () => {
      render(<Pagination page={5} totalPages={10} basePath="/posts" />);
      expect(screen.getAllByText('…').length).toBeGreaterThanOrEqual(2);
    });

    it('renders no ellipsis when total pages are 7 or fewer', () => {
      render(<Pagination page={4} totalPages={7} basePath="/posts" />);
      expect(screen.queryByText('…')).not.toBeInTheDocument();
    });
  });
});
