import { renderHook, act } from '@testing-library/react';

import { useDebounce } from './use-debounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should debounce value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 300 }
      }
    );

    expect(result.current).toBe('a');

    rerender({ value: 'ab', delay: 300 });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ab');
  });
});
