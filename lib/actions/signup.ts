"use server"
import bcrypt from "bcryptjs";
import prisma from "../db"

export type signupResult = {
  message: string,
  error?: string
}

export async function signup(name: string, email: string, phone: string, username: string, password: string): Promise<signupResult> {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
          { phone }
        ]
      },
    select: {
      email: true,
      username: true,
      phone: true
    }
    });
    if(existingUser) {
      if(existingUser.email === email) {
        return {
          message: "Email already exists",
          error: "email"
        }
      }
      if(existingUser.username === username) {
        return {
          message: "Username already exists",
          error: "username"
        }
      }
      if(existingUser.phone === phone) {
        return {
          message: "Phone number already exists",
          error: "phone"
        }
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        username,
        password: hashedPassword
      }
    })
    return {
      message: "User created successfully"
    }
  }catch(error) {
    return {
      message: "An error occurred",
      error: `${error}`
    }
  }
}