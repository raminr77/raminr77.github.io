import matter from 'gray-matter';
import fs from 'fs';

import type { PostFilters, PostMetadata } from '@/shared/types/post';
import { getPosts } from './get-posts';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  readFileSync: jest.fn()
}));

jest.mock('gray-matter', () => jest.fn());

jest.mock('./constants', () => ({
  POSTT_FOLTER_PATH: '/virtual/posts'
}));

jest.mock('@/data', () => ({
  PERSONAL_DATA: { firstName: 'Ramin' }
}));

type FsMock = {
  readdirSync: jest.Mock;
  readFileSync: jest.Mock;
};

const fsMock = fs as unknown as FsMock;
const matterMock = matter as unknown as jest.Mock;

function asMatter(data: Partial<PostMetadata>) {
  return { data };
}

describe('getPosts', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    fsMock.readdirSync.mockReturnValue(['a.md', 'b.md', 'c.md', 'not-a-post.txt']);

    fsMock.readFileSync.mockImplementation((path: string) => `---\npath: ${path}\n---`);

    matterMock
      .mockReturnValueOnce(
        asMatter({
          id: 1,
          slug: 'a',
          title: 'A',
          isActive: true,
          tags: ['hooks'],
          category: 'react',
          date: new Date('2025-01-10')
        })
      )
      .mockReturnValueOnce(
        asMatter({
          id: 2,
          slug: 'b',
          title: 'B',
          isActive: false, // should be filtered out
          tags: ['hooks'],
          category: 'react',
          date: new Date('2025-01-11')
        })
      )
      .mockReturnValueOnce(
        asMatter({
          id: 3,
          slug: 'c',
          title: 'C',
          isActive: true,
          tags: ['design'],
          category: 'system',
          date: new Date('2024-12-31')
        })
      );
  });

  it('should return only active posts', () => {
    const res = getPosts();

    expect(res.data.every((p) => p.isActive)).toBe(true);
    expect(res.data.find((p) => p.id === 2)).toBeUndefined();
  });

  it('should filter by category', () => {
    const res = getPosts({ category: 'react' } as PostFilters);

    expect(res.data.length).toBe(1);
    expect(res.data[0].category).toBe('react');
    expect(res.data[0].id).toBe(1);
  });

  it('should filter by tag', () => {
    const res = getPosts({ tag: 'design' } as PostFilters);

    expect(res.data.length).toBe(1);
    expect(res.data[0].tags.includes('design')).toBe(true);
    expect(res.data[0].id).toBe(3);
  });

  it('should return categories list from active posts', () => {
    const res = getPosts();

    expect(res.categories.sort()).toEqual(['react', 'system'].sort());
  });

  it('should sort by date desc', () => {
    const res = getPosts();

    const times = res.data.map((p) => {
      const d = p.date instanceof Date ? p.date : new Date(p.date);
      return d.getTime();
    });

    for (let i = 1; i < times.length; i++) {
      expect(times[i - 1]).toBeGreaterThanOrEqual(times[i]);
    }
  });

  it('should use default author from PERSONAL_DATA when author missing', () => {
    const res = getPosts();
    const a = res.data.find((p) => p.id === 1);
    expect(a?.author).toBe('Ramin');
  });
});
