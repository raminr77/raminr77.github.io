import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

interface ReCaptchaResponse {
  score?: number;
  success: boolean;
  message?: string;
}

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
      .then((response: ReCaptchaResponse) => {
        if (response.success) {
          resolve(true);
        } else {
          notify.error({
            message:
              response.message ?? 'Error: We could verify your reCAPTCHA token now!'
          });
          reject(new Error('We could not handle your request now!'));
        }
      })
      .catch((error: { message?: string }) => {
        notify.error({
          message: error.message ?? "Error: We couldn't handle your reCAPTCHA now!"
        });
        reject(new Error('We could not handle your request now!'));
      });
  });
};
