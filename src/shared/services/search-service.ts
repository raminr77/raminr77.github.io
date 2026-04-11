import { ENDPOINTS } from '@/shared/api/constants';
import { PostMetadata } from '@/shared/types/post';
import { notify } from '@/shared/helpers';

type SearchPostsResponse = {
  success: boolean;
  message?: string;
  data?: PostMetadata[];
};

export const searchPosts = async (value: string): Promise<PostMetadata[]> => {
  const rawResponse = await fetch(ENDPOINTS.searchPosts(value), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const response = (await rawResponse.json()) as SearchPostsResponse;

  if (!response.success) {
    const message = response.message ?? 'We could not handle your request now!';
    notify.error({ message });
    throw new Error(message);
  }

  return response.data ?? [];
};
