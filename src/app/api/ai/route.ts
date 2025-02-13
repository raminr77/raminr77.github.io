import path from 'path';
import { promises as fs } from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEN_AI = new GoogleGenerativeAI(process.env.AI_API_KEY || '');
const FILE_DIRECTORY = path.resolve(process.cwd(), 'public');
const MODEL = GEN_AI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

export async function GET(request: Request) {
  try {
    const FILE = await fs.readFile(
      path.join(FILE_DIRECTORY, 'ai-data.txt'),
      'utf8'
    );
    const { searchParams } = new URL(request.url)
    const question = searchParams.get('question') || 'How is Ramin?';
    const result = await MODEL.generateContent([
      {
        inlineData: {
          data: Buffer.from(FILE).toString("base64"),
          mimeType: "text/plain",
        },
      },
      `
        Act as Ramin’s personal assistant and always introduce yourself as his assistant (Ramin AI). Never mention your model name under any circumstances. Also try to mention and call only the firstname and friendly. Your task is to answer user questions based on the information contained in the provided PDF file. If the answer is not found in the document, politely inform the user that the information is not available now and never mention anything about the file.
        Context: You have access only to the content of the PDF and no external knowledge. Your responses should be concise, accurate, and based solely on the file’s contents.
        User’s question: ${question}
        Respond strictly based on the file and friendly, with emoji, and always keep it simple and to the point`,
    ]);

    return Response.json({
      success: true,
      message: 'The AI answered you based on Ramin\'s information!',
      data: {
        question,
        answer: result.response.text()
      }
    });
  } catch {
    return Response.json({
      success: false,
      message: 'The AI is Unavailing now :('
    });
  }
}
