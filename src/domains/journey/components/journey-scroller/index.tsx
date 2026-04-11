'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { JourneyItem } from '@/data/journey';

import { JourneyCard } from '../journey-card';

interface JourneyScrollerProps {
  items: JourneyItem[];
}

export function JourneyScroller({ items }: JourneyScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const syncActive = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const visibleCenter = container.scrollTop + container.clientHeight / 2;

    let closest = 0;
    let closestDist = Infinity;

    slotRefs.current.forEach((slot, i) => {
      if (!slot) return;
      const dist = Math.abs(visibleCenter - (slot.offsetTop + slot.clientHeight / 2));
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(syncActive);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    syncActive();

    return () => {
      container.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [syncActive]);

  return (
    <div className="relative w-full">
      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="h-[80dvh] overflow-y-scroll pt-[10dvh] [scroll-padding-top:10dvh] [scroll-snap-type:y_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const distance = Math.abs(index - activeIndex);
          const isActive = distance === 0;
          const opacity = isActive ? 1 : Math.max(0.2, 1 - distance * 0.35);
          const scale = isActive ? 1 : Math.max(0.93, 1 - distance * 0.025);

          return (
            <div
              key={item.id}
              ref={(element) => {
                slotRefs.current[index] = element;
              }}
              className="flex h-[60dvh] items-start [scroll-snap-align:start]"
            >
              <div
                className="w-full transition-all duration-700 ease-in-out"
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                <JourneyCard data={item} order={index + 1} disableAnimation />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[20dvh] bg-gradient-to-t dark:from-black from-white to-transparent"
      />
    </div>
  );
}
