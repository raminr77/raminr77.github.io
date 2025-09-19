'use client';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import Link from 'next/link';

import type { PostFilters } from '@/shared/types/post';
import { ROUTES } from '@/shared/constants';

interface PostsCategoryFilterProps {
  categories: string[];
  activeFilters: PostFilters | null;
}

export function PostsCategoryFilter({
  categories = [],
  activeFilters = null
}: PostsCategoryFilterProps) {
  const router = useRouter();

  const handleCategoryChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const value = target.value;
    if (!value) {
      router.push(ROUTES.POSTS);
      return;
    }
    router.push(`?category=${target.value}`);
  };

  return (
    <div className="flex items-center flex-wrap gap-3">
      <select
        onChange={handleCategoryChange}
        className="h-9 px-3 text-md border appearance-none outline-none cursor-pointer bg-transparent backdrop-blur-sm duration-300 hover:border-amber-500"
      >
        <option value="">Select a category ...</option>
        {categories.map((item) => {
          const isActive = activeFilters?.category === item;
          return (
            <option selected={isActive} key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      {!!activeFilters && (
        <Link
          href={ROUTES.POSTS}
          className="px-2 py-1 text-md bg-transparent backdrop-blur-sm hover:text-amber-500 duration-300"
        >
          Clear Filter
        </Link>
      )}
    </div>
  );
}
