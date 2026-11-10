import { ENDPOINTS } from '@/shared/api/constants';

import { isValidGoogleReCaptcha } from './recaptcha-service';

interface RequestResumeData {
  email: string;
  recaptchaToken: string;
}

interface RequestResumeResponse {
  message?: string;
  success: boolean;
  downloadUrl?: string;
}

export interface ResumeDelivery {
  message: string;
  downloadUrl: string | null;
}

const DEFAULT_ERROR_MESSAGE = 'We could not send the resume now!';
const DEFAULT_SUCCESS_MESSAGE = 'The resume has been sent to your email.';
const SAFE_DOWNLOAD_PROTOCOLS: ReadonlyArray<string> = ['https:', 'http:'];

const toSafeDownloadUrl = (value: string | undefined): string | null => {
  if (!value) return null;
  try {
    const { protocol } = new URL(value);
    return SAFE_DOWNLOAD_PROTOCOLS.includes(protocol) ? value : null;
  } catch {
    return null;
  }
};

export const requestResume = async (data: RequestResumeData): Promise<ResumeDelivery> => {
  if (!data.recaptchaToken) {
    throw new Error('Missing reCAPTCHA token.');
  }

  await isValidGoogleReCaptcha({ token: data.recaptchaToken });

  const rawResponse = await fetch(ENDPOINTS.requestResume, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const response = (await rawResponse.json()) as RequestResumeResponse;

  if (!rawResponse.ok || !response.success) {
    throw new Error(response.message || DEFAULT_ERROR_MESSAGE);
  }

  return {
    message: response.message || DEFAULT_SUCCESS_MESSAGE,
    downloadUrl: toSafeDownloadUrl(response.downloadUrl)
  };
};
