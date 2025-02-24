import { PERSONAL_DATA } from '@/data';
import Image from 'next/image';

export function PostAuthor({ author }: { author: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Image
        width={20}
        height={20}
        loading="lazy"
        alt="Category"
        className="dark:invert"
        src="/images/author-icon.svg"
      />
      <p>{author || PERSONAL_DATA.firstName}</p>
    </div>
  );
}
