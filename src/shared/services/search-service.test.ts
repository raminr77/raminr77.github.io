import { searchPosts } from './search-service';
import { notify } from '@/shared/helpers';

jest.mock('@/shared/helpers', () => ({
  notify: { error: jest.fn(), success: jest.fn() }
}));

jest.mock('@/shared/api/constants', () => ({
  ENDPOINTS: {
    searchPosts: (query: string) => `/api/posts/search?q=${encodeURIComponent(query)}`
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('searchPosts (service)', () => {
  it('returns post list on successful response', async () => {
    const posts = [{ id: 1, title: 'Test' }];
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, data: posts })
    });

    const result = await searchPosts('react');
    expect(result).toEqual(posts);
    expect(jest.mocked(notify.error)).not.toHaveBeenCalled();
  });

  it('returns empty array when data is undefined', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true })
    });

    const result = await searchPosts('react');
    expect(result).toEqual([]);
  });

  it('throws and notifies when success is false', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'Server error' })
    });

    await expect(searchPosts('react')).rejects.toThrow('Server error');
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('uses default error message when no message is provided', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false })
    });

    await expect(searchPosts('react')).rejects.toThrow(
      'We could not handle your request now!'
    );
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({
      message: 'We could not handle your request now!'
    });
  });

  it('encodes the query when building the URL', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, data: [] })
    });

    await searchPosts('system design');
    expect(jest.mocked(global.fetch)).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('system design')),
      expect.anything()
    );
  });
});
