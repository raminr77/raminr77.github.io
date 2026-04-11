import type { Metadata } from 'next';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { Pagination, PAGE_SIZE } from '@/shared/components/pagination';
import { LensEmptyBlock } from './components/lens-empty-block';
import { LENS_DATA, LENS_ITEMS, type LensItem } from '@/data';
import { LensCard } from './components/lens-card';
import { ROUTES } from '@/shared/constants';
import { animator } from '@/shared/helpers';

export const metadata: Metadata = {
  title: LENS_DATA.title
};

// Pre-sorted at module level — static data, no need to sort on every render
const SORTED_LENS_ITEMS: LensItem[] = [...LENS_ITEMS].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

interface LensPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function LensPage({ searchParams }: LensPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const totalPages = Math.ceil(SORTED_LENS_ITEMS.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const items = SORTED_LENS_ITEMS.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

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

      {SORTED_LENS_ITEMS.length === 0 && <LensEmptyBlock />}

      <div className="mt-4 overflow-hidden grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-2 z-0">
        {items.map((item: LensItem, index: number) => (
          <LensCard key={item.id} data={item} animationDelay={(index + 1) * 0.3} />
        ))}
      </div>

      <Pagination page={safePage} totalPages={totalPages} basePath={ROUTES.LENS} />
    </ContentContainer>
  );
}
