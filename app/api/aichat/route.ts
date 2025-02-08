import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Track conversation history (simple in-memory store)
const conversationHistory = new Map<string, string[]>(); // Use user ID as key

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
    
    // Get or initialize history
    const history = conversationHistory.get(userId) || [];
    history.push(`Student: ${message}`);

    // Enhanced prompt template
    // Detect if the question requires detailed explanation
    const needsExplanation = message.toLowerCase().includes('explain') ||
                            message.toLowerCase().includes('how') ||
                            message.toLowerCase().includes('why') ||
                            message.toLowerCase().includes('what is') ||
                            message.toLowerCase().includes('describe');

    const prompt = `
      You are a university tutor helping students learn. Adapt your responses based on these rules:

      1. Response Style:
      ${needsExplanation ? `
      - Break down concepts step-by-step
      - Use examples and analogies
      - End with a quick comprehension check
      ` : `
      - Give direct, concise answers (1-2 sentences max)
      - Be precise and factual
      - No unnecessary elaboration
      `}

      2. Context Awareness:
      - Remember previous conversation context
      - Reference relevant past discussions if applicable
      
      3. Formatting:
      - NO MARKDOWN
      - Use clear breaks between paragraphs
      - Important terms in _underscores_

      --- Conversation History ---
      ${history.join('\n')}
      ----------------------------

      Current Question: ${message}

      ${needsExplanation ? 'Provide a detailed explanation.' : 'Provide a concise answer.'}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedResponse = cleanMarkdown(response.text());
    
    // Update history (limit to last 5 exchanges)
    history.push(`Tutor: ${cleanedResponse}`);
    if (history.length > 10) history.splice(0, 2); // Keep 5 Q/A pairs
    conversationHistory.set(userId, history);

    return Response.json({ response: cleanedResponse });
  } catch (error) {
    console.error('Chat Error:', error);
    return Response.json(
      { error: 'Learning service unavailable. Try again later.' },
      { status: 503 }
    );
  }
}