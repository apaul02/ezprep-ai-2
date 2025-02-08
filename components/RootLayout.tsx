"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

export default function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Routes where we don't want to show the sidebar
  const noSidebarRoutes = ['/', '/login', '/signup'];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      <main className={`flex-1 overflow-auto bg-[#fcf3e4] ${showSidebar ? 'p-8' : 'p-0'}`}>
        {children}
      </main>
    </div>
  );
}
