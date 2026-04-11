import matter from 'gray-matter';
import fs from 'fs';

import { PERSONAL_DATA } from '@/data';

import { filterPostsByKey, postSorter, searchPosts } from './utils';
import type { PostMetadata, PostFilters } from '../../types/post';
import { POST_FOLDER_PATH } from './constants';

export type Posts = {
  categories: string[];
  data: PostMetadata[];
};

// ONLY FOR SERVER SIDE
// Parsed post data is static — cache it for the lifetime of the process
let allPostsCache: PostMetadata[] | null = null;

function getAllPosts(): PostMetadata[] {
  if (allPostsCache) return allPostsCache;

  const files = fs.readdirSync(POST_FOLDER_PATH);
  const posts = files.filter((file) => file.endsWith('.md'));

  allPostsCache = posts.map((file) => {
    const fileContent = fs.readFileSync(`${POST_FOLDER_PATH}/${file}`, 'utf-8');
    const matterData = matter(fileContent);
    const data = matterData.data as PostMetadata;

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
  });

  return allPostsCache;
}

export function getPosts(
  filters: PostFilters | null = null,
  searchValue: string | null = null
): Posts {
  const allParsed = getAllPosts();
  const activePosts = allParsed.filter((postItem) => postItem.isActive);

  // Categories from all active posts so the filter dropdown stays complete even when a filter is active
  const categories: Record<string, true> = {};
  for (const post of activePosts) {
    if (post.category) categories[post.category] = true;
  }

  const postsMetadata = activePosts
    .filter((postItem) => filterPostsByKey(postItem, filters))
    .filter((postItem) => searchPosts(postItem, searchValue))
    .sort(postSorter);

  return {
    categories: Object.keys(categories),
    data: postsMetadata
  };
}
