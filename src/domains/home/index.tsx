import { HeroTextAnimator, Summary } from '@/domains/home/components';
import { ResumeDownloaderButton } from '@/shared/components';
import { animator } from '@/shared/helpers';

export function HomePage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2 overflow-y-auto">
      <HeroTextAnimator />
      <Summary />
      <div className={animator({ name: 'fadeIn', delay: '3s' })}>
        <ResumeDownloaderButton />
      </div>
    </main>
  );
}
