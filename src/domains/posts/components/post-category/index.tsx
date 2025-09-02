import Link from 'next/link';

import { generateFilteredPostUrl } from '@/shared/helpers/posts/utils';
import { Icon } from '@/shared/components/icon';

export function PostCategory({
  category,
  showLabel = false
}: {
  showLabel?: boolean;
  category: string;
}) {
  return (
    <div className="flex gap-1 items-center">
      <Icon alt="Category" name="category" />
      {showLabel && <span>Category: </span>}
      <Link className="text-amber-500" href={generateFilteredPostUrl({ category })}>
        {category.toUpperCase()}
      </Link>
    </div>
  );
}
