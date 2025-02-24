import { generateFilteredPostUrl } from '@/domains/posts/helpers';
import Image from 'next/image';
import Link from 'next/link';

export function PostCategory({ category }: { category: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Image
        width={20}
        height={20}
        loading="lazy"
        alt="Category"
        className="dark:invert"
        src="/images/category-icon.svg"
      />
      <Link className="text-amber-500" href={generateFilteredPostUrl({ category })}>
        {category.toUpperCase()}
      </Link>
    </div>
  );
}
