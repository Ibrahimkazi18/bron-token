import Link from "next/link"
import { Twitter, MessageCircle, Users, Crown } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                BronToken
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The ultimate LeBron James-inspired meme coin on Solana. Join the revolution and become part of the GOAT
              legacy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Users className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="/faq" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                FAQ
              </Link>
              <Link href="/wallet-guide" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Wallet Guide
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Whitepaper
              </a>
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Tokenomics
              </a>
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Roadmap
              </a>
              <a href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Audit
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} BronToken. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
