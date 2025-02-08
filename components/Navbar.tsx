import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
      <nav className="absolute top-0 w-full py-4 px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-medium group">
            <Image
              src="/images/Graduation-Cap.png"
              alt="ezPrep Logo"
              width={24}
              height={24}
              className="hover:scale-110 transition-all duration-300"
            />
            <span className="animate-fade-in hover:scale-110 transition-transform duration-300 font-gloock">EzPrep.ai</span>
          </Link>
          <div className="flex items-center gap-4 bg-[#1C1C1C] px-4 py-2 rounded-full">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-transparent hover:text-white hover:scale-105 transform transition-transform duration-200 hover:no-underline"
            >
              Playground
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-transparent hover:text-white hover:scale-105 transform transition-transform duration-200 hover:no-underline"
            >
              Donate
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-transparent hover:text-white hover:scale-105 transform transition-transform duration-200 hover:no-underline"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    )
  }
