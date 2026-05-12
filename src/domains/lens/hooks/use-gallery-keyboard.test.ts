import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useGalleryKeyboard } from './use-gallery-keyboard';

function dispatchKey(key: string): void {
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key }));
  });
}

describe('useGalleryKeyboard', () => {
  it('invokes onClose on Escape', () => {
    const onClose = jest.fn();
    const onPrevious = jest.fn();
    const onNext = jest.fn();

    renderHook(() => useGalleryKeyboard({ onClose, onPrevious, onNext }));
    dispatchKey('Escape');

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onPrevious).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });

  it('invokes onPrevious on ArrowLeft and onNext on ArrowRight', () => {
    const onPrevious = jest.fn();
    const onNext = jest.fn();
    renderHook(() => useGalleryKeyboard({ onClose: jest.fn(), onPrevious, onNext }));

    dispatchKey('ArrowLeft');
    dispatchKey('ArrowRight');

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('ignores unrelated keys', () => {
    const handlers = { onClose: jest.fn(), onPrevious: jest.fn(), onNext: jest.fn() };
    renderHook(() => useGalleryKeyboard(handlers));

    dispatchKey('Enter');
    dispatchKey('Space');
    dispatchKey('a');

    expect(handlers.onClose).not.toHaveBeenCalled();
    expect(handlers.onPrevious).not.toHaveBeenCalled();
    expect(handlers.onNext).not.toHaveBeenCalled();
  });

  it('locks body scroll while mounted and restores the previous value on unmount', () => {
    document.body.style.overflow = 'auto';

    const { unmount } = renderHook(() =>
      useGalleryKeyboard({
        onClose: jest.fn(),
        onPrevious: jest.fn(),
        onNext: jest.fn()
      })
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('removes the keydown listener on unmount', () => {
    const onClose = jest.fn();
    const { unmount } = renderHook(() =>
      useGalleryKeyboard({ onClose, onPrevious: jest.fn(), onNext: jest.fn() })
    );

    unmount();
    dispatchKey('Escape');

    expect(onClose).not.toHaveBeenCalled();
  });
});
