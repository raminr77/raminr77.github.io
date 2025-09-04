import { Icons } from '@/shared/components/icons';
import { PERSONAL_DATA } from '@/data';

export function PostAuthor({ author }: { author: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="author" />
      <p>{author || PERSONAL_DATA.firstName}</p>
    </div>
  );
}
