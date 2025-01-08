import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { JOURNEY_DATA, type JourneyItem } from '@/data/journey';
import { JourneyCard } from '@/domains/journey/components/journey-card';
import { ContentContainer } from '@/layout/components/content-container';

export function JourneyPage() {
  return (
    <ContentContainer>
      <h1
        className={clsx(
          'select-none text-center text-3xl',
          titleFont.className,
          animator({ name: 'fadeInUp' })
        )}
      >
        The Adventure Started ...
      </h1>
      <h3
        className={clsx(
          titleFont.className,
          'mt-4 select-none text-center text-xl',
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        On a journey to <span className='text-2xl font-bold'>Google</span>, driven by
        curiosity and a desire to learn more.
      </h3>

      <div className='mt-20 flex flex-col gap-28'>
        {JOURNEY_DATA.map((item: JourneyItem, index: number) => (
          <JourneyCard key={index} order={index + 1} data={item} />
        ))}
      </div>

      <p
        className={clsx(
          'mb-40 mt-28 select-none text-center text-lg',
          animator({ name: 'fadeIn' })
        )}
      >
        Continuing my journey to Google...
      </p>
    </ContentContainer>
  );
}
