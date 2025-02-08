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
import { signup } from "@/lib/actions/signup"

const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid Email"
  }),
  phone: z.string().min(10, {message: "Phone number must be at least 10 characters"}),
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
      phone: "",
      name: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      const response = await signup(values.name, values.email, values.phone, values.username, values.password)
      if(response.error) {
        if(response.error.toLowerCase().includes("email")) {
          form.setError("email", {
            type: "manual",
            message: "Email already exists, please use another email"
          })
        }else if(response.error.toLowerCase().includes("username")) {
          form.setError("username", {
            type: "manual",
            message: "Username already exists, please use another username"
          })
        }else if(response.error.toLowerCase().includes("phone")) {
          form.setError("phone", {
            type: "manual",
            message: "Phone number already exists, please use another phone number"
          })
        }else {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive"
          })
        }
        console.log(response);
        console.log(values)
        return;
      }
      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });
      if(signInResult?.error) {
        toast({
          title: "Error",
          description: signInResult.error,
          variant: "destructive"
        })
        return;
      }

      toast({
        title: "Account created",
        description: "You have successfully created an account",
      })
      console.log("signed up")

      router.push("/dashboard")
    }catch(error) {
      toast({
        title: "Error",
        description: "An error occurred, please try again",
        variant: "destructive"
      })
    }
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-[#FCF3E4] flex items-center justify-center p-2">
      <Card className="w-full max-w-md border border-[#292828]/10 bg-white/50 shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            {/* <CircleCheckBig 
              className="h-8 w-8 cursor-pointer text-[#292828]" 
              onClick={() => router.push("/")}
            /> */}
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-gloock mb-1">Create Account</h2>
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
                        placeholder="diehard@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#292828]">Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="px-4 py-3 rounded-lg border border-[#292828]/10 bg-white/50 focus:outline-none focus:border-[#292828]/30"
                        placeholder="98XXX8XXXX"
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
                        placeholder="Jake Peralta"
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
                        type="password" placeholder="ShhhTopSecret"
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
                        placeholder="the same from above"
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