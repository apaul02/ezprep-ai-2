"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#FCF3E4] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-gloock mb-2">Create Account</h2>
          <p className="text-[#292828]/70">Start your learning journey today</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#292828]" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
              id="name"
              placeholder="John Doe"
              required
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#292828]" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
              id="email"
              placeholder="johndoe@example.com"
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#292828]" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
              id="password"
              required
              type="password"
            />
          </div>

          <Button className="w-full py-6 bg-[#292828] text-white rounded-lg hover:bg-[#292828]/90 transition-colors">
            Create Account
          </Button>
        </form>

        <p className="text-center text-[#292828]/70">
          Already have an account?{" "}
          <Link href="/login" className="text-[#292828] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}