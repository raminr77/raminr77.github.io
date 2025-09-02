import { format } from 'date-fns';

import { Icon } from '@/shared/components/icon';

export function PostDate({ date }: { date: Date }) {
  return (
    <div className="flex gap-1 items-center">
      <Icon alt="Date" name="date" />
      <span>{format(date, 'LLLL d, yyyy')}</span>
    </div>
  );
}
