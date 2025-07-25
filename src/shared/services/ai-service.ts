import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

export interface AiResponse {
  question: string;
  answer: string;
}

export const sendTextToAI = ({
  text,
  userId
}: {
  text: string;
  userId: string;
}): Promise<AiResponse> => {
  return new Promise((resolve, reject) => {
    fetch(
      ENDPOINTS.sendTextToAI({
        text,
        userId
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          notify.error({
            message: response.message || 'Error: We could not send your message now!'
          });
          reject();
        }
      })
      .catch((error) => {
        notify.error({
          message: error.message || "Error: We couldn't handle your message now!"
        });
        reject();
      });
  });
};
