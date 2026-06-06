'use client';

import type { CSSProperties } from 'react';
import { useId, useState } from 'react';

import Image from 'next/image';
import { clsx } from 'clsx';

import styles from './before-after-slider.module.scss';

interface BeforeAfterSliderProps {
  afterSrc: string;
  afterAlt: string;
  beforeSrc: string;
  beforeAlt: string;
  className?: string;
  afterLabel?: string;
  beforeLabel?: string;
}

const INITIAL_POSITION = 50;

export function BeforeAfterSlider({
  afterSrc,
  afterAlt,
  beforeSrc,
  beforeAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className
}: BeforeAfterSliderProps) {
  const labelId = useId();
  const [position, setPosition] = useState<number>(INITIAL_POSITION);

  return (
    <figure
      className={clsx(styles['slider'], className)}
      style={{ '--position': `${position}%` } as CSSProperties}
    >
      <Image
        fill
        alt={afterAlt}
        src={afterSrc}
        className={styles['slider__image']}
        sizes="(max-width: 768px) 100vw, 800px"
      />
      <span className={clsx(styles['slider__tag'], styles['slider__tag--after'])}>
        {afterLabel}
      </span>

      <div className={styles['slider__before']}>
        <Image
          fill
          src={beforeSrc}
          alt={beforeAlt}
          className={styles['slider__image']}
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <span className={clsx(styles['slider__tag'], styles['slider__tag--before'])}>
          {beforeLabel}
        </span>
      </div>

      <div className={styles['slider__handle']} aria-hidden="true">
        <span className={styles['slider__grip']} />
      </div>

      <input
        min={0}
        max={100}
        type="range"
        value={position}
        aria-labelledby={labelId}
        className={styles['slider__range']}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
      <span id={labelId} className="sr-only">
        Drag to compare {beforeLabel} and {afterLabel}
      </span>
    </figure>
  );
}
