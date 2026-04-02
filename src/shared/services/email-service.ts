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

export const sendEmail = async (data: requestData): Promise<boolean> => {
  if (!data.recaptchaToken) {
    notify.error({ message: 'Missing reCAPTCHA token.' });
    throw new Error('Missing reCAPTCHA token.');
  }

  // Throws (with notification) if reCAPTCHA verification fails
  await isValidGoogleReCaptcha({ token: data.recaptchaToken });

  const rawResponse = await fetch(ENDPOINTS.sendMessage, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const response = (await rawResponse.json()) as SendEmailResponse;

  if (!response.success) {
    notify.error({
      message: response.message || 'We could not send your message now!'
    });
    throw new Error(response.message || 'We could not send your message now!');
  }

  notify.success({
    message: response.message || 'Your message has been sent successfully.'
  });
  return true;
};
