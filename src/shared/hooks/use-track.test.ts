import { renderHook } from '@testing-library/react';

import { sendGTMEvent } from '@next/third-parties/google';

import { useTrack } from './use-track';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

const mockedSend = jest.mocked(sendGTMEvent);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useTrack', () => {
  it('returns a callback that fires the GTM event with the provided payload', () => {
    const payload = { event: 'click', label: 'home' };
    const { result } = renderHook(() => useTrack(payload));

    result.current();
    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(payload);
  });

  it('returns a stable callback reference when payload is unchanged', () => {
    const payload = { event: 'click' };
    const { result, rerender } = renderHook(() => useTrack(payload));

    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
