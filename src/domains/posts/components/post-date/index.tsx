import { format } from 'date-fns';

import { Icons } from '@/shared/components';

interface PostDateProps {
  date: Date;
}

export function PostDate({ date }: PostDateProps) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="date" />
      <span>{format(date, 'LLLL d, yyyy')}</span>
    </div>
  );
}
