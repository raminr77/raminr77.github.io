import { ENDPOINTS } from '@/shared/api/constants';
import { notify } from '@/shared/helpers';

interface ReCaptchaResponse {
  score?: number;
  success: boolean;
  message?: string;
}

const DEFAULT_ERROR_MESSAGE = 'Error: We could not verify your reCAPTCHA token!';

export const isValidGoogleReCaptcha = async ({
  token
}: {
  token: string;
}): Promise<boolean> => {
  let response: ReCaptchaResponse;

  try {
    const rawResponse = await fetch(ENDPOINTS.verifyReCaptcha, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ token }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    response = (await rawResponse.json()) as ReCaptchaResponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
    notify.error({ message });
    throw error instanceof Error ? error : new Error(message);
  }

  if (!response.success) {
    notify.error({ message: response.message ?? DEFAULT_ERROR_MESSAGE });
    throw new Error('We could not handle your request now!');
  }

  return true;
};
