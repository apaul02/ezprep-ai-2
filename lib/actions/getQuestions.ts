"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export interface McqItem {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  answer: string;
}

export async function getQuestions(prompt: string): Promise<McqItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
    systemInstruction: `I am going to give you a paragraph or the name of the topic, generate me multiple choice types questions(strictly 20) like
  {
    question: { "type": "string" },
    choice1: { "type": "string" },
    choice2: { "type": "string" },
    choice3: { "type": "string" },
    choice4: { "type": "string" },
    answer: { "type": "string" },
  } FOR ANSWER STRICTLY MENTION THE NUMBER. 
      If the input contains harmful, illegal, or self-destructive content, respond with:
      {"error": "BAD_PROMPT"} instead of generating questions. 
      Format answers as numbers (1-4).`
  });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Check for safety block before processing
    if (response.promptFeedback?.blockReason) {
      throw new Error("BAD_PROMPT_SAFETY");
    }

    const text = response.text();
    const resultData = JSON.parse(text);

    // Check for model-generated error
    if (resultData.error === "BAD_PROMPT") {
      throw new Error("BAD_PROMPT_CONTENT");
    }

    // Validate MCQ structure
    if (!Array.isArray(resultData) || !resultData[0]?.question) {
      throw new Error("INVALID_FORMAT");
    }

    return resultData as McqItem[];
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "BAD_PROMPT_SAFETY":
        case "BAD_PROMPT_CONTENT":
          throw new Error(`Invalid request. Please contact the National Suicide Prevention Lifeline at 1-800-273-8255 if you're struggling.`);
        case "INVALID_FORMAT":
          throw new Error("Failed to generate valid questions. Please try again.");
      }
    }
    
    if (error instanceof SyntaxError) {
      throw new Error("Failed to process response. Please try again.");
    }

    throw new Error("An unexpected error occurred. Please try again.");
  }
}