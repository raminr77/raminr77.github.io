import { format } from 'date-fns';

import { Icons } from '@/shared/components/icons';

export function PostDate({ date }: { date: Date }) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="date" />
      <span>{format(date, 'LLLL d, yyyy')}</span>
    </div>
  );
}
