// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(`
      Create a natural, casual conversation between two male friends named Marcus and James about: ${prompt}
      Make it sound very natural and conversational, like real friends talking.
      Use proper sentence structure and natural dialogue format.
      Include at least 6-8 exchanges.
      Don't use asterisks or speaker labels, just their names followed by what they say.
      Example format:
      Marcus: Hey, did you catch that game last night?
      James: Yeah man, it was incredible! That last-minute play had me on the edge of my seat.
    `);
    
    const response = await result.response;
    const text = response.text();
    
    // Parse the conversation into turns
    const turns = text.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [speaker, ...content] = line.split(':');
        return {
          role: speaker.trim() === 'Marcus' ? 'user' : 'assistant',
          speaker: speaker.trim(),
          content: content.join(':').trim()
        };
      });

    return Response.json({ conversation: turns });
  } catch (error) {
    return Response.json({ error: 'Failed to generate conversation' }, { status: 500 });
  }
}