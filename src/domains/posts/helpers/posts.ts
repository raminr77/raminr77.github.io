import type { Post } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export function postSorter(first: Post, second: Post) {
  return compareDesc(new Date(first.date), new Date(second.date));
}

export function readingTime(text: string) {
  const wpm = 300;
  const words: number = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}
