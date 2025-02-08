import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function TestPage() {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/")
  }
  return (
    <div>
      <h1>Test Page</h1>
      <div>{JSON.stringify(session.user.username)}</div>
      <div>{JSON.stringify(session.user.name)}</div>
      <div>{JSON.stringify(session.user.email)}</div>
    </div>
  )
}