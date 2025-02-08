import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#DFD2BC] py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium text-[#292828] mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Interactive Flashcards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  AI Study Assistant
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Study Groups
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Rewards Program
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#292828] mb-4">Study Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Subject Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Study Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Practice Tests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#292828] mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Student Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Teacher Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#292828]/70 hover:text-[#292828]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-[#292828] mb-4">Newsletter</h3>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/50 border-[#292828]/10 focus:border-[#292828]/30 placeholder-[#292828]/50" 
              />
              <Button className="bg-[#292828] text-white hover:bg-[#292828]/90">→</Button>
            </div>
            <p className="text-sm text-[#292828]/70 mt-4">
              Get weekly study tips and updates on new features
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#292828]/10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image 
                src="/images/Graduation-Cap.png"
                alt="ezPrep Logo" 
                width={24} 
                height={24} 
              />
              <span className="text-[#292828] font-medium font-gloock ">ezPrep</span>
            </div>
            <div className="flex gap-4 text-sm text-[#292828]/70">
              <Link href="#" className="hover:text-[#292828]">Terms</Link>
              <Link href="#" className="hover:text-[#292828]">Privacy</Link>
              <Link href="#" className="hover:text-[#292828]">Cookies</Link>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-[#292828]/70 hover:text-[#292828]">
              LinkedIn
            </Link>
            <Link href="#" className="text-[#292828]/70 hover:text-[#292828]">
              Facebook
            </Link>
            <Link href="#" className="text-[#292828]/70 hover:text-[#292828]">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
