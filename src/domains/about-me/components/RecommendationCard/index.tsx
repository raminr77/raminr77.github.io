import Link from "next/link";
import { clsx } from "clsx";
import { titleFont } from "@/app/fonts";
import { animator } from "@/shared/helpers";
import type { RecommendationItem } from "@/data";

export function RecommendationCard({ data, animationDelay = '0s' }: { data: RecommendationItem; animationDelay?: string }) {
  const { url, text, date, title, caption, fullname } = data;

  return (
    <div
      style={{ animationDelay }}
      className={clsx(
        'flex flex-col gap-2 shadow-lg p-4 items-start border dark:bg-black bg-white',
        animator({ name: 'fadeInUp' })
      )}
    >
      <div className='flex flex-col gap-1 w-full text-left border-b pb-4 mb-2'>
        <Link href={url} target='_blank' rel='noopener noreferrer' className="text-amber-500">
          <h4 className={clsx(titleFont.className, 'text-xl font-bold')}>{fullname.toUpperCase()}</h4>
        </Link>
        <p>{title}</p>
        <div className='flex items-center gap-2 flex-wrap'>
          <span>{caption}</span>
          <span>( {date} )</span>
        </div>
      </div>

      <p className='w-full text-left'>{text}</p>

      <Link href={url} target='_blank' rel='noopener noreferrer' className="text-amber-500">LinkedIn</Link>
    </div>
  );
}
