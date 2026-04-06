'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { clsx } from 'clsx';

import type { LensItem, LensSlideItem } from '@/data';
import { Icons } from '@/shared/components/icons';

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
  const allSlides: Slide[] = [
    { src: item.src, alt: item.alt, isVideo: item.isVideo, cover: item.cover },
    ...(item.slides ?? [])
  ];

  const total = allSlides.length;
  const current = allSlides[currentIndex];

  const prev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const next = useCallback(() => {
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return createPortal(
    <div
      role="dialog"
      onClick={onClose}
      aria-modal="true"
      aria-label={`Gallery: ${item.title}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
    >
      {/* Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent"
      >
        <div className="text-white">
          <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
          <span className="text-sm text-white/50">
            {currentIndex + 1} / {total}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors outline-none"
        >
          <Icons name="close" size={24} />
        </button>
      </div>

      {/* Main media */}
      <div
        onClick={(event) => event.stopPropagation()}
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

        <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
          {current.isVideo ? (
            <video
              key={currentIndex}
              controls
              autoPlay
              playsInline
              poster={current.cover}
              className="max-h-[70vh] w-auto rounded-sm select-none"
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
              className="object-contain max-h-[70vh] w-auto rounded-sm select-none"
            />
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

      {/* Footer: description + thumbnails */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent"
      >
        {item.description && (
          <p className="text-lg mb-2 text-center max-w-2xl leading-relaxed">
            {item.description}
          </p>
        )}

        {total > 1 && (
          <div className="flex items-center justify-center gap-1 overflow-x-auto w-full">
            {allSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                aria-label={`Go to slide ${index + 1}`}
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
                  src={slide.cover}
                  alt={slide.alt}
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
    </div>,
    document.body
  );
}
