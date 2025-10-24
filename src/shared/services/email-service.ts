import { isValidGoogleReCaptcha } from './recaptcha-service';
import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

type requestData = {
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
};

interface SendEmailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = (data: requestData): Promise<boolean> => {
  // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
  return new Promise(async (resolve, reject) => {
    if (!data.recaptchaToken) {
      notify.error({ message: 'Missing reCAPTCHA token.' });
      reject(new Error('Missing reCAPTCHA token.'));
    }

    const isValidReCaptcha = await isValidGoogleReCaptcha({ token: data.recaptchaToken });

    if (isValidReCaptcha) {
      fetch(ENDPOINTS.sendMessage, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((rawResponse) => rawResponse.json())
        .then((response: SendEmailResponse) => {
          if (response.success) {
            notify.success({
              message: response.message || 'Your message has been sent successfully.'
            });
            resolve(response.success);
          } else {
            notify.error({
              message: response.message || 'We could not send your message now!'
            });
            reject(new Error('We could not send your message now!'));
          }
        })
        .catch(() => {
          notify.error({ message: 'We could not send your message now!' });
          reject(new Error('We could not send your message now!'));
        });
    } else {
      reject(new Error('Your reCAPTCHA verification failed.'));
    }
  });
};
