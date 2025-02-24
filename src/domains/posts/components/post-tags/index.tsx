import { generateFilteredPostUrl } from '@/domains/posts/helpers';
import Link from 'next/link';

export function PostTags({ postId, tags = [] }: { postId: number; tags: string[] }) {
  return (
    tags.length > 0 && (
      <div className="mb-2 flex select-none flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <Link
            target="_blank"
            key={`post-${postId}-${tag}-${index}`}
            href={generateFilteredPostUrl({ tag })}
            className="rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-slate-600/50"
          >
            {tag}
          </Link>
        ))}
      </div>
    )
  );
}
