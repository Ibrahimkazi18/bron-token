"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  const router = useRouter();

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-effect" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              BronToken
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">
              FAQ
            </Link>
            <Link href="/wallet-guide" className="text-gray-300 hover:text-yellow-400 transition-colors">
              Wallet Guide
            </Link>
            <Link href="/airdrop" className="text-gray-300 hover:text-yellow-400 transition-colors">
              Airdrop
            </Link>
            <Button 
              onClick={() => router.push("/#wallet")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 animate-glow"
            >
              Buy Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">
                FAQ
              </Link>
              <Link href="/wallet-guide" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Wallet Guide
              </Link>
              <Link href="/airdrop" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Airdrop
              </Link>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600">
                Buy Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
