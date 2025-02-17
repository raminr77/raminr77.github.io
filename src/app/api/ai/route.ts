export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const question = searchParams.get('text') || 'Tell me more about Ramin, who is he?';
    return Response.json({
      success: true,
      message: "The AI answered you based on Ramin's information!",
      data: {
        question,
        answer: 'Hi'
      }
    });
  } catch {
    return Response.json({
      success: false,
      message: 'The AI is Unavailing now :('
    });
  }
}
