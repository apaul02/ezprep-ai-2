import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#fcf3e4]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#8b5e34] mb-8">AI Study Assistant</h1>
        <ChatInterface />
      </div>
    </div>
  );
}