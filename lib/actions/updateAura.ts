"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../db";

export async function updateAura(aura: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const response = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data: {
      aura: aura
    }
  })
}