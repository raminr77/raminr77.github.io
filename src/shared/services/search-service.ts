import { ENDPOINTS } from '@/shared/api/constants';
import { PostMetadata } from '@/shared/types/post';
import { notify } from '@/shared/helpers';

interface Response {
  success: boolean;
  message?: string;
  data?: PostMetadata[];
}

export const searchPosts = (value: string) => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINTS.searchPosts(value), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((rawResponse) => rawResponse.json())
      .then((response: Response) => {
        if (response.success) {
          resolve(response?.data ?? []);
        } else {
          notify.error({
            message: response.message || 'We could not handle your request now!'
          });
          reject(new Error(response.message || 'We could not handle your request now!'));
        }
      })
      .catch(() => {
        notify.error({ message: 'We could not handle your request now!' });
        reject(new Error('We could not handle your request now!'));
      });
  });
};
