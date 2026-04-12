import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Mock Activity so mode="hidden" actually unmounts children in tests
jest.mock('react', () => {
  const actual = jest.requireActual<typeof React>('react');
  return {
    ...actual,
    Activity: ({
      children,
      mode
    }: {
      children: React.ReactNode;
      mode: 'visible' | 'hidden';
    }) => (mode === 'visible' ? <>{children}</> : null)
  };
});

import { PostsSearch } from '../components/posts-search';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/components', () => ({
  TextInput: ({
    onChange,
    value,
    label
  }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    label: string;
  }) => (
    <input
      aria-label={label}
      value={value}
      onChange={onChange}
      data-testid="search-input"
    />
  ),
  Icons: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />
}));

jest.mock('@/shared/services', () => ({
  searchPosts: jest.fn()
}));

jest.mock('@/shared/constants', () => ({
  ROUTES: { POSTS: '/posts/' },
  GTM_EVENTS: {
    CLOSE_SEARCH_MODAL: 'close_search',
    SUBMIT_POST_SEARCH: (v: string) => v
  }
}));

jest.mock('react-dom', (): typeof import('react-dom') => ({
  ...jest.requireActual<typeof import('react-dom')>('react-dom'),
  createPortal: (node: React.ReactNode): React.ReactPortal => node as React.ReactPortal
}));

import { searchPosts } from '@/shared/services';
const mockSearchPosts = searchPosts as jest.Mock;

jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllMocks();
  mockSearchPosts.mockResolvedValue([]);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('<PostsSearch />', () => {
  it('renders the search button', () => {
    render(<PostsSearch />);
    expect(screen.getByRole('button', { name: /search posts/i })).toBeInTheDocument();
  });

  it('opens the search modal when the button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PostsSearch />);
    await user.click(screen.getByRole('button', { name: /search posts/i }));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('closes the modal with the close button', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PostsSearch />);
    await user.click(screen.getByRole('button', { name: /search posts/i }));
    await user.click(screen.getByRole('button', { name: /close search/i }));
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('closes the modal when Escape is pressed', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PostsSearch />);
    await user.click(screen.getByRole('button', { name: /search posts/i }));
    await user.keyboard('{Escape}');
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  it('calls searchPosts after the debounce delay', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PostsSearch />);
    await user.click(screen.getByRole('button', { name: /search posts/i }));
    await user.type(screen.getByTestId('search-input'), 'react');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    expect(mockSearchPosts).toHaveBeenCalledWith('react');
  });

  it('renders search results', async () => {
    mockSearchPosts.mockResolvedValue([
      {
        id: 1,
        title: 'React 101',
        slug: 'react-101',
        description: 'Intro to React',
        date: new Date('2025-01-01')
      }
    ]);
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PostsSearch />);
    await user.click(screen.getByRole('button', { name: /search posts/i }));
    await user.type(screen.getByTestId('search-input'), 'react');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    await act(async () => {});
    expect(screen.getByText('React 101')).toBeInTheDocument();
  });
});
