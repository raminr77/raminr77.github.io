import Link from 'next/link';
import { LottieAnimation } from '@/shared/components/lottie-animation';
import { CRO_DATA } from '@/shared/constants/cro';
import NOT_FOUND_ANIMATION from '@/shared/static/animations/not-found.json';

const NotFoundPage = () => {
  return (
    <div className='w-full select-none h-screen flex items-center text-white justify-center flex-col'>
      <LottieAnimation data={NOT_FOUND_ANIMATION} clickable={false} />
      <h3 className='leading-10 mb-4 text-xl font-bold'>404 - Not Found</h3>
      <Link data-cro-id={CRO_DATA.NOT_FOUND_LINK} href='/'>
        [ Home Page ]
      </Link>
    </div>
  );
};

export default NotFoundPage;
