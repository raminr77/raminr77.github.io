import { render, screen } from '@testing-library/react';

import type { PostMetadata } from '@/shared/types/post';

import { PostCard } from '../components/post-card';

jest.mock('@/domains/posts/components/post-tags', () => ({
  PostTags: ({ tags }: { tags: string[] }) => (
    <div>
      {tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}));

jest.mock('@/shared/components', () => ({
  Icons: () => <span data-testid="icon" />
}));

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/constants', () => ({
  ROUTES: { POSTS: '/posts/' },
  GTM_EVENTS: { POST_CARD: (label: string) => label }
}));

const basePost: PostMetadata = {
  id: 7,
  slug: 'react-guide',
  title: 'React Guide',
  description: 'A comprehensive guide to React.',
  isActive: true,
  tags: ['react', 'hooks'],
  category: 'react',
  date: new Date('2025-01-15'),
  author: 'Ramin'
};

describe('<PostCard />', () => {
  it('renders the post title as a link', () => {
    render(<PostCard data={basePost} />);
    expect(screen.getByRole('link', { name: /react guide/i })).toBeInTheDocument();
  });

  it('links to the correct post detail URL', () => {
    render(<PostCard data={basePost} />);
    const link = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('/posts/7'));
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', '/posts/7?slug=react-guide');
  });

  it('renders a truncated description when over 210 chars', () => {
    const longDesc = 'a'.repeat(300);
    render(<PostCard data={{ ...basePost, description: longDesc }} />);
    expect(screen.getByText(/\.{3}$/)).toBeInTheDocument();
  });

  it('renders full description when under 210 chars', () => {
    render(<PostCard data={basePost} />);
    expect(screen.getByText(basePost.description)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard data={basePost} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('hooks')).toBeInTheDocument();
  });

  it('renders null when post is not active', () => {
    const { container } = render(<PostCard data={{ ...basePost, isActive: false }} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "Read More" link', () => {
    render(<PostCard data={basePost} />);
    expect(screen.getByText(/read more/i)).toBeInTheDocument();
  });
});
