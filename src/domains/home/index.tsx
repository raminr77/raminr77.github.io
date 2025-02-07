import { animator } from '@/shared/helpers';
import { Summary } from '@/domains/home/components/summary';
import { HeroTextAnimator } from '@/domains/home/components/hero-text-animator';
import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';

export function HomePage() {
  return (
    <main className='flex h-dvh w-full select-none flex-col items-center justify-center gap-2 overflow-hidden'>
      <HeroTextAnimator />
      <Summary />
      <div className={animator({ name: 'fadeIn', delay: '3s' })}>
        <ResumeDownloaderButton />
      </div>
    </main>
  );
}
