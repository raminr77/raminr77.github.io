import { ENDPOINTS } from '@/shared/api/constants';
import { ENV } from '@/shared/constants';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

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

    const googleRequest = await fetch(ENDPOINTS.googleVerifyReCaptcha, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({
        response: token,
        secret: ENV.GOOGLE_RECAPTCHA_SECRET_KEY!
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const googleResponse = await googleRequest.json();

    if (!googleResponse.success) {
      return Response.json({ success: false, message: 'reCAPTCHA failed.' });
    }
    if (typeof googleResponse.score === 'number' && googleResponse.score < 0.5) {
      return Response.json({ success: false, message: 'Low reCAPTCHA score!' });
    }
    if (googleResponse.action && googleResponse.action !== 'contact_form_submit') {
      return Response.json({ success: false, message: 'Invalid reCAPTCHA action!' });
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
