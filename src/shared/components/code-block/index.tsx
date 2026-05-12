'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { clsx } from 'clsx';

import styles from './code-block.module.scss';

const COLLAPSE_THRESHOLD_PX = 480;
const COLLAPSED_MAX_HEIGHT_PX = 480;
const SCROLL_OFFSET_FROM_TOP = 200;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
}

interface CodeBlockProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Wraps a `<pre>` rendered by markdown-to-jsx and adds an expand / collapse toggle
 * for long code blocks. Short blocks (< 480px tall) render as a plain `<pre>`.
 */
export function CodeBlock({ className, children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const collapseRequestedRef = useRef(false);
  const preId = useId();
  const [shouldClip, setShouldClip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Measure once after layout, then watch for window resizes (font-size or layout shifts
  // can change the natural height of a code block). We measure the un-clipped height by
  // reading `scrollHeight`, which ignores the `max-height` we apply when clipped.
  useLayoutEffect(() => {
    const node = preRef.current;
    if (!node) return;

    const measure = (): void => {
      const naturalHeight = node.scrollHeight;
      setShouldClip(naturalHeight > COLLAPSE_THRESHOLD_PX);
    };

    measure();

    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // When the user collapses an expanded block, scroll its top into view so the next
  // few lines and the toggle button stay anchored under their cursor.
  useEffect(() => {
    if (isExpanded) return;
    if (!shouldClip) return;

    // Skip on the initial mount — only react to a transition from expanded → collapsed.
    if (!collapseRequestedRef.current) return;
    collapseRequestedRef.current = false;

    const node = preRef.current;
    if (!node) return;

    const top =
      node.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_FROM_TOP;
    window.scrollTo({
      top,
      behavior: isReducedMotion() ? 'auto' : 'smooth'
    });
  }, [isExpanded, shouldClip]);

  const handleToggle = (): void => {
    setIsExpanded((previous) => {
      const next = !previous;
      if (!next) collapseRequestedRef.current = true;
      return next;
    });
  };

  const showToggle = shouldClip;
  const isClipped = shouldClip && !isExpanded;
  const inlineMaxHeight = isClipped ? `${COLLAPSED_MAX_HEIGHT_PX}px` : undefined;

  return (
    <div className={styles['code-block']}>
      <pre
        ref={preRef}
        id={preId}
        style={{ maxHeight: inlineMaxHeight }}
        className={clsx(className, styles['code-block__pre'], {
          [styles['code-block__pre--clipped']]: isClipped
        })}
      >
        {children}
      </pre>

      {showToggle && (
        <button
          type="button"
          aria-controls={preId}
          aria-expanded={isExpanded}
          onClick={handleToggle}
          className={styles['code-block__toggle']}
        >
          {isExpanded ? 'Collapse Code' : 'Expand Code'}
        </button>
      )}
    </div>
  );
}
