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

// Server-only. Posts are static, parse markdown once per Node process and reuse.
let allPostsCache: PostMetadata[] | null = null;

function getAllPosts(): PostMetadata[] {
  if (allPostsCache) return allPostsCache;

  const files = fs.readdirSync(POST_FOLDER_PATH).filter((file) => file.endsWith('.md'));

  allPostsCache = files.map((file) => {
    const fileContent = fs.readFileSync(`${POST_FOLDER_PATH}/${file}`, 'utf-8');
    const data = matter(fileContent).data as PostMetadata;

    return {
      id: data.id,
      date: data.date ?? '',
      title: data.title ?? '',
      isActive: data.isActive ?? false,
      category: data.category ?? 'News',
      description: data.description ?? '',
      slug: data.slug ?? file.replace('.md', ''),
      author: data.author ?? PERSONAL_DATA.firstName,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : []
    };
  });

  return allPostsCache;
}

export function getPosts(
  filters: PostFilters | null = null,
  searchValue: string | null = null
): Posts {
  const activePosts = getAllPosts().filter((postItem) => postItem.isActive);

  // All active categories, keep dropdown complete even when filtering.
  const categorySet = new Set<string>();
  for (const post of activePosts) {
    if (post.category) categorySet.add(post.category);
  }

  const data = activePosts
    .filter((postItem) => filterPostsByKey(postItem, filters))
    .filter((postItem) => searchPosts(postItem, searchValue))
    .sort(postSorter);

  return {
    categories: Array.from(categorySet).sort(
      (first, second) => first.length - second.length
    ),
    data
  };
}

// Test-only: reset the in-memory cache so each test gets a fresh parse.
export function __resetPostsCacheForTests(): void {
  allPostsCache = null;
}
