import Link from "next/link";

import { ROUTES } from "@/shared/constants";

interface FilterSectionProps {
  categories: string[];
  hasActiveFilter: boolean;
}

export function FilterSection({ categories = [], hasActiveFilter = false }: FilterSectionProps) {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {categories.map((item) => (
        <Link
          key={item}
          href={`?category=${item}`} 
          className="border px-4 py-1 text-md hover:border-amber-500 bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5"
        >
          {item}
        </Link>
      ))}

      {hasActiveFilter && (
        <Link
          href={ROUTES.POSTS}
          className="border px-4 py-1 text-md border-amber-500 bg-transparent shadow backdrop-blur-sm bg-slate-300/5"
        >
          Clear Filter
        </Link>
      )}
    </div>
  );
}
