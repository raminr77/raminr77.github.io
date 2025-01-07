'use client';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MotionPathHelper from "gsap/MotionPathPlugin";
import { ContentContainer } from '@/layout/components/content-container';
import { VerticalTimeline } from '@/domains/journey/components/vertical-timeline';

export function JourneyPage() {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  gsap.registerPlugin(MotionPathHelper);
  useEffect(() => {
    gsap.to(itemRef.current, { opacity: 0 });
  }, []);
  useGSAP(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          start: 0,
          end: 100,
          markers: true,
          trigger: containerRef.current,
        },
      });
      tl.set(itemRef.current, { opacity: 1 });
      tl.to(itemRef.current, {
        motionPath: {
          end: 1,
          start: 0,
          path: '#line',
          align: '#line',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 4,
        ease: "power1.inOut",
      });
      return tl;
    },
    { scope: '.vertical-timeline' }
  );

  return (
    <ContentContainer>
      <div ref={containerRef} className='w-full flex items-center justify-center'>
        <div ref={itemRef} className='size-14 rounded-full bg-amber-500' />
        <VerticalTimeline className='vertical-timeline' />
      </div>
    </ContentContainer>
  );
}
