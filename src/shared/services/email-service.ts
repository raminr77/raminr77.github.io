import { isValidGoogleReCaptcha } from './recaptcha-service';
import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

type requestData = {
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
};

export const sendEmail = (data: requestData) => {
  return new Promise(async (resolve, reject) => {
    if (!data.recaptchaToken) {
      notify.error({ message: 'Missing reCAPTCHA token.' });
      reject();
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
        .then((response) => {
          if (response.success) {
            notify.success({
              message: response.message || 'Your message has been sent successfully.'
            });
            resolve(response);
          }
          notify.error({
            message: response.message || 'We could not send your message now!'
          });
          reject();
        })
        .catch(() => {
          notify.error({ message: 'We could not send your message now!' });
          reject();
        });
    } else {
      reject();
    }
  });
};
