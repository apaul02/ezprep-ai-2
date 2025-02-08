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


export async function getResponse(prompt: string){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    console.log("Not found")
  }
  

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction: `I am going to give you a paragraph or the name of the topic, generate me multiple choice types questions(minimum 10, max 20) like
  {
    question: { "type": "string" },
    choice1: { "type": "string" },
    choice2: { "type": "string" },
    choice3: { "type": "string" },
    choice4: { "type": "string" },
    answer: { "type": "string" },
  } FOR ANSWER STRICTLY MENTION THE NUMBER.`
});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const questionsArray: {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
  }[] = JSON.parse(text);
  console.log(questionsArray)
  return questionsArray;
  
  
}
