import { readingTime } from '@/shared/helpers/posts/utils';
import { Icons } from '@/shared/components/icons';

export function PostReadTime({ words }: { words: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="time" />
      <p>{`Reading Time ${readingTime(words)} Minute(s)`}</p>
    </div>
  );
}
