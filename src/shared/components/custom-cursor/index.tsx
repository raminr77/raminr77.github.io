"use client"
import React, { useRef, useEffect } from 'react';

export function CustomCursor() {
  const dotCursorRef = useRef<HTMLDivElement | null>(null);
  const circleCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (circleCursorRef.current && dotCursorRef.current) {
      const dotCursorElement: HTMLDivElement = dotCursorRef.current;
      const circleCursorElement: HTMLDivElement = circleCursorRef.current;
      const handleMouseMove = (event: MouseEvent) => {
        if (!event.target) return;
        const positions = {
          dotX: event.clientX - dotCursorElement.offsetWidth / 2,
          dotY: event.clientY - dotCursorElement.offsetHeight / 2,
          circleX: event.clientX - circleCursorElement.offsetWidth / 2,
          circleY: event.clientY - circleCursorElement.offsetHeight / 2,
        };
        const circleKeyframes = {
          transform: `translate(${positions.circleX}px, ${positions.circleY}px) scale(1.2)`
        };
        const dotKeyframes = {
          transform: `translate(${positions.dotX}px, ${positions.dotY}px) scale(1.2)`
        };
        circleCursorElement.animate(circleKeyframes, {
          duration: 2000,
          fill: "forwards"
        });
        dotCursorElement.animate(dotKeyframes, {
          duration: 100,
          fill: "forwards"
        });
      };
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      <div
        ref={circleCursorRef}
        className='custom-cursor duration-500 opacity-0 p-5 ease-in-out transition rounded-full left-0 top-0 border absolute z-50 pointer-events-none'
      ></div>
      <div
        ref={dotCursorRef}
        className='custom-cursor duration-500 opacity-0 p-1 ease-in-out transition rounded-full left-0 top-0 bg-white absolute z-50 pointer-events-none'
      ></div>
    </>
  );
}
