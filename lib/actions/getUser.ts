"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      longestStreak: true,
      currentStreak: true,
      aura: true,
      coins: true
    }
  })
  return user;
}