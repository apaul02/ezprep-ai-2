"use client"
import { SignupForm } from "@/components/Signup"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
    if (session) {
      redirect("/dashboard");
    }
  return (
    <SignupForm />
  )
}