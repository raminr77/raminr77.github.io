'use client';

import { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

import { useIsClient } from '@/shared/hooks';
import { animator } from '@/shared/helpers';
import type { LensItem } from '@/data';

import { LensGalleryModal } from '../lens-gallery-modal';

interface LensCardProps {
  data: LensItem;
  animationDelay?: number;
  disabledAnimation?: boolean;
}

export function LensCard({
  data,
  animationDelay = 1,
  disabledAnimation = false
}: LensCardProps) {
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = 1 + (data.slides?.length ?? 0);

  function handleOpen() {
    setCurrentIndex(0);
    setIsOpen(true);
  }

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        onClick={handleOpen}
        data-testid="lens-card"
        aria-label={`Open lens: ${data.title}`}
        style={{ animationDelay: `${animationDelay}s` }}
        onKeyDown={({ key }) => key === 'Enter' && handleOpen()}
        className={clsx(
          'cursor-pointer group relative aspect-square bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 border border-slate-300/40 overflow-hidden outline-none',
          !disabledAnimation && animator({ name: 'fadeIn' })
        )}
      >
        <Image
          fill
          quality={75}
          src={data.cover}
          draggable={false}
          fetchPriority="high"
          alt={data.alt || data.title}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 duration-300 transition-transform opacity-60 dark:opacity-70 group-hover:opacity-100"
        />

        <div className="text-white min-h-[200px] p-4 group-hover:pb-8 duration-300 flex flex-col justify-end gap-1 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent z-10">
          <h3 className="font-bold text-xl leading-tight">{data.title}</h3>
          <p className="text-md text-white/90 line-clamp-2">{data.description}</p>
          <span className="text-sm text-white/70 mt-1">
            {totalSlides} Items - {data.createdAt}
          </span>
        </div>
      </div>

      {isClient && isOpen && (
        <LensGalleryModal
          item={data}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
