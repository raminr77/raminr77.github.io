import { pageTitleGenerator } from './page-title-generator';

jest.mock('@/shared/constants', () => ({
  MENU_ITEM_ROUTES: [
    { id: 1, title: 'Home', url: '/' },
    { id: 2, title: 'Posts', url: '/posts/' },
    { id: 3, title: 'About Me', url: '/about-me/' }
  ]
}));

jest.mock('@/data', () => ({
  PERSONAL_DATA: { title: 'Software Engineer' }
}));

describe('pageTitleGenerator', () => {
  it('returns the page title for a known route', () => {
    expect(pageTitleGenerator('/')).toBe('Home');
    expect(pageTitleGenerator('/posts/')).toBe('Posts');
    expect(pageTitleGenerator('/about-me/')).toBe('About Me');
  });

  it('falls back to personal title for an unknown route', () => {
    expect(pageTitleGenerator('/unknown-page/')).toBe('Software Engineer');
  });

  it('falls back when given an empty string', () => {
    expect(pageTitleGenerator('')).toBe('Software Engineer');
  });
});
