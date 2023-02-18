import { IndexBlackSection } from './components/black-section';
import { IndexSharedSection } from './components/shared-section';
import { IndexWhiteSection } from './components/white-section';

export function Index() {
  return (
    <main className='w-full select-none h-screen overflow-hidden'>
      {/* Shared */}
      <IndexSharedSection />

      {/* W Section */}
      <IndexWhiteSection />

      {/* B Section */}
      <IndexBlackSection />
    </main>
  );
}
