import ChatInterface from "@/components/ChatInterface";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-[#fcf3e4]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#8b5e34] mb-8">AI Study Assistant</h1>
        <ChatInterface />
      </div>
    </div>
  );
}