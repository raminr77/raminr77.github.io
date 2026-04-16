'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { JourneyItem } from '@/data/journey';

import { JourneyCard } from '../journey-card';

interface JourneyScrollerProps {
  items: JourneyItem[];
}

const PARTICLE_COUNT = 20;
const PARTICLE_COLOR = 'rgb(245, 158, 11)'; // amber-500

function spawnParticles(element: HTMLElement): void {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 260;
    const x = rect.left + Math.random() * rect.width;

    const driftX = (Math.random() - 0.5) * 20;
    const riseY = -(90 + Math.random() * 90);
    const size = 4 + Math.random() * 4;

    const particle = document.createElement('div');

    Object.assign(particle.style, {
      top: `${y}px`,
      zIndex: '9999',
      left: `${x}px`,
      position: 'fixed',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      pointerEvents: 'none',
      background: PARTICLE_COLOR
    });

    document.body.appendChild(particle);

    const animation = particle.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: '1' },
        { transform: `translate(${driftX}px, ${riseY}px) scale(0)`, opacity: '0' }
      ],
      {
        duration: 700 + Math.random() * 2000,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );

    animation.onfinish = () => particle.remove();
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function JourneyScroller({ items }: JourneyScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const rafRef = useRef<number>(0);
  const prevActiveRef = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerDivRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Trigger effects only when active item actually changes
  useEffect(() => {
    if (prevActiveRef.current === activeIndex) return;
    prevActiveRef.current = activeIndex;

    const element = innerDivRefs.current[activeIndex];
    if (!element) return;

    spawnParticles(element);
  }, [activeIndex]);

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
          const opacity = isActive ? 1 : Math.max(0.2, 1 - distance * 0.8);

          return (
            <div
              key={item.id}
              ref={(outerElement) => {
                slotRefs.current[index] = outerElement;
              }}
              className="flex h-[60dvh] items-start [scroll-snap-align:start]"
            >
              {/* Outer div: transition */}
              <div
                className="w-full transition-all duration-700 ease-in-out"
                style={{
                  opacity,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                {/* Inner div: particle container */}
                <div
                  className="relative w-full"
                  ref={(innerElement) => {
                    innerDivRefs.current[index] = innerElement;
                  }}
                >
                  <JourneyCard data={item} order={index + 1} disableAnimation />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
