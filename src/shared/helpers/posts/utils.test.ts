import { generateFilteredPostUrl } from './utils';

describe('posts utils', () => {
  it('should generate url with category', () => {
    const url = generateFilteredPostUrl({ category: 'react' });
    expect(url).toContain('category=react');
  });

  it('should generate url with tag and encode', () => {
    const url = generateFilteredPostUrl({ tag: 'system design' });
    expect(url).toMatch(/tag=system%20design|tag=system\+design/);
  });

  it('should generate url with both category and tag', () => {
    const url = generateFilteredPostUrl({ category: 'react', tag: 'hooks' });
    expect(url).toContain('category=react');
    expect(url).toContain('tag=hooks');
  });

  it('should return base url when no filters', () => {
    const url = generateFilteredPostUrl({});
    expect(url).toBeTruthy();
    expect(url.includes('?')).toBe(false);
  });
});
