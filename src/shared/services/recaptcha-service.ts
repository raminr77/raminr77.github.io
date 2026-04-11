import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

interface ReCaptchaResponse {
  score?: number;
  success: boolean;
  message?: string;
}

export const isValidGoogleReCaptcha = async ({
  token
}: {
  token: string;
}): Promise<boolean> => {
  const rawResponse = await fetch(ENDPOINTS.verifyReCaptcha, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ token }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const response = (await rawResponse.json()) as ReCaptchaResponse;

  if (!response.success) {
    notify.error({
      message: response.message ?? 'Error: We could not verify your reCAPTCHA token!'
    });
    throw new Error('We could not handle your request now!');
  }

  return true;
};
