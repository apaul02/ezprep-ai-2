// app/podcast/page.tsx
'use client'

import { useState } from 'react';
import PodcastPlayer from '@/components/PodcastPlayer';
import { DialogueTurn } from '@/types/podcast';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function PodcastPage() {
  const session = useSession();
    if(!session.data) {
      redirect("/login")
    }
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState<DialogueTurn[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInput, setShowInput] = useState(true);

  const generateConversation = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      const conversationWithTiming = data.conversation.map((msg: any, index: number) => ({
        ...msg,
        startTime: index * 5
      }));
      setConversation(conversationWithTiming);
      setShowInput(false);
    } catch (error) {
      console.error('Failed to generate conversation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const InputComponent = () => (
    <>
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What should we talk about?"
          className="w-full p-4 rounded-full border-2 border-[#292828] bg-transparent text-[#292828] placeholder-[#292828]/50 focus:outline-none focus:ring-2 focus:ring-[#292828] mb-4"
        />
        <button
          onClick={generateConversation}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-4 bg-[#292828] text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
        >
          {isGenerating ? 'Generating...' : 'Generate Conversation'}
        </button>
      </div>
    </>
  );

  return (
    <PodcastPlayer 
      conversation={conversation} 
      isGenerating={isGenerating}
    >
      {showInput && <InputComponent />}
    </PodcastPlayer>
  );
}
