"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { redirect } from "next/navigation";
import prisma from "../db";

export async function createFlashcardHistory(keyword: string, score: number, question: number) {
  try {
    const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/login")
  }
  const response = await prisma.flashcardHistory.create({
    data: {
      keyword: keyword,
      score: score,
      questions: question,
      userId: Number(session.user.id)
    }
  })
  }catch(error) {
    console.error(error)
  }

}