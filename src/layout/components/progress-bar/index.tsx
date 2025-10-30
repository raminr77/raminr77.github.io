'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import styles from './progress-bar.module.scss';

type ProgressBarProps = {
  color?: string;
  height?: number;
  easeRate?: number;
  className?: string;
  finishDelay?: number;
  startOnClick?: boolean;
  startPosition?: number;
  completeEaseRate?: number;
  nearCompleteTarget?: number;
};

export function ProgressBar({
  className,
  height = 1,
  easeRate = 0.06,
  color = '#ff8f00',
  finishDelay = 200,
  startOnClick = true,
  startPosition = 0.2,
  completeEaseRate = 0.15,
  nearCompleteTarget = 0.9
}: ProgressBarProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const pegRef = useRef<HTMLDivElement | null>(null);

  const progressRef = useRef(0); // 0..1
  const startedRef = useRef(false);
  const animIdRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cancelRAF = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const clearTimers = () => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const applyProgress = (p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    if (barRef.current) barRef.current.style.transform = `scaleX(${clamped})`;
    if (pegRef.current) {
      const fadeStart = 0.985;
      const opacity =
        clamped < fadeStart
          ? 1
          : Math.max(0, 1 - (clamped - fadeStart) / (1 - fadeStart));
      pegRef.current.style.opacity = `${opacity}`;
    }
  };

  const animateTo = (target: number, rate: number) => {
    cancelRAF();
    const myAnimId = ++animIdRef.current;
    const tick = () => {
      if (myAnimId !== animIdRef.current) return;

      const current = progressRef.current;
      const delta = target - current;
      const next = current + delta * rate;
      progressRef.current = next;
      applyProgress(next);

      if (Math.abs(delta) > 0.002) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = target;
        applyProgress(target);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    clearTimers();
    cancelRAF();
    ++animIdRef.current;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      progressRef.current = 1;
      applyProgress(1);
      return;
    }

    setIsVisible(true);
    progressRef.current = startPosition;
    applyProgress(progressRef.current);
    animateTo(nearCompleteTarget, easeRate);
  };

  const finish = () => {
    clearTimers();
    cancelRAF();
    ++animIdRef.current;
    progressRef.current = 1;
    applyProgress(1);

    finishTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      hideTimerRef.current = setTimeout(() => {
        cancelRAF();
        ++animIdRef.current;
        progressRef.current = 0;
        applyProgress(0);
        startedRef.current = false;
      }, 300);
    }, finishDelay);
  };

  useEffect(() => {
    if (!startOnClick) return;

    const onClickCapture = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const aTag = target?.closest?.('a[href]') as HTMLAnchorElement | null;

      if (!aTag) return;
      if (event.defaultPrevented) return;
      if (aTag.target && aTag.target !== '_self') return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const from = new URL(window.location.href);
      const to = new URL(aTag.href, window.location.href);

      const sameOrigin = to.origin === from.origin;

      const samePathAndQuery =
        sameOrigin && to.pathname === from.pathname && to.search === from.search;

      if (samePathAndQuery) return;

      start();
    };

    document.addEventListener('click', onClickCapture, { capture: true });
    return () => document.removeEventListener('click', onClickCapture, { capture: true });
  }, [startOnClick, startPosition, nearCompleteTarget, easeRate]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--bar-color', color);
      containerRef.current.style.setProperty('--bar-height', `${height}px`);
    }

    if (!startedRef.current) start();

    clearTimers();
    finishTimerRef.current = setTimeout(finish, 0);

    return () => {
      cancelRAF();
      clearTimers();
    };
  }, [pathname, color, height, completeEaseRate, finishDelay]);

  return (
    <div
      aria-hidden
      ref={containerRef}
      className={clsx(
        styles['progress-bar__container'],
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div ref={barRef} className={styles['progress-bar__bar']} />
      <div ref={pegRef} className={styles['progress-bar__peg']} />
    </div>
  );
}
