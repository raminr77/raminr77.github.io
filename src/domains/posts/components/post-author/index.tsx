import { Icons } from '@/shared/components';
import { PERSONAL_DATA } from '@/data';

interface PostAuthorProps {
  author: string;
}

export function PostAuthor({ author }: PostAuthorProps) {
  return (
    <div className="flex gap-1 items-center">
      <Icons name="author" />
      <p>{author || PERSONAL_DATA.firstName}</p>
    </div>
  );
}
