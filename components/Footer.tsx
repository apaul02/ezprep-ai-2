import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#DFD2BC] py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  AI Flashcards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  AI Podcasts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  ezPerks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Documents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Subscribe</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-white" />
              <Button className="bg-blue-500 text-white">→</Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Hello, we are actively trying to reach you about your cars extended warranty
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-300">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm">
              Logo
            </Button>
            <div className="flex gap-4 text-sm text-gray-600">
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600">
              In
            </Link>
            <Link href="#" className="text-gray-600">
              f
            </Link>
            <Link href="#" className="text-gray-600">
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

