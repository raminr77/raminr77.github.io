import { CONTACT_ME_ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

export const sendTextToAI = (text: string): Promise<{ answer: string }> => {
  return new Promise((resolve, reject) => {
    fetch(CONTACT_ME_ENDPOINTS.sendTextToAI(text), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        if (response.success) {
          resolve(response.data || { answer: 'Could you ask again, please :)' });
        } else {
          notify.error({
            message: response.message || 'We could not send your message now!'
          });
          reject();
        }
      })
      .catch(() => {
        notify.error({ message: 'We could not send your message now!' });
        reject();
      });
  });
};
