"use client"

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Headphones,
  Video,
  FileText,
  Settings,
  MessageSquare,
  Home
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
  { icon: <BookOpen size={20} />, label: 'Flashcards', path: '/flashcards' },
  { icon: <Headphones size={20} />, label: 'Podcast Library', path: '/podcasts' },
  { icon: <Video size={20} />, label: 'Video Learning', path: '/videos' },
  { icon: <FileText size={20} />, label: 'Document Tools', path: '/documents' },
  { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/chat' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('/');

  return (
    <div 
      className={`
        relative h-screen bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 px-4 border-b border-gray-200">
        <Link href="/" className="flex items-center h-full gap-2 text-xl font-medium group">
          <Image
            src="/images/Graduation-Cap.png"
            alt="ezPrep Logo"
            width={24}
            height={24}
            className="hover:scale-110 transition-all duration-300"
          />
          {isExpanded && (
            <span className="animate-fade-in hover:scale-110 transition-transform duration-300 font-gloock">
              EzPrep.ai
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => setActiveItem(item.path)}
            className={`
              w-full flex items-center px-3 py-3 rounded-lg
              transition-all duration-200
              ${activeItem === item.path 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }
              ${!isExpanded && 'justify-center'}
            `}
          >
            <span className={`${activeItem === item.path ? 'text-indigo-600' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            {isExpanded && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          absolute bottom-4 right-0 transform translate-x-1/2
          w-8 h-8 rounded-full bg-white border border-gray-200
          flex items-center justify-center
          text-gray-500 hover:text-gray-700
          shadow-sm hover:shadow
          transition-all duration-200
        "
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;