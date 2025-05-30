import Image from 'next/image';

import { readingTime } from '@/shared/helpers/posts/utils';

export function PostReadTime({ words }: { words: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Image
        width={20}
        height={20}
        loading="lazy"
        alt="Category"
        className="dark:invert"
        src="/images/time-icon.svg"
      />
      <p>{`Reading Time ${readingTime(words)} Minute(s)`}</p>
    </div>
  );
}
