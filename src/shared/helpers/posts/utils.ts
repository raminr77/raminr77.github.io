import { ROUTES } from '@/shared/constants';
import { compareDesc } from 'date-fns';
import { stringify } from 'qs';

import type { PostMetadata, PostFilters } from '@/shared/types/post';

export function postSorter(first: PostMetadata, second: PostMetadata) {
  return compareDesc(new Date(first.date), new Date(second.date));
}

export function filterPostsByKey(
  postItem: PostMetadata,
  filter: PostFilters | null = null
) {
  if (!filter) {
    return true;
  }

  if (filter.tag) {
    return postItem.tags.includes(filter.tag);
  }

  return postItem.category === filter.category;
}

export function readingTime(text: string) {
  const wpm = 300;
  const words: number = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

export function generateFilteredPostUrl(filters: { tag?: string; category?: string }) {
  return `${ROUTES.POSTS}?${stringify(filters)}`;
}

export function searchPosts(postItem: PostMetadata, searchValue: string | null) {
  if (!searchValue) {
    return true;
  }

  const lowerSearchValue = searchValue.toLowerCase();
  return (
    postItem.title.toLowerCase().includes(lowerSearchValue) ||
    postItem.description.toLowerCase().includes(lowerSearchValue) ||
    postItem.tags.some((tag) => tag.toLowerCase().includes(lowerSearchValue)) ||
    postItem.category.toLowerCase().includes(lowerSearchValue)
  );
}
