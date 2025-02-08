"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { redirect } from "next/navigation";
import prisma from "../db";

export async function getScores() {
  try {
    const session = await getServerSession(authOptions);
    if(!session) {
      redirect("/login")
    }
    const response = await prisma.flashcardHistory.findMany({
      where: {
        userId: Number(session.user.id)
      }
    })
    return response;
  }catch(error) {
    console.error(error)
  }
}