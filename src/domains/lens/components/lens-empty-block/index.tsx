import clsx from 'clsx';

import { animator } from '@/shared/helpers';
import { GENERAL_SITE_DATA } from '@/data';

export function LensEmptyBlock() {
  const { emptyState } = GENERAL_SITE_DATA.lens;
  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-2 justify-center w-full mt-4 min-h-[400px]',
        animator({ name: 'fadeIn', delay: '1s' })
      )}
    >
      <p className="text-center text-xl font-bold font-title">{emptyState.title}</p>
      <p>{emptyState.description}</p>
    </div>
  );
}
