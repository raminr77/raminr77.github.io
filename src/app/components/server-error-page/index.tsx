export function ServerError({ onTryAgain = () => {} }: { onTryAgain: GVoidFunction }) {
  return (
    <div className='w-full select-none h-screen flex items-center text-white justify-center flex-col'>
      <h3 className='leading-10 mb-4 text-xl font-bold'>500 - Server Error</h3>
      <button onClick={onTryAgain}>[ Try Again ]</button>
    </div>
  );
}
