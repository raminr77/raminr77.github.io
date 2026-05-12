/**
 * @jest-environment node
 */
import { GET } from './route';

jest.mock('@/shared/helpers/posts/get-posts', () => ({
  getPosts: jest.fn()
}));

import { getPosts } from '@/shared/helpers/posts/get-posts';

const mockedGetPosts = jest.mocked(getPosts);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/posts/search', () => {
  it('returns posts data with success=true on a normal query', async () => {
    mockedGetPosts.mockReturnValue({
      categories: ['News'],
      data: [{ id: 1, title: 'Hello' }] as never
    });

    const response = GET(new Request('https://example.test/api/posts/search?q=hello'));
    const body = (await response.json()) as {
      success: boolean;
      data: { id: number }[];
    };

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([{ id: 1, title: 'Hello' }]);
    expect(mockedGetPosts).toHaveBeenCalledWith(null, 'hello');
  });

  it('treats an empty q as empty search value', () => {
    mockedGetPosts.mockReturnValue({ categories: [], data: [] });

    const response = GET(new Request('https://example.test/api/posts/search'));
    expect(response.status).toBe(200);
    expect(mockedGetPosts).toHaveBeenCalledWith(null, '');
  });

  it('returns 500 when getPosts throws', async () => {
    mockedGetPosts.mockImplementation(() => {
      throw new Error('boom');
    });

    const response = GET(new Request('https://example.test/api/posts/search?q=anything'));
    const body = (await response.json()) as { success: boolean; message: string };

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.message).toMatch(/error/i);
  });
});
