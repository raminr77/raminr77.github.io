import { Summary } from '@/domains/home/components/summary';
import { HeroTextAnimator } from '@/domains/home/components/hero-text-animator';
import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';
import { animator } from '@/shared/helpers';

export function HomePage() {
  return (
    <main className='flex h-dvh w-full select-none flex-col items-center justify-center gap-2 overflow-hidden'>
      <HeroTextAnimator />
      <Summary />
      <div className={animator({ name: 'fadeIn', delay: '3s' })}>
        <ResumeDownloaderButton />
      </div>

      <img
        draggable={false}
        alt='bottom-shine'
        src='/images/background.png'
        className='shine-animation-bottom pointer-events-none absolute bottom-0 right-0 rotate-180 blur-lg'
      />
    </main>
  );
}
