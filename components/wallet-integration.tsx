import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WalletIntegration() {
  const router = useRouter();

  return (
    <section className="py-20 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Connect Your Phantom Wallet
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with BronToken in seconds. Connect your Phantom wallet to buy, trade, and hold the King's
              token.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                  1
                </div>
                <span className="text-gray-300">Connect your Phantom wallet</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span className="text-gray-300">Approve the connection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                  3
                </div>
                <span className="text-gray-300">Start trading BronToken</span>
              </div>
            </div>
          </div>

          <Card className="glass-effect border-yellow-400/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-400">
                <Wallet className="h-6 w-6" />
                <span>Phantom Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/30 rounded-lg p-6 text-center">
                <Wallet className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">Connect your wallet to get started</p>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={() => {
                    window.open(
                      "https://jup.ag/swap/SOL-CvL4j9eqJxfY1uzMJdfivjrEPfzB1PcW81thWN6iH7E7", 
                      "_blank"
                    )
                  }}
                >
                  Buy BronToken on Phantom
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Don't have Phantom wallet?</p>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 bg-transparent"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Download Phantom
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
