'use client';
import { useEffect, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { sendGTMEvent } from 'node_modules/@next/third-parties/dist/google/gtm';
import { TextInput } from '@/shared/components/text-input';
import { useDebounce } from '@/shared/hooks/use-debounce';
import type { PostMetadata } from '@/shared/types/post';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { Icon } from '@/shared/components/icon';
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
  };
  const handleOpenSearch = () => {
    setShowSearch(true);
  };
  const handleSearchChange = ({
    target
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(target.value);
  };

  const handleSubmit = async (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === '') {
      setPosts([]);
      return;
    }

    setLoading(true);
    sendGTMEvent(GTM_EVENTS.SUBMIT_POST_SEARCH);
    searchPosts(trimmedValue)
      .then((result) => {
        setPosts((result as PostMetadata[]) ?? []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSubmit(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        title="Search Posts"
        aria-label="Search Posts"
        onClick={handleOpenSearch}
        className={BUTTON_CLASSES}
      >
        <Icon alt="Search" name="search" />
      </button>

      {showSearch && (
        <div
          onClick={handleCloseSearch}
          className={clsx(
            'flex justify-center fixed left-0 right-0 top-0 bottom-0 z-10 bg-black/80 w-full h-full overflow-hidden',
            animator({ name: 'fadeIn', speed: 'fast' })
          )}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full mx-5 p-4 max-w-3xl mt-40 overflow-hidden h-fit bg-white/80 dark:bg-black/80 border border-slate-300/40 relative"
          >
            <button
              type="button"
              title="Close Search"
              aria-label="Close Search"
              onClick={handleCloseSearch}
              className={clsx(BUTTON_CLASSES, 'absolute top-4 right-4')}
            >
              <Icon name="close" alt="Close Search" />
            </button>

            <TextInput
              autoFocus
              type="text"
              id="search"
              value={searchValue}
              label="Search Posts"
              placeholder="Search..."
              onChange={handleSearchChange}
              className="w-full bg-transparent mb-5 mt-4"
            />

            <ul
              className={clsx('flex flex-col overflow-y-auto', {
                'opacity-50 pointer-events-none': loading,
                'max-h-[60vh]': posts.length > 0 && !loading
              })}
            >
              {loading && <li className="text-center text-gray-500">Loading...</li>}

              {!loading && posts.length === 0 && searchValue && (
                <li className="text-center text-gray-500">No posts found.</li>
              )}

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
      )}
    </div>
  );
}
