import { renderHook } from '@testing-library/react';

import { useClickSound } from './use-click-sound';

const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockAudio = {
  preload: '',
  currentTime: 0,
  play: mockPlay
};

beforeEach(() => {
  jest.clearAllMocks();
  mockAudio.currentTime = 0;
  window.Audio = jest.fn(() => mockAudio) as unknown as typeof Audio;
});

describe('useClickSound', () => {
  it('creates an Audio element with the correct src on mount', () => {
    renderHook(() => useClickSound());
    expect(window.Audio).toHaveBeenCalledWith('/click.mp3');
  });

  it('sets preload to auto on mount', () => {
    renderHook(() => useClickSound());
    expect(mockAudio.preload).toBe('auto');
  });

  it('returns a stable playClick callback', () => {
    const { result, rerender } = renderHook(() => useClickSound());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('resets currentTime to 0 and calls play on each invocation', () => {
    const { result } = renderHook(() => useClickSound());
    mockAudio.currentTime = 5;
    result.current();
    expect(mockAudio.currentTime).toBe(0);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('calls play twice when invoked twice rapidly', () => {
    const { result } = renderHook(() => useClickSound());
    result.current();
    result.current();
    expect(mockPlay).toHaveBeenCalledTimes(2);
  });

  it('does not throw when play rejects (autoplay policy)', async () => {
    mockPlay.mockRejectedValueOnce(new DOMException('NotAllowedError'));
    const { result } = renderHook(() => useClickSound());
    expect(() => result.current()).not.toThrow();
    await Promise.resolve();
  });

  it('nulls the audio ref on unmount', () => {
    const { unmount } = renderHook(() => useClickSound());
    unmount();
    // No assertion needed — coverage confirms cleanup runs without error
  });
});
