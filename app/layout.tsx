import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BronToken - The King of Memes on Solana",
  description:
    "BronToken is the ultimate LeBron James-inspired meme coin on Solana. Join the revolution and become part of the GOAT legacy.",
  keywords: "BronToken, Solana, meme coin, LeBron James, cryptocurrency, Lakers",
  icons: {
    icon: "https://brontoken.com/images/BronTokenLogo.png", 
  },
  openGraph: {
    title: "BronToken - The King of Memes on Solana",
    description: "The ultimate LeBron James-inspired meme coin on Solana",
    images: ["https://brontoken.com/images/BronTokenLogo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BronToken - The King of Memes on Solana",
    description: "The ultimate LeBron James-inspired meme coin on Solana",
    images: ["https://brontoken.com/images/BronTokenLogo.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Navbar />
        <Toaster />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
