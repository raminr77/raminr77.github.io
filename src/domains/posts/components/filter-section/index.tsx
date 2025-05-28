import Link from "next/link";

import { ROUTES } from "@/shared/constants";

interface FilterSectionProps {
  categories: string[];
  hasActiveFilter: boolean;
}

const BUTTON_CLASSES = "border px-4 py-1 text-md hover:border-amber-500 bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5";

export function FilterSection({ categories = [], hasActiveFilter = false }: FilterSectionProps) {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {categories.map((item) => (
        <Link key={item} href={`?category=${item}`} className={BUTTON_CLASSES}>
          {item}
        </Link>
      ))}

      {hasActiveFilter && (
        <Link href={ROUTES.POSTS} className={BUTTON_CLASSES}>
          Clear Filter
        </Link>
      )}
    </div>
  );
}
