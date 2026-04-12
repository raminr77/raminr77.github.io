import {
  generateFilteredPostUrl,
  readingTime,
  filterPostsByKey,
  postSorter,
  searchPosts
} from './utils';

import type { PostMetadata } from '@/shared/types/post';

jest.mock('@/shared/constants', () => ({
  ROUTES: { POSTS: '/posts/' }
}));

// ─── generateFilteredPostUrl ────────────────────────────────────────────────

describe('generateFilteredPostUrl', () => {
  it('generates url with category', () => {
    expect(generateFilteredPostUrl({ category: 'react' })).toContain('category=react');
  });

  it('generates url with tag and encodes spaces', () => {
    const url = generateFilteredPostUrl({ tag: 'system design' });
    expect(url).toMatch(/tag=system%20design|tag=system\+design/);
  });

  it('generates url with both category and tag', () => {
    const url = generateFilteredPostUrl({ category: 'react', tag: 'hooks' });
    expect(url).toContain('category=react');
    expect(url).toContain('tag=hooks');
  });

  it('returns base url when no filters given', () => {
    const url = generateFilteredPostUrl({});
    expect(url).toBeTruthy();
    expect(url.includes('?')).toBe(false);
  });
});

// ─── readingTime ─────────────────────────────────────────────────────────────

describe('readingTime', () => {
  it('returns 1 for a short text', () => {
    expect(readingTime('word '.repeat(100))).toBe(1);
  });

  it('returns the correct minute count for a longer text', () => {
    // 300 wpm baseline
    expect(readingTime('word '.repeat(600))).toBe(2);
  });

  it('rounds up to the next minute', () => {
    // 301 words → ceil(301/300) = 2
    expect(readingTime('word '.repeat(301))).toBe(2);
  });

  it('handles an empty string without throwing', () => {
    expect(readingTime('')).toBe(1);
  });
});

// ─── filterPostsByKey ─────────────────────────────────────────────────────────

const makePost = (overrides: Partial<PostMetadata> = {}): PostMetadata => ({
  id: 1,
  slug: 'test',
  title: 'Test',
  description: 'desc',
  isActive: true,
  tags: ['hooks', 'react'],
  category: 'react',
  date: new Date('2025-01-01'),
  author: 'Ramin',
  ...overrides
});

describe('filterPostsByKey', () => {
  it('returns true when no filter is provided', () => {
    expect(filterPostsByKey(makePost(), null)).toBe(true);
  });

  it('filters by tag correctly', () => {
    expect(
      filterPostsByKey(makePost({ tags: ['hooks'] }), { tag: 'hooks', category: '' })
    ).toBe(true);
    expect(
      filterPostsByKey(makePost({ tags: ['hooks'] }), { tag: 'design', category: '' })
    ).toBe(false);
  });

  it('filters by category when no tag is given', () => {
    expect(
      filterPostsByKey(makePost({ category: 'system' }), { tag: '', category: 'system' })
    ).toBe(true);
    expect(
      filterPostsByKey(makePost({ category: 'react' }), { tag: '', category: 'system' })
    ).toBe(false);
  });
});

// ─── postSorter ───────────────────────────────────────────────────────────────

describe('postSorter', () => {
  it('sorts newer post first (returns negative number)', () => {
    const newer = makePost({ date: new Date('2025-06-01') });
    const older = makePost({ date: new Date('2024-01-01') });
    expect(postSorter(newer, older)).toBeLessThan(0);
  });

  it('sorts older post after newer (returns positive number)', () => {
    const newer = makePost({ date: new Date('2025-06-01') });
    const older = makePost({ date: new Date('2024-01-01') });
    expect(postSorter(older, newer)).toBeGreaterThan(0);
  });

  it('returns 0 for equal dates', () => {
    const a = makePost({ date: new Date('2025-01-01') });
    const b = makePost({ date: new Date('2025-01-01') });
    expect(postSorter(a, b)).toBe(0);
  });
});

// ─── searchPosts (util fn) ───────────────────────────────────────────────────

describe('searchPosts (local util)', () => {
  it('returns true when no search value given', () => {
    expect(searchPosts(makePost(), null)).toBe(true);
  });

  it('matches on title (case-insensitive)', () => {
    const post = makePost({ title: 'React Hooks Guide' });
    expect(searchPosts(post, 'react hooks')).toBe(true);
    expect(searchPosts(post, 'REACT')).toBe(true);
  });

  it('matches on description', () => {
    const post = makePost({ description: 'A deep dive into performance' });
    expect(searchPosts(post, 'performance')).toBe(true);
  });

  it('matches on tags', () => {
    const post = makePost({ tags: ['typescript', 'generics'] });
    expect(searchPosts(post, 'typescript')).toBe(true);
  });

  it('matches on category', () => {
    const post = makePost({ category: 'system-design' });
    expect(searchPosts(post, 'system')).toBe(true);
  });

  it('returns false when nothing matches', () => {
    const post = makePost({
      title: 'React',
      description: 'About React',
      tags: ['react'],
      category: 'react'
    });
    expect(searchPosts(post, 'kubernetes')).toBe(false);
  });
});
