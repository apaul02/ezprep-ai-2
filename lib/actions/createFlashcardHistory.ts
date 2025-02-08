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
  await updateUserStreak(Number(session.user.id));
  }catch(error) {
    console.error(error)
  }

}

async function updateUserStreak(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActiveDate: true, currentStreak: true, longestStreak: true }
  });

  if (!user) return;

  const now = new Date();
  const today = stripTime(now);
  const lastActive = user.lastActiveDate ? stripTime(user.lastActiveDate) : null;

  let newStreak = user.currentStreak;

  if (!lastActive) {
    // First activity: start streak at 1
    newStreak = 1;
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive.getTime() === yesterday.getTime()) {
      // Consecutive day: increment streak
      newStreak++;
    } else if (lastActive.getTime() < yesterday.getTime()) {
      // Broken streak: reset to 1
      newStreak = 1;
    }
    // Else: same day, no change
  }

  // Update longest streak if needed
  const longestStreak = Math.max(user.longestStreak, newStreak);

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      longestStreak: longestStreak,
      lastActiveDate: now // Updates to current timestamp
    }
  });
}

// Helper to strip time from a Date (compare only dates)
function stripTime(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}