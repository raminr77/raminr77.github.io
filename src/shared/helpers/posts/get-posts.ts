import matter from 'gray-matter';
import fs from 'fs';

import { PERSONAL_DATA } from '@/data';

import { filterPostsByKey, postSorter, searchPosts } from './utils';
import type { PostMetadata, PostFilters } from '../../types/post';
import { POSTT_FOLTER_PATH } from './constants';

export type Posts = {
  categories: string[];
  data: PostMetadata[];
};

// ONLY FOR SERVER SIDE
// TODO: Optimize with caching mechanism
export function getPosts(
  filters: PostFilters | null = null,
  searchValue: string | null = null
): Posts {
  const files = fs.readdirSync(POSTT_FOLTER_PATH);
  const posts = files.filter((file) => file.endsWith('.md'));

  const categories: Record<string, true> = {};
  const postsMetadata = posts
    .map((file) => {
      const fileContent = fs.readFileSync(`${POSTT_FOLTER_PATH}/${file}`, 'utf-8');
      const matterData = matter(fileContent);
      const data = matterData.data as PostMetadata;

      if (data.category) {
        categories[data.category] = true;
      }
      // POST METADATA
      return {
        id: data.id,
        date: data.date ?? '',
        tags: data.tags ?? [],
        title: data.title ?? '',
        isActive: data.isActive ?? false,
        category: data.category ?? 'News',
        description: data.description ?? '',
        slug: data.slug ?? file.replace('.md', ''),
        author: data.author ?? PERSONAL_DATA.firstName
      };
    })
    .filter((postItem: PostMetadata) => filterPostsByKey(postItem, filters))
    .filter((postItem: PostMetadata) => searchPosts(postItem, searchValue))
    .sort(postSorter);

  return {
    categories: Object.keys(categories),
    data: postsMetadata
  };
}
