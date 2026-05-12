import fs from 'fs';

import { getPostContent } from './get-post-content';

jest.mock('fs');
jest.mock('./constants', () => ({
  POST_FOLDER_PATH: '/mock/posts'
}));

const mockedFs = fs as jest.Mocked<typeof fs>;

describe('getPostContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('pads single-digit ids with leading zero (post-05.md)', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(
      '---\nid: 5\ntitle: Pad test\ndescription: d\n---\nbody'
    );

    const post = getPostContent(5);
    expect(mockedFs.existsSync).toHaveBeenCalledWith('/mock/posts/post-05.md');
    expect(mockedFs.readFileSync).toHaveBeenCalledWith('/mock/posts/post-05.md', 'utf-8');
    expect(post).toMatchObject({ id: 5, title: 'Pad test', content: 'body' });
  });

  it('does not pad two-digit ids (post-12.md)', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(
      '---\nid: 12\ntitle: Two digit\ndescription: d\n---\ncontent here'
    );

    const post = getPostContent(12);
    expect(mockedFs.existsSync).toHaveBeenCalledWith('/mock/posts/post-12.md');
    expect(post?.id).toBe(12);
    expect(post?.content).toBe('content here');
  });

  it('returns null when the file does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false);
    const post = getPostContent(99);
    expect(post).toBeNull();
    expect(mockedFs.readFileSync).not.toHaveBeenCalled();
  });

  it('returns parsed metadata together with content', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(
      '---\nid: 7\ntitle: Hello\nslug: hello\ntags:\n  - a\n  - b\n---\nthe body'
    );

    const post = getPostContent(7);
    expect(post).toEqual(
      expect.objectContaining({
        id: 7,
        title: 'Hello',
        slug: 'hello',
        tags: ['a', 'b'],
        content: 'the body'
      })
    );
  });
});
