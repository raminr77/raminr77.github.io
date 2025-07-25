import clsx from "clsx";
import Link from "next/link";

import type { PostFilters } from "@/shared/types/post";
import { ROUTES } from "@/shared/constants";

interface PostsCategoryFilterProps {
  categories: string[];
  activeFilters: PostFilters | null;
}

export function PostsCategoryFilter({
  categories = [],
  activeFilters = null,
}: PostsCategoryFilterProps) {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {categories.map((item) => {
        const isActive = activeFilters?.category === item;
        return (
          <Link
            key={item}
            href={isActive ? ROUTES.POSTS : `?category=${item}`}
            className={clsx(
              "border px-4 h-9 flex items-center text-md hover:border-amber-500 bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5",
              {
                "bg-amber-500/20 border-amber-500": isActive
              }
            )}
          >
            {item}
          </Link>
        );
      })}

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
