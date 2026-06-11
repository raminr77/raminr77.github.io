'use client';

import { useEffect, useCallback, useState, type MouseEvent } from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { clsx } from 'clsx';

import { sendGTMEvent } from '@next/third-parties/google';

import type { LensItem, LensSlideItem } from '@/data';
import { GTM_EVENTS } from '@/shared/constants';
import { Icons } from '@/shared/components';

import { useGalleryKeyboard } from '../../hooks/use-gallery-keyboard';
import { getLensLayoutId } from '../../constants';

const ZOOM_TRANSITION: Transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

type Slide = Pick<LensSlideItem, 'src' | 'alt' | 'isVideo' | 'cover'>;

interface LensGalleryModalProps {
  item: LensItem;
  onClose: () => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function LensGalleryModal({
  item,
  onClose,
  onNavigate,
  currentIndex
}: LensGalleryModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const layoutId = shouldReduceMotion ? undefined : getLensLayoutId(item.id);

  const allSlides: Slide[] = [
    { src: item.src, alt: item.alt, isVideo: item.isVideo, cover: item.cover },
    ...(item.slides ?? [])
  ];

  const total = allSlides.length;
  const current = allSlides[currentIndex];

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const prev = useCallback(() => {
    sendGTMEvent(GTM_EVENTS.LENS_NAVIGATION('previous'));
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const next = useCallback(() => {
    sendGTMEvent(GTM_EVENTS.LENS_NAVIGATION('next'));
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  const handleClose = useCallback(() => {
    sendGTMEvent(GTM_EVENTS.LENS_MODAL_CLOSE);
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleThumbnailClick = useCallback(
    (index: number) => {
      sendGTMEvent(GTM_EVENTS.LENS_THUMBNAIL(index + 1));
      onNavigate(index);
    },
    [onNavigate]
  );

  useGalleryKeyboard({ onClose: handleClose, onPrevious: prev, onNext: next });

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleBackdropClick}
      aria-label={`Gallery: ${item.title}`}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
    >
      {/* Header */}
      <div
        onClick={handleBackdropClick}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent"
      >
        <div className="text-white">
          <h3 data-testid="lens-item-title" className="font-bold text-lg leading-tight">
            {item.title}
          </h3>
          <span className="text-sm text-white/50">
            {currentIndex + 1} / {total}
          </span>
        </div>
        <button
          aria-label="Close"
          onClick={handleClose}
          data-testid="close-button"
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors outline-none"
        >
          <Icons name="close" size={24} />
        </button>
      </div>

      {/* Main media */}
      <div
        onClick={handleBackdropClick}
        className="relative flex items-center justify-center w-full flex-1 px-16 py-20"
      >
        {total > 1 && (
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors outline-none z-10"
          >
            <Icons name="arrow-left" size={28} />
          </button>
        )}

        <div
          onClick={handleBackdropClick}
          className="relative max-w-5xl w-full h-full flex flex-col items-center gap-4"
        >
          <div
            onClick={handleBackdropClick}
            className="relative flex-1 w-full flex items-center justify-center min-h-0"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              </div>
            )}

            <motion.div
              layoutId={layoutId}
              transition={shouldReduceMotion ? { duration: 0 } : ZOOM_TRANSITION}
              className="relative flex w-fit max-w-full items-center justify-center"
            >
              {current.isVideo ? (
                <video
                  controls
                  playsInline
                  autoPlay={false}
                  key={currentIndex}
                  poster={current.cover}
                  onLoadedData={() => setIsLoading(false)}
                  className="max-h-[65vh] w-auto rounded-sm select-none"
                >
                  <source src={current.src} />
                </video>
              ) : (
                <Image
                  priority
                  width={1400}
                  height={900}
                  quality={90}
                  src={current.src}
                  alt={current.alt}
                  draggable={false}
                  key={currentIndex}
                  onLoad={() => setIsLoading(false)}
                  className={clsx(
                    'object-contain max-h-[65vh] w-auto rounded-sm select-none transition-opacity duration-300',
                    isLoading ? 'opacity-0' : 'opacity-100'
                  )}
                />
              )}
            </motion.div>
          </div>

          {item.description && (
            <p
              data-testid="lens-item-description"
              className="shrink-0 text-lg mb-2 text-center max-w-2xl leading-relaxed"
            >
              {item.description}
            </p>
          )}
        </div>

        {total > 1 && (
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors outline-none z-10"
          >
            <Icons name="arrow-right" size={28} />
          </button>
        )}
      </div>

      {/* Footer: thumbnails */}
      <div
        onClick={handleBackdropClick}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent"
      >
        {total > 1 && (
          <div
            onClick={handleBackdropClick}
            className="flex items-center justify-center gap-1 overflow-x-auto w-full"
          >
            {allSlides.map((slide, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
                className={clsx(
                  'scale-75 duration-300 border-transparent relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all outline-none',
                  index === currentIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-50 hover:opacity-80'
                )}
              >
                <Image
                  fill
                  sizes="56px"
                  alt={slide.alt}
                  src={slide.cover}
                  className="object-cover"
                />
                {slide.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Icons name="play" size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
}
