import { NextResponse } from "next/server";

const EMAIL_CONFIG = {
  SERVICE_ID: 'service_5s3i4sb',
  TEMPLATE_ID: 'template_i8mclrk',
  PUBLIC_KEY: '31vFs1V9a-H6c5DwW'
};

const EMAIL_SERVER_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const body = JSON.stringify({
      template_params: formData,
      user_id: EMAIL_CONFIG.PUBLIC_KEY,
      service_id: EMAIL_CONFIG.SERVICE_ID,
      template_id: EMAIL_CONFIG.TEMPLATE_ID,
    });
    await fetch(EMAIL_SERVER_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });
    return NextResponse.json({ message: 'Your message has been sent successfully.' });
  } catch {
    return NextResponse.json({
      message: 'We could not send your message now!'
    }, { status: 400 })
  }
}
