import { MAIN_DATA } from '@/data';
import { Image } from '@/shared/components/Image';
import { animator } from '@/shared/utils/animator';

export function SplashScreen() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center relative overflow-hidden select-none'>
      <Image
        width={90}
        height={90}
        alt='LOADING ...'
        src='./icons/logo.png'
        className={animator({ name: 'fadeIn', speed: 'faster' })}
      />

      <div className='text-xs text-slate-400 flex items-center justify-center flex-col fixed bottom-9'>
        <p className='text-md'>
          {`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME}`.toUpperCase()}
        </p>
        <p className='mt-1'>Version 1.4.4</p>
      </div>
    </div>
  );
}
