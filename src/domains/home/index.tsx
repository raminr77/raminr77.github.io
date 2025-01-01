'use client';
import { HeroTextAnimator } from '@/domains/home/components/hero-text-animator';

export function HomePage() {
  return (
    <main className='flex h-dvh w-full flex-col items-center justify-center gap-4 select-none'>
      <HeroTextAnimator />
    </main>
  );
}
