import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
      <nav className="absolute top-0 w-full py-4 px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-medium group">
            <GraduationCap className="h-6 w-6 animate-bounce hover:animate-spin transition-all duration-300" />
            <span className="animate-fade-in">EzPrep.ai</span>
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
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    )
  }
