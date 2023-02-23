import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';
import { IndexBlackSection } from './components/black-section';
import { IndexSharedSection } from './components/shared-section';
import { IndexWhiteSection } from './components/white-section';

export function IndexPage() {
  return (
    <main
      className={classNames(
        'w-full select-none h-screen overflow-hidden',
        animator({ name: 'fadeIn' })
      )}
    >
      {/* Shared */}
      <IndexSharedSection />

      {/* W Section */}
      <IndexWhiteSection />

      {/* B Section */}
      <IndexBlackSection />
    </main>
  );
}
