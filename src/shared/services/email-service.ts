import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';
import { ENV } from '@/shared/constants';

type requestData = {
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
};

const isValidGoogleReCaptcha = async (recaptchaToken: string): Promise<boolean> => {
  const googleRequest = await fetch(ENDPOINTS.verifyGoogleReCaptcha, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      response: recaptchaToken,
      secret: ENV.GOOGLE_RECAPTCHA_SECRET_KEY!
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const res = (await googleRequest.json()) as {
    score?: number;
    success: boolean;
    action?: string;
    'error-codes'?: string[];
  };

  if (!res.success) {
    notify.error({ message: 'reCAPTCHA failed.' });
    console.error(res['error-codes'] || []);
    return false;
  }
  if (typeof res.score === 'number' && res.score < 0.5) {
    notify.error({ message: 'Low reCAPTCHA score!' });
    return false;
  }
  if (res.action && res.action !== 'contact_form_submit') {
    notify.error({ message: 'Invalid reCAPTCHA action!' });
    return false;
  }
  return true;
};

const sendEmailRequest = async (data: requestData): Promise<boolean> => {
  return fetch(ENDPOINTS.sendMessage, {
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
        return true;
      }
      notify.error({
        message: response.message || 'We could not send your message now!'
      });
      return false;
    })
    .catch(() => {
      notify.error({ message: 'We could not send your message now!' });
      return false;
    });
};

export const sendEmail = (data: requestData) => {
  return new Promise(async (resolve, reject) => {
    if (!data.recaptchaToken) {
      notify.error({ message: 'Missing reCAPTCHA token' });
      reject();
    }

    const isValidReCaptcha = await isValidGoogleReCaptcha(data.recaptchaToken);

    if (isValidReCaptcha) {
      const result = await sendEmailRequest(data);
      if (result) {
        resolve(result);
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};
