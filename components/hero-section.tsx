"use client"

import { Button } from "@/components/ui/button"
import { Crown, Zap, Wallet, DollarSign, Trophy } from "lucide-react"
import Token3D from "./Token3D"
import { useRouter } from "next/navigation"


export default function HeroSection({ scrollToWallet }: { scrollToWallet: () => void }) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <DollarSign className="h-12 w-12 text-yellow-400 opacity-30" />
      </div>
      <div className="absolute top-20 right-10 animate-float">
        <Crown className="h-12 w-12 text-yellow-400 opacity-30" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "2s" }}>
        <Zap className="h-16 w-16 text-purple-400 opacity-30" />
      </div>
      <div className="absolute bottom-20 left-10 animate-float" style={{ animationDelay: "2s" }}>
        <Trophy className="h-16 w-16 text-purple-400 opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-purple-500 bg-clip-text text-transparent">
                  The King of Memes
                </span>
                <br />
                <span className="text-white">is Here</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                BronToken on Solana - Where basketball royalty meets crypto revolution
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToWallet}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold hover:from-yellow-500 hover:to-yellow-600 animate-glow text-lg px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-lg px-8 py-4 bg-transparent"
                onClick={() => router.push("/airdrop")}
              >
                Get Airdrop
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToWallet}
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 text-lg px-8 py-4 bg-transparent"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">1B</div>
                <div className="text-gray-400">Total Supply</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50M</div>
                <div className="text-gray-400">Airdrop Pool</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-gray-400">GOAT Status</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-full blur-3xl"></div> */}
              <Token3D  className='h-[500px] bg-transparent w-xl animate-float ml-10 pt-10 pb-10' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
