import { Metadata } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';

import {
  RECOMMENDATION_PAGE_DATA,
  RECOMMENDATIONS,
  type RecommendationItem
} from '@/data';
import { ContentContainer } from '@/layout/components/content-container';
import { animator } from '@/shared/helpers';

import { RecommendationCard } from './components/recommendation-card';

export const metadata: Metadata = {
  title: 'Recommendations'
};

export function RecommendationsPage() {
  return (
    <ContentContainer>
      <h3
        className={clsx(
          'select-none text-center text-2xl font-bold font-title',
          animator({ name: 'fadeInUp' })
        )}
        dangerouslySetInnerHTML={{ __html: RECOMMENDATION_PAGE_DATA.title }}
      />
      <p
        className={clsx(
          'mt-4 select-none text-center text-lg font-title',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
        dangerouslySetInnerHTML={{ __html: RECOMMENDATION_PAGE_DATA.description }}
      />

      <div className="mt-10 flex flex-col gap-6 overflow-hidden">
        {RECOMMENDATIONS.map((item: RecommendationItem, index: number) => (
          <RecommendationCard
            key={item.id}
            data={item}
            animationDelay={`${(index + 1) * 0.3}s`}
          />
        ))}
      </div>

      <div
        className={clsx(
          'mt-10 flex flex-col items-center justify-center gap-3 pt-4',
          animator({ name: 'fadeInUp', delay: '1s' })
        )}
      >
        <p>{RECOMMENDATION_PAGE_DATA.footer}</p>
        <Link
          href={RECOMMENDATION_PAGE_DATA.footerActionURL}
          className="border-b border-orange-500 px-5 pb-1 duration-200 hover:px-8"
        >
          {RECOMMENDATION_PAGE_DATA.footerActionLabel}
        </Link>
      </div>
    </ContentContainer>
  );
}
