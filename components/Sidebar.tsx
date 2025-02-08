"use client"

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    BookOpen,
    Headphones,
    Video,
    FileText,
    Settings,
    MessageSquare,
    Home,
    LogOut,
    X
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface NavItem {
    icon: React.ReactNode;
    label: string;
    path: string;
}

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'Flashcards', path: '/flashcard' },
    { icon: <Headphones size={20} />, label: 'Podcast Library', path: '/podcast' },
    { icon: <Video size={20} />, label: 'Video Learning', path: '/videolearning' },
    { icon: <FileText size={20} />, label: 'Document Tools', path: '/document' },
    { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/chat' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = React.useState(false); // Track mobile state

    React.useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIsMobile(); // Initial check
        window.addEventListener('resize', checkIsMobile); // Update on resize

        return () => {
            window.removeEventListener('resize', checkIsMobile); // Clean up
        };
    }, []);


    const isActivePath = (path: string) => {
        // Handle root dashboard path
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        // Handle other paths, checking if they're in the current pathname
        return path !== '/dashboard' && pathname.includes(path);
    };

    // Handle click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    const handleSidebarClick = () => {
      if (!isOpen) {
        setIsOpen(true);
      }
    };


    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`
          fixed lg:static inset-y-0 left-0 z-30
          flex flex-col bg-[#DFD2BC]
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
          ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100% - 5rem)] lg:translate-x-0'}
          flex lg:flex
       `}
                onClick={handleSidebarClick}
            >
                {/* Logo Section */}
                <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${isMobile && !isOpen ? 'justify-center' : ''}`}>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Image
                            src="/images/Graduation-Cap.png"
                            alt="ezPrep Logo"
                            width={24}
                            height={24}
                        />
                        {isOpen && (
                            <span className="font-gloock">
                                EzPrep.ai
                            </span>
                        )}
                    </Link>
                    {/* X Button (Visible only when expanded) */}
                    {isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="ml-auto lg:hidden text-[#8b5e34] hover:text-[#6d4a29]"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`
                w-full flex items-center px-3 py-3 rounded-lg
                transition-all duration-200
                ${isActivePath(item.path)
                                ? 'bg-[#e6c199] text-[#8b5e34]'
                                : 'text-[#8b5e34] hover:bg-[#e6c199] hover:bg-opacity-50'
                            }
                ${!isOpen && 'justify-center'}
              `}
                        >
                            <span className={`flex-shrink-0 ${isActivePath(item.path) ? 'text-[#8b5e34]' : 'text-[#8b5e34]'}`}>
                                {item.icon}
                            </span>
                            {isOpen && (
                                <span className="ml-3 font-medium whitespace-nowrap overflow-hidden">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Settings Button */}
                <button
                    onClick={() => router.push('/settings')}
                    className={`
            flex items-center px-3 py-3 mx-2 mt-2 rounded-lg
            text-[#8b5e34] hover:bg-[#e6c199] hover:bg-opacity-50
            transition-all duration-200
            ${!isOpen && 'justify-center'}
          `}
                >
                    <Settings size={20} />
                    {isOpen && <span className="ml-3 font-medium">Settings</span>}
                </button>

                {/* Logout Button */}
                <button
                    onClick={async() => {
                        // Add logout logic here
                        await signOut();
                        router.push('/login');
                    }}
                    className={`
            flex items-center px-3 py-3 m-2 rounded-lg
            text-[#8b5e34] hover:bg-[#e6c199] hover:bg-opacity-50
            transition-all duration-200
            ${!isOpen && 'justify-center'}
          `}
                >
                    <LogOut size={20} />
                    {isOpen && <span className="ml-3 font-medium">Logout</span>}
                </button>

                {/* Toggle Button */}
                {true && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
            absolute top-4 -right-3 flex
            w-6 h-6 rounded-full bg-[#DFD2BC] border border-[#e6c199]
            items-center justify-center
            text-[#8b5e34] hover:text-[#6d4a29]
            shadow-sm hover:shadow
            transition-all duration-200
          "
                    >
                        <ChevronRight size={14} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </aside>
        </>
    );
};

export default Sidebar;
