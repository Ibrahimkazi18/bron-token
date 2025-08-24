'use client'

import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import '@solana/wallet-adapter-react-ui/styles.css';
import { ThemeProvider } from "@/components/theme-provider"
import { WalletContextProvider } from "@/components/wallet-provider"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export default function MemeTokenLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Toaster />
      <WalletContextProvider>
        <main className={inter.className}>
          {children}
        </main>
      </WalletContextProvider>
    </ThemeProvider>
  )
}