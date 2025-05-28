import fs from 'fs';
import matter from 'gray-matter';

import type { Post, PostMetadata } from '../../types/post';

const FOLDER_PATH = `./posts`;

// ONLY FOR SERVER SIDE
export function getPostContent(id: number): Post | null {
    const file = `${FOLDER_PATH}/post-${id < 10 ? `0${id}` : id}.md`;
    
    if (!fs.existsSync(file)) {
        return null;
    }

    const content = fs.readFileSync(file, 'utf-8');
    const { data: postMetadata, content: postContent } = matter(content);

    return {
        content: postContent,
        ...(postMetadata as PostMetadata),
    }
}
