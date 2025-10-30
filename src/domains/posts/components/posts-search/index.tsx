'use client';
import { Activity, useEffect, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { TextInput } from '@/shared/components/text-input';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { sendGTMEvent } from '@next/third-parties/google';
import type { PostMetadata } from '@/shared/types/post';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { Icons } from '@/shared/components/icons';
import { searchPosts } from '@/shared/services';
import { animator } from '@/shared/helpers';

import { PostDate } from '../post-date';

const BUTTON_CLASSES =
  'border w-9 px-2 h-9 flex items-center justify-center hover:border-amber-500 bg-transparent shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5 overflow-hidden';

export function PostsSearch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(searchValue, 300) as string;

  const handleCloseSearch = () => {
    setShowSearch(false);
    sendGTMEvent(GTM_EVENTS.CLOSE_SEACH_MODAL);
  };
  const handleOpenSearch = () => {
    setShowSearch(true);
  };
  const handleSearchChange = ({
    target
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(target.value);
  };

  const handleSubmit = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === '') {
      setPosts([]);
      return;
    }

    setLoading(true);
    sendGTMEvent(GTM_EVENTS.SUBMIT_POST_SEARCH(trimmedValue));
    searchPosts(trimmedValue)
      .then((result) => {
        setPosts((result as PostMetadata[]) ?? []);
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSubmit(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    const handleCloseSeach = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearch(false);
      }
    };
    document.addEventListener('keyup', handleCloseSeach);
    return () => document.removeEventListener('keyup', handleCloseSeach);
  }, []);

  return (
    <div className="flex items-center">
      <button
        type="button"
        title="Search Posts"
        aria-label="Search Posts"
        onClick={handleOpenSearch}
        className={BUTTON_CLASSES}
      >
        <Icons name="search" />
      </button>

      <Activity mode={showSearch ? 'visible' : 'hidden'}>
        <div
          onClick={handleCloseSearch}
          className={clsx(
            'flex justify-center fixed left-0 right-0 top-0 bottom-0 z-10 bg-white/90 dark:bg-black/80 w-full h-full overflow-hidden',
            animator({ name: 'fadeIn', speed: 'faster' })
          )}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full mx-5 p-4 max-w-3xl mt-40 overflow-hidden h-fit bg-white dark:bg-black border border-slate-500 dark:border-slate-300 relative"
          >
            <button
              type="button"
              title="Close Search"
              aria-label="Close Search"
              onClick={handleCloseSearch}
              className={clsx(BUTTON_CLASSES, 'absolute top-4 right-4')}
            >
              <Icons name="close" />
            </button>

            <TextInput
              autoFocus
              type="text"
              id="search"
              value={searchValue}
              label="Search Posts"
              placeholder="Search..."
              onChange={handleSearchChange}
              className="w-full bg-transparent mb-5 mt-4 placeholder-black dark:placeholder-white"
            />

            <ul
              className={clsx('flex flex-col overflow-y-auto', {
                'opacity-50 pointer-events-none': loading,
                'max-h-[60vh]': posts.length > 0 && !loading
              })}
            >
              <Activity mode={loading ? 'visible' : 'hidden'}>
                <li className="text-center text-gray-500">Loading...</li>
              </Activity>

              <Activity
                mode={
                  !loading && posts.length === 0 && searchValue ? 'visible' : 'hidden'
                }
              >
                <li className="text-center text-gray-500">No posts found.</li>
              </Activity>

              {posts.map((post: PostMetadata) => {
                const postDetailUrl = `${ROUTES.POSTS}${post.id}?slug=${post.slug}`;
                return (
                  <li
                    key={post.id}
                    className="p-4 border-b border-slate-300/40 last:border-0"
                  >
                    <Link
                      href={postDetailUrl}
                      className="w-full flex items-center gap-2 hover:text-amber-500 duration-300 flex-wrap justify-between"
                    >
                      <span className="font-medium text-lg">{post.title}</span>
                      <PostDate date={post.date} />
                    </Link>
                    <p className="text-sm text-gray-500 mt-3">{post.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Activity>
    </div>
  );
}
