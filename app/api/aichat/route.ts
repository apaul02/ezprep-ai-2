import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const conversationHistory = new Map<string, string[]>();

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/#{1,4}/g, '')
    .replace(/_([^_]+)_/g, '$1');
}

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json();

    if (!message?.trim() || !userId) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const history = conversationHistory.get(userId) || [];
    history.push(`Student: ${message}`);

    const needsExplanation = message.toLowerCase().includes('explain') || 
                            /(how|why|detail|expand|elaborate)/i.test(message);

    const prompt = `
      You are Athena, the friendly school tutor AI. Follow these guidelines:

      1. Response Foundation:
      🧠 Start with 1-sentence simple definition
      🔢 Break into 3-5 numbered key points
      🌟 Real-world example (school relatable)
      ➡️ Analogy ("Like how...")
      ⚠️ Common mistakes warning

      2. Explanation Depth:
      ${needsExplanation ? `
      📚 Add 2 more examples (1 simple, 1 complex)
      📊 Text-based diagram description
      🔄 Compare/contrast with related concept
      🎓 Memory tip (mnemonic/word association)
      ❓ End with 2 practice questions
      ` : `
      💡 Keep examples to 1 primary instance
      📝 Focus on core concept only
      `}

      3. Student-Friendly Format:
      - Use _emphasis_ for key terms
      - Paragraph breaks every 3-4 sentences
      - No markdown ever
      - Max 150 words ${needsExplanation ? '300' : '150'} words

      4. Conversation Flow:
      🔗 Reference last 2-3 messages naturally
      🤔 Ask "Should I rephrase any part?"
      📌 End with "Want me to simplify/expand something?"

      --- History ---
      ${history.slice(-6).join('\n')}
      -----------------

      Student Query: "${message}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedResponse = cleanMarkdown(response.text());

    history.push(`Athena: ${cleanedResponse}`);
    if (history.length > 10) history.splice(0, 2);
    conversationHistory.set(userId, history);

    return Response.json({ response: cleanedResponse });
  } catch (error) {
    console.error('Tutor Error:', error);
    return Response.json(
      { error: 'Study session paused. Try again in a moment!' },
      { status: 503 }
    );
  }
}