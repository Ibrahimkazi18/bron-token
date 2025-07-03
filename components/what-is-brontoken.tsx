import { Card, CardContent } from "@/components/ui/card"
import { Crown, Zap, Users, Trophy } from "lucide-react"

export default function WhatIsBronToken() {
  return (
    <section className="py-20 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              What is BronToken?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The ultimate tribute to basketball royalty, built on Solana's lightning-fast blockchain. BronToken combines
            the GOAT's legacy with the power of decentralized finance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="glass-effect border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Royal Legacy</h3>
              <p className="text-gray-400">Built to honor the King's legendary career and cultural impact</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Solana Speed</h3>
              <p className="text-gray-400">Lightning-fast transactions with minimal fees on Solana</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
              <p className="text-gray-400">Powered by a passionate community of basketball and crypto fans</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Championship Potential</h3>
              <p className="text-gray-400">Designed for long-term success and community growth</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
