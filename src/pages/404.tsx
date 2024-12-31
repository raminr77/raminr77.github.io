import Link from 'next/link';
import { CRO_DATA } from '@/shared/constants/cro';

const NotFoundPage = () => {
  return (
    <div className='w-full select-none h-screen flex items-center text-white justify-center flex-col'>
      <h3 className='leading-10 mb-4 text-xl font-bold'>404 - Not Found</h3>
      <Link data-cro-id={CRO_DATA.CLICK_NOT_FOUND_BACK_LINK} href='/'>
        [ Home Page ]
      </Link>
    </div>
  );
};

export default NotFoundPage;
