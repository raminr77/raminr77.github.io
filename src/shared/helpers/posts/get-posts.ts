import fs from 'fs';
import matter from 'gray-matter';

import { PERSONAL_DATA } from '@/data';

import type { PostMetadata, PostFilters } from '../../types/post';
import { filterPostsByKey, postSorter } from './utils';
import { POSTT_FOLTER_PATH } from './constants';

interface Posts {
    categories: string[];
    data: PostMetadata[];
}

// ONLY FOR SERVER SIDE
export function getPosts(filters: PostFilters | null = null): Posts {
    const files = fs.readdirSync(POSTT_FOLTER_PATH);
    const posts = files.filter((file) => file.endsWith('.md'));

    const categories: Record<string, true> = {};
    const postsMetadata = posts.map((file) => {
        const fileContent = fs.readFileSync(`${POSTT_FOLTER_PATH}/${file}`, 'utf-8');
        const { data } = matter(fileContent);

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
            author: data.author ?? PERSONAL_DATA.firstName,
        };
    })
    .filter(
        (postItem: PostMetadata) => filterPostsByKey(postItem, filters)
    )
    .sort(postSorter);;

    return {
        categories: Object.keys(categories),
        data: postsMetadata,
    };
}
