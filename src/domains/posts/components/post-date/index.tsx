import { format } from 'date-fns';
import Image from 'next/image';

export function PostDate({ date }: { date: Date }) {
  return (
    <div className="flex gap-1 items-center">
      <Image
        width={20}
        height={20}
        loading="lazy"
        alt="Category"
        className="dark:invert"
        src="/images/date-icon.svg"
      />
      <span>{format(date, 'LLLL d, yyyy')}</span>
    </div>
  );
}
