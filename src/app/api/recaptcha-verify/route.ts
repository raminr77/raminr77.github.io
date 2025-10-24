import { ENDPOINTS } from '@/shared/api/constants';
import { ENV } from '@/shared/constants';

interface GoogleResponse {
  score?: number;
  action?: string;
  success: boolean;
}

export async function POST(request: Request) {
  try {
    const { token } = (await request.json()) as { token: string };

    if (!ENV.GOOGLE_RECAPTCHA_SECRET_KEY) {
      return Response.json({
        success: false,
        message: 'The reCAPTCHA is Unavailable!'
      });
    }

    if (!token) {
      return Response.json({
        success: false,
        message: 'Missing reCAPTCHA Token!'
      });
    }

    const url = new URL(ENDPOINTS.googleVerifyReCaptcha);
    url.searchParams.append('response', token);
    url.searchParams.append('secret', ENV.GOOGLE_RECAPTCHA_SECRET_KEY);

    const googleRequest = await fetch(url, {
      method: 'POST',
      cache: 'no-store'
    });

    const googleResponse = (await googleRequest.json()) as GoogleResponse;

    if (!googleResponse.success) {
      return Response.json({
        success: false,
        details: googleResponse,
        message: 'reCAPTCHA failed.'
      });
    }
    if (typeof googleResponse.score === 'number' && googleResponse.score < 0.5) {
      return Response.json({
        success: false,
        details: googleResponse,
        message: 'Low reCAPTCHA score!'
      });
    }
    if (googleResponse.action && googleResponse.action !== 'contact_form_submit') {
      return Response.json({
        success: false,
        details: googleResponse,
        message: 'Invalid reCAPTCHA action!'
      });
    }

    return Response.json({
      success: true,
      message: 'Your reCAPTCHA is valid.'
    });
  } catch {
    return Response.json({
      success: false,
      message: 'Invalid reCAPTCHA!'
    });
  }
}
