export type PostFilterKeys = 'tag' | 'category';
export type PostFilters = Partial<Record<PostFilterKeys, string>>;

export type PostMetadata = {
  id: number;
  date: Date;
  slug: string;
  title: string;
  author: string;
  tags: string[];
  category: string;
  isActive: boolean;
  description: string;
};

export type Post = PostMetadata & {
  content: string;
};
