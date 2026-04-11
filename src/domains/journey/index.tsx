import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import { JOURNEY_DATA } from '@/data';

import { JourneyScroller } from './components/journey-scroller';

export const metadata: Metadata = {
  title: 'Journey'
};

// Reverse so the most recent item (highest id) appears first
const JOURNEY_ITEMS = [...JOURNEY_DATA.items].reverse();

export function JourneyPage() {
  return (
    <main className="flex w-full flex-col items-center overflow-x-hidden pt-32 pb-0 md:pt-40">
      <div className="w-11/12 max-w-screen-lg text-center">
        <h3
          className={clsx(
            'select-none text-2xl font-bold font-title',
            animator({ name: 'fadeIn' })
          )}
          dangerouslySetInnerHTML={{ __html: JOURNEY_DATA.title }}
        />
        <p
          className={clsx(
            'mt-2 select-none font-title',
            animator({ name: 'fadeIn', delay: '1s' })
          )}
          dangerouslySetInnerHTML={{ __html: JOURNEY_DATA.description }}
        />
      </div>

      <div className="w-full max-w-screen-lg px-5">
        <JourneyScroller items={JOURNEY_ITEMS} />
      </div>
    </main>
  );
}
