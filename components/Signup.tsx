'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { CircleCheckBig } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid Email"
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters"
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter()
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      name: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    // ... existing onSubmit logic ...
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-[#FCF3E4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-[#292828]/10 bg-white/50 shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            {/* <CircleCheckBig 
              className="h-8 w-8 cursor-pointer text-[#292828]" 
              onClick={() => router.push("/")}
            /> */}
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-gloock mb-2">Create Account</h2>
            <p className="text-[#292828]/70">Start your learning journey today</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        placeholder="johndoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>     
                )}
              />
              <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <Button 
                className="w-full py-6 bg-[#292828] text-white rounded-lg hover:bg-[#292828]/90 transition-colors text-base"
                type="submit"
              >
                Create Account
              </Button>
            </form>
          </Form>
          <p className="text-center text-[#292828]/70 mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#292828] hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}