import { Image } from '@/shared/components/Image';

export function IndexWhiteSection() {
  return (
    <section className='w-full h-screen bg-white flex items-center pl-14 lg:justify-end lg:pl-0 lg:pr-80'>
      <Image
        width={100}
        height={100}
        src='./icons/logo.png'
        alt='Ramin Rezaei - Front-end Engineer'
        className='mix-blend-difference lg:scale-150'
      />
    </section>
  );
}
