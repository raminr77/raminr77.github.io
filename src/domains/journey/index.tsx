import type { Metadata } from 'next';

import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { JourneyCard } from '@/domains/journey/components/journey-card';
import { JOURNEY_DATA, type JourneyItem } from '@/data';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Journey'
};

// Reverse the order of items to display them in reverse chronological order
const JOURNEY_ITEMS = JOURNEY_DATA.items.reverse();

export function JourneyPage() {
  return (
    <ContentContainer>
      <h1
        className={clsx(
          'select-none text-center text-2xl font-bold',
          titleFont.className,
          animator({ name: 'fadeIn' })
        )}
        dangerouslySetInnerHTML={{ __html: JOURNEY_DATA.title }}
      />
      <p
        className={clsx(
          titleFont.className,
          'mt-4 select-none text-center',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
        dangerouslySetInnerHTML={{ __html: JOURNEY_DATA.description }}
      />

      <div className="mt-20 flex flex-col gap-16">
        {JOURNEY_ITEMS.map((item: JourneyItem, index: number) => (
          <JourneyCard key={index} order={index + 1} data={item} />
        ))}
      </div>

      <p
        className={clsx(
          'mb-40 mt-28 select-none text-center text-lg',
          animator({ name: 'fadeIn' })
        )}
        dangerouslySetInnerHTML={{ __html: JOURNEY_DATA.footer }}
      />
    </ContentContainer>
  );
}
