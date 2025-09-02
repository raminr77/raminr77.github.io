import { Icon } from '@/shared/components/icon';
import { PERSONAL_DATA } from '@/data';

export function PostAuthor({ author }: { author: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Icon alt="Author" name="author" />
      <p>{author || PERSONAL_DATA.firstName}</p>
    </div>
  );
}
