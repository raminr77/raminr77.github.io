import { renderHook } from '@testing-library/react';

import { useIsClient } from './use-is-client';

describe('useIsClient', () => {
  it('returns true after mount (window is defined in jsdom)', () => {
    // RTL wraps renders in act(), so effects flush synchronously — isClient is true immediately
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
