import { ENV } from '@/shared/constants';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: string =
      searchParams.get('text') || 'Tell me more about Ramin, who is he?';
    const user: string =
      searchParams.get('userId') ||
      `user-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;

    if (!ENV.AI_ENDPOINT || !ENV.AI_TOKEN) {
      return Response.json({
        success: false,
        message: 'The AI is Unavailable!'
      });
    }

    const aiRequest = await fetch(ENV.AI_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ENV.AI_TOKEN}`
      },
      body: JSON.stringify({
        user,
        query,
        inputs: {},
        response_mode: 'blocking'
      })
    });
    const aiResponse = (await aiRequest.json()) || {};

    return Response.json({
      success: true,
      message: "The AI answered you based on Ramin's information!",
      data: {
        question: query,
        answer: aiResponse.answer
      }
    });
  } catch {
    return Response.json({
      success: false,
      message: 'The AI is Unavailable now :('
    });
  }
}
