import { LottieAnimation } from '@/shared/components/lottie-animation';
import SERVER_ERROR_ANIMATION from '@/shared/static/animations/server-error.json';

export function ServerError({ onTryAgain = () => {} }: { onTryAgain: GVoidFunction }) {
  return (
    <div className='w-full select-none h-screen flex items-center text-white justify-center flex-col'>
      <LottieAnimation data={SERVER_ERROR_ANIMATION} clickable={false} />
      <h3 className='leading-10 mb-4 text-xl font-bold'>500 - Server Error</h3>
      <button onClick={onTryAgain}>[ Try Again ]</button>
    </div>
  );
}
