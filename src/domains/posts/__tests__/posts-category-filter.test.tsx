import { render, screen } from '@testing-library/react';

import type { PostFilters } from '@/shared/types/post';

import { PostsCategoryFilter } from '../components/posts-category-filter';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      query: '',
      asPath: '',
      pathname: '',
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      push: jest.fn(),
      prefetch: jest.fn(() => null),
      beforePopState: jest.fn(() => null)
    };
  }
}));

describe('PostsCategoryFilter', () => {
  it('should render clear filter link with correct href', () => {
    const activeFilters: PostFilters = {
      tag: '',
      category: 'react'
    };

    render(
      <PostsCategoryFilter
        activeFilters={activeFilters}
        categories={['react', 'system']}
      />
    );

    const link = screen.getByTestId('clear-filter-link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/posts');
  });
});
