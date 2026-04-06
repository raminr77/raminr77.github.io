import { animator } from '@/shared/helpers';
import clsx from 'clsx';

export function LensEmptyBlock() {
  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-2 justify-center w-full mt-4 min-h-[400px]',
        animator({ name: 'fadeIn', delay: '1s' })
      )}
    >
      <p className="text-center text-xl font-bold font-title">No Lens Items Found</p>
      <p>It seems there are no items in the lens yet.</p>
    </div>
  );
}
