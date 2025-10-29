'use client';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import Link from 'next/link';

import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import type { PostFilters } from '@/shared/types/post';

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
    sendGTMEvent(GTM_EVENTS.FILTER_POSTS(value));
    if (!value) {
      router.push(ROUTES.POSTS);
      return;
    }
    router.push(`?category=${target.value}`);
  };

  return (
    <div className="flex items-center flex-wrap gap-3">
      <select
        aria-label="Select a category"
        onChange={handleCategoryChange}
        value={activeFilters?.category ?? ''}
        className="h-9 px-3 text-md border text-black appearance-none outline-none cursor-pointer bg-transparent dark:bg-black/90 duration-300 hover:border-amber-500 dark:text-white dark:border-white"
      >
        <option value="">Select a category ...</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {!!activeFilters && (
        <Link
          href={ROUTES.POSTS}
          onClick={() => sendGTMEvent(GTM_EVENTS.CLEAR_FILTERS)}
          className="px-2 py-1 text-md bg-transparent backdrop-blur-sm hover:text-amber-500 duration-300"
        >
          Clear Filter
        </Link>
      )}
    </div>
  );
}
