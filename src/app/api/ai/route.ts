export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: string =
      searchParams.get('text') || 'Tell me more about Ramin, who is he?';
    const user: string =
      searchParams.get('userId') ||
      `user-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;

    const AI_URL = process.env.D_AI_ENDPOINT;
    const AI_TOKEN = process.env.D_AI_SECRET_KEY;

    if (!AI_URL || !AI_TOKEN) {
      return Response.json({
        success: false,
        message: 'The AI is Unavailable!'
      });
    }

    const aiRequest = await fetch(AI_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_TOKEN}`
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
      message: 'The AI is Unavailing now :('
    });
  }
}
