import { readingTime } from '@/shared/helpers/posts/utils';
import { Icon } from '@/shared/components/icon';

export function PostReadTime({ words }: { words: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Icon alt="Reading Time" name="time" />
      <p>{`Reading Time ${readingTime(words)} Minute(s)`}</p>
    </div>
  );
}
