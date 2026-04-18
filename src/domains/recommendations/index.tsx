import { Metadata } from 'next';
import { clsx } from 'clsx';

import {
  RECOMMENDATION_PAGE_DATA,
  RECOMMENDATIONS,
  type RecommendationItem
} from '@/data';
import { ContentContainer } from '@/layout/components';
import { PageHeader } from '@/shared/components';
import { animator } from '@/shared/helpers';

import { RecommendationCard, RecommendationsFooter } from './components';

export const metadata: Metadata = {
  title: 'Recommendations'
};

export function RecommendationsPage() {
  return (
    <ContentContainer>
      <PageHeader
        descriptionClassName="mt-4 text-lg"
        title={RECOMMENDATION_PAGE_DATA.title}
        description={RECOMMENDATION_PAGE_DATA.description}
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
        <RecommendationsFooter />
      </div>
    </ContentContainer>
  );
}
