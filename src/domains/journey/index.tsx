import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { JOURNEY_DATA, type JourneyItem } from '@/data/journey';
import { JourneyCard } from '@/domains/journey/components/journey-card';
import { ContentContainer } from '@/layout/components/content-container';

export function JourneyPage() {
  return (
    <ContentContainer>
      <h3
        className={clsx(
          'select-none text-center text-3xl',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        The Adventure Started ...
      </h3>

      <div className='mt-20 flex flex-col gap-28 pb-40'>
        {JOURNEY_DATA.map((item: JourneyItem, index: number) => (
          <JourneyCard key={index} order={index + 1} data={item} />
        ))}
      </div>
    </ContentContainer>
  );
}
