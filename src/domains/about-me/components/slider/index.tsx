import { Autoplay, EffectCreative, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MAIN_DATA } from '@/data';
import { SliderItem } from './slider-item';

export default () => {
  return (
    <Swiper
      loop
      grabCursor
      pagination
      centeredSlides
      effect={'creative'}
      modules={[Autoplay, EffectCreative, Pagination]}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }}
    >
      {MAIN_DATA.ABOUT_SLIDERS.map((item) => (
        <SwiperSlide key={item.id}>
          <SliderItem slide={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
