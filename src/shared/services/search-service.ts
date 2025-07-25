import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

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
      .then((response) => {
        if (response.success) {
          resolve(response?.data ?? []);
        } else {
          notify.error({
            message: response.message || 'We could not handle your request now!'
          });
          reject();
        }
      })
      .catch(() => {
        notify.error({ message: 'We could not handle your request now!' });
        reject();
      });
  });
};
