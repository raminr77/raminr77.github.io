import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

export const isValidGoogleReCaptcha = ({
  token
}: {
  token: string;
}): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINTS.verifyReCaptcha, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ token }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        if (response.success) {
          resolve(true);
        } else {
          notify.error({
            message:
              response.message || 'Error: We could verify your reCAPTCHA token now!'
          });
          reject(false);
        }
      })
      .catch((error) => {
        notify.error({
          message: error.message || "Error: We couldn't handle your reCAPTCHA now!"
        });
        reject(false);
      });
  });
};
