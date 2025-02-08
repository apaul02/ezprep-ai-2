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


export async function getQuestions(prompt: string){
  const session = await getServerSession(authOptions);
  if(!session?.user?.id){
    console.log("Not found")
  }
  

//   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
//   generationConfig: { responseMimeType: "application/json" },
//   systemInstruction: `I am going to give you a paragraph or the name of the topic, generate me multiple choice types questions(minimum 10, max 20) like
//   {
//     question: { "type": "string" },
//     choice1: { "type": "string" },
//     choice2: { "type": "string" },
//     choice3: { "type": "string" },
//     choice4: { "type": "string" },
//     answer: { "type": "string" },
//   } FOR ANSWER STRICTLY MENTION THE NUMBER.`
// });
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
  const questionsArray: {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
  }[] = JSON.parse(JSON.stringify([
    {
      question: "What was Mahatma Gandhi's birth name?",
      choice1: 'Mohandas Karamchand Gandhi',
      choice2: 'Mahatma Das Gandhi',
      choice3: 'Karamchand Uttamchand Gandhi',
      choice4: 'Mohan Das Gandhi',
      answer: '1'
    },
    {
      question: 'In which country did Gandhi first experience racial discrimination?',
      choice1: 'India',
      choice2: 'England',
      choice3: 'South Africa',
      choice4: 'United States',
      answer: '3'
    },
    {
      question: 'What philosophy of non-violent resistance did Gandhi advocate?',
      choice1: 'Satyagraha',
      choice2: 'Ahimsa',
      choice3: 'Karma Yoga',
      choice4: 'Buddha dharma',
      answer: '1'
    },
    {
      question: 'What was the name of the Ashram established by Gandhi in South Africa?',
      choice1: 'Sabarmati Ashram',
      choice2: 'Phoenix Settlement',
      choice3: 'Sevagram Ashram',
      choice4: 'Wardha Ashram',
      answer: '2'
    },
    {
      question: 'Which movement is Gandhi associated with to protest the British salt tax?',
      choice1: 'Quit India Movement',
      choice2: 'Non-Cooperation Movement',
      choice3: 'Salt Satyagraha (Dandi March)',
      choice4: 'Swadeshi Movement',
      answer: '3'
    },
    {
      question: 'What year did Gandhi return to India from South Africa?',
      choice1: '1912',
      choice2: '1915',
      choice3: '1920',
      choice4: '1905',
      answer: '2'
    },
    {
      question: 'Which British leader did Gandhi correspond with extensively?',
      choice1: 'Lord Curzon',
      choice2: 'Winston Churchill',
      choice3: 'Lord Mountbatten',
      choice4: 'Lord Irwin',
      answer: '4'
    },
    {
      question: "What was Gandhi's profession before becoming a political activist?",
      choice1: 'Doctor',
      choice2: 'Lawyer',
      choice3: 'Teacher',
      choice4: 'Journalist',
      answer: '2'
    },
    {
      question: 'What is Gandhi Jayanti?',
      choice1: "Gandhi's death anniversary",
      choice2: 'Indian Independence Day',
      choice3: "Gandhi's birthday",
      choice4: 'Republic Day',
      answer: '3'
    },
    {
      question: 'Where was Gandhi assassinated?',
      choice1: 'Ahmedabad',
      choice2: 'New Delhi',
      choice3: 'Bombay (Mumbai)',
      choice4: 'Calcutta (Kolkata)',
      answer: '2'
    },
    {
      question: 'Who assassinated Mahatma Gandhi?',
      choice1: 'Jawaharlal Nehru',
      choice2: 'Sardar Vallabhbhai Patel',
      choice3: 'Nathuram Godse',
      choice4: 'Bhagat Singh',
      answer: '3'
    },
    {
      question: "What is the term often used to describe Gandhi's philosophy of self-sufficiency and village industries?",
      choice1: 'Sarvodaya',
      choice2: 'Swadeshi',
      choice3: 'Swaraj',
      choice4: 'Ahimsa',
      answer: '2'
    },
    {
      question: 'What was the main objective of the Non-Cooperation Movement led by Gandhi?',
      choice1: 'Achieving complete independence immediately',
      choice2: 'Boycotting British institutions and goods',
      choice3: 'Promoting violence against the British',
      choice4: 'Demanding separate electorates for Muslims',
      answer: '2'
    },
    {
      question: 'Which of the following books was written by Mahatma Gandhi?',
      choice1: 'The Discovery of India',
      choice2: 'My Experiments with Truth',
      choice3: 'Gitanjali',
      choice4: 'Hind Swaraj',
      answer: '4'
    },
    {
      question: "What title was Gandhi often referred to, meaning 'Great Soul'?",
      choice1: 'Sardar',
      choice2: 'Pandit',
      choice3: 'Mahatma',
      choice4: 'Bapu',
      answer: '3'
    }
  ]));
  console.log(questionsArray)
  return questionsArray;
  
  
}
