import type { Metadata } from 'next';

import { PageHeader } from '@/shared/components';
import { JOURNEY_DATA } from '@/data';

import { JourneyScroller } from './components';

export const metadata: Metadata = {
  title: 'Journey'
};

// Reverse so the most recent item (highest id) appears first
const JOURNEY_ITEMS = [...JOURNEY_DATA.items].reverse();

export function JourneyPage() {
  return (
    <main className="flex w-full flex-col items-center overflow-x-hidden pt-32 pb-0 md:pt-40">
      <PageHeader
        title={JOURNEY_DATA.title}
        description={JOURNEY_DATA.description}
        className="mb-4 w-11/12 max-w-screen-lg"
      />

      <div className="w-full max-w-screen-lg px-5">
        <JourneyScroller items={JOURNEY_ITEMS} />
      </div>
    </main>
  );
}
