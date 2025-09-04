import Link from 'next/link';

import { generateFilteredPostUrl } from '@/shared/helpers/posts/utils';
import { Icons } from '@/shared/components/icons';

export function PostCategory({
  category,
  showLabel = false
}: {
  showLabel?: boolean;
  category: string;
}) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="category" />
      {showLabel && <span>Category: </span>}
      <Link className="text-amber-500" href={generateFilteredPostUrl({ category })}>
        {category.toUpperCase()}
      </Link>
    </div>
  );
}
