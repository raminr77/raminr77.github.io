import type { Post } from 'contentlayer/generated';
import { ROUTES } from '@/shared/constants';
import { compareDesc } from 'date-fns';
import { stringify } from 'qs';

export function postSorter(first: Post, second: Post) {
  return compareDesc(new Date(first.date), new Date(second.date));
}

export function filterPostsByKey(
  postItem: Post,
  filter: Record<'tag' | 'category', string> | null = null
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
