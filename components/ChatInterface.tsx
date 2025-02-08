"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          userId: 'default-user' // TODO: Replace with actual user ID when auth is implemented
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }]);
    } catch (error) {
      let errorMessage = 'Sorry, I encountered an error processing your request. Please try again.';
      if (error instanceof Error) {
        const response = await fetch('/api/aichat').catch(() => null);
        if (response) {
          const data = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
          errorMessage = data.error || errorMessage;
        }
      }
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-[#DFD2BC] p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-[#8b5e34]">AI Study Assistant</h2>
        <p className="text-sm text-[#6d4a29]">Ask any academic questions - I&apos;m here to help!</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Start a conversation by typing your question below&apos;
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[#e6c199] text-[#8b5e34]'
                    : 'bg-[#DFD2BC] text-[#6d4a29]'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-[#DFD2BC] rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#8b5e34]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-[#DFD2BC] p-4 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b5e34] bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg bg-[#8b5e34] text-white flex items-center gap-2
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6d4a29]'}
            `}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
