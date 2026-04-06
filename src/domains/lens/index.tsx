import type { Metadata } from 'next';

import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { LensEmptyBlock } from './components/lens-empty-block';
import { LENS_DATA, LENS_ITEMS, type LensItem } from '@/data';
import { LensCard } from './components/lens-card';
import { animator } from '@/shared/helpers';

export const metadata: Metadata = {
  title: LENS_DATA.title
};

export function LensPage() {
  return (
    <ContentContainer className="text-center">
      <h3
        className={clsx(
          'select-none text-center text-2xl font-bold font-title',
          animator({ name: 'fadeIn' })
        )}
        dangerouslySetInnerHTML={{ __html: LENS_DATA.title }}
      />
      <p
        className={clsx(
          'mt-4 mb-10 select-none text-center font-title',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
        dangerouslySetInnerHTML={{ __html: LENS_DATA.description }}
      />

      {LENS_ITEMS.length === 0 && <LensEmptyBlock />}

      <div className="mt-4 overflow-hidden grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2 z-0">
        {LENS_ITEMS.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).map((item: LensItem, index: number) => (
          <LensCard key={item.id} data={item} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>
    </ContentContainer>
  );
}
