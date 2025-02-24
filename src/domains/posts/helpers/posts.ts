import type { Post } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export function postSorter(first: Post, second: Post) {
  return compareDesc(new Date(first.date), new Date(second.date));
}
