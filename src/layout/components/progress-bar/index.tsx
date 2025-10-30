'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import styles from './progress-bar.module.scss';

type ProgressBarProps = {
  color?: string;
  height?: number;
  className?: string;
  finishDelay?: number;
  startPosition?: number;
};

export function ProgressBar({
  className,
  height = 1,
  color = '#ff8f00',
  finishDelay = 200,
  startPosition = 0.2
}: ProgressBarProps) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
    setProgress(startPosition * 100);

    const increment = () => {
      setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
    };

    const interval = setInterval(increment, 200);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, finishDelay);
    }, 800);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, startPosition, finishDelay]);

  return (
    <div
      className={clsx(styles['progress-bar__container'], className)}
      style={
        {
          '--bar-color': color,
          '--bar-height': `${height}px`,
          '--bar-progress': `${progress}%`,
          opacity: isVisible ? 1 : 0
        } as React.CSSProperties
      }
    >
      <div className={styles['progress-bar__bar']} />
      <div className={styles['progress-bar__peg']} />
    </div>
  );
}
