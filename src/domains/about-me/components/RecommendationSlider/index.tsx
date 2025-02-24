import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { clsx } from 'clsx';
import 'swiper/css';

import { CONTACT_ME_DATA, RECOMMENDATIONS, type RecommendationItem } from '@/data';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';

import { RecommendationCard } from '../RecommendationCard';

export function RecommendationSlider() {
  return (
    <section className={clsx('my-10', animator({ name: 'fadeIn', delay: '1s' }))}>
      <p className={clsx(titleFont.className, 'mb-7 text-2xl font-extrabold')}>
        Recommendations On LinkedIn
      </p>
      <Swiper
        loop
        grabCursor
        navigation
        centeredSlides
        slidesPerView="auto"
        modules={[Navigation]}
      >
        {RECOMMENDATIONS.map((item: RecommendationItem, index: number) => (
          <SwiperSlide key={item.id} className="md:px-12">
            <RecommendationCard data={item} animationDelay={`${(index + 1) * 0.3}s`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <br />

      <Link
        target="_blank"
        href={CONTACT_ME_DATA.linkedInURL}
        className="border-b pb-3 duration-300 hover:border-amber-500 hover:text-amber-500"
      >
        See More On LinkedIn
      </Link>
    </section>
  );
}
