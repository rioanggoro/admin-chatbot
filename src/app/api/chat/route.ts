import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-1.5-pro-latest',
    });

    const result = await model.generateContent([message]);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return NextResponse.json(
      { error: 'Gagal menjawab pesan dari Gemini.' },
      { status: 500 }
    );
  }
}
