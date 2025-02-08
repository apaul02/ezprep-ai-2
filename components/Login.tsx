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

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid Email"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
})

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })
      if(response?.error) {
        if(response.error.toLowerCase().includes("no user found with this email")) {
          form.setError("email", {
            type: "manual",
            message: "No user found with this email"
          })
        }else if (response.error.toLowerCase().includes("invalid password")) {
          form.setError("password", {
            type: "manual",
            message: "Invalid password"
          })
        }else {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive"
          })
        }
        
        console.log(response)
        console.log(values)
        return;
      }else if (response?.ok) {
        toast({
          title: "Success",
          description: "Successfully signed up"
        })
      }
      
      console.log(response?.status)
      console.log(response)
      console.log(values)
      router.push("/dashboard")
      
    }catch(e) {
      toast({
        title: "Error",
        description: `${e}`,
        variant: "destructive"
      })
    }
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
            <h2 className="text-4xl font-gloock mb-2">Login</h2>
            <p className="text-[#292828]/70">Continue learning journey</p>
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
                        placeholder="johnwick@example.com"
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
                        type="password" placeholder="Shhhh!"
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
                Dive In
              </Button>
            </form>
          </Form>
          <p className="text-center text-[#292828]/70 mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/signup" className="text-[#292828] hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}