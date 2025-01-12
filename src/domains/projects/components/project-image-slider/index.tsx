import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@/shared/components/Image';

interface Props {
  data?: string[];
}
export function ProjectImageSlider({ data = [] }: Props) {
  return (
    <Swiper
      loop
      grabCursor
      pagination
      navigation
      centeredSlides
      spaceBetween={10}
      slidesPerView={1}
      className='w-full'
      modules={[Pagination, Navigation]}
    >
      {data.map((item) => (
        <SwiperSlide key={item} onClick={() => window.open(item, '_blank')}>
          <Image src={item} className='aspect-video' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
