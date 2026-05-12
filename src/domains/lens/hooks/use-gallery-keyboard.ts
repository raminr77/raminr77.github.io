import { useEffect } from 'react';

interface GalleryKeyboardHandlers {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Wires up keyboard navigation for the lens gallery modal and locks page scroll
 * while it is mounted. Releases both on unmount.
 */
export function useGalleryKeyboard({
  onClose,
  onPrevious,
  onNext
}: GalleryKeyboardHandlers): void {
  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent): void => {
      if (keyboardEvent.key === 'Escape') onClose();
      if (keyboardEvent.key === 'ArrowLeft') onPrevious();
      if (keyboardEvent.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrevious, onNext]);
}
