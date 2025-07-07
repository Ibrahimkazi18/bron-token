"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

export default function WalletIntegration() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [phantomAvailable, setPhantomAvailable] = useState(false)

  useEffect(() => {
    if ("solana" in window && (window as any).solana?.isPhantom) {
      setPhantomAvailable(true)
      ;(window as any).solana
        .connect({ onlyIfTrusted: true })
        .then(({ publicKey }: any) => {
          setWalletConnected(true)
          setPublicKey(publicKey.toString())
        })
        .catch(() => {})
    }
  }, [])

  const connectWallet = async () => {
    try {
      const resp = await (window as any).solana.connect()
      setWalletConnected(true)
      setPublicKey(resp.publicKey.toString())
      toast.success("Wallet Connected Successfully")
    } catch (err) {
      console.error("Wallet connection failed:", err)
      toast.error("Something went wrong")
    }
  }

  const disconnectWallet = async () => {
    try {
      await (window as any).solana.disconnect()
      setWalletConnected(false)
      setPublicKey(null)
      toast.success("Wallet Disconnected Successfully")
    } catch (err) {
      console.error("Wallet disconnection failed:", err)
      toast.error("Something went wrong")
    }
  }

  return (
    <section className="py-20 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Connect Your Phantom Wallet
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with BronToken in seconds. Connect your Phantom wallet to buy, trade, and hold the King's token.
            </p>
            <div className="space-y-4">
              <StepItem step={1} color="yellow" text="Connect your Phantom wallet" />
              <StepItem step={2} color="purple" text="Approve the connection" />
              <StepItem step={3} color="yellow" text="Start trading BronToken" />
            </div>
          </div>

          {/* Right Section */}
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
                {!phantomAvailable ? (
                  <p className="text-gray-300">Phantom not detected. Please install Phantom to continue.</p>
                ) : walletConnected ? (
                  <>
                    <p className="text-green-400 font-semibold mb-2">Wallet Connected</p>
                    <p className="text-sm text-gray-400 break-words mb-4">{publicKey}</p>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-purple-500 hover:from-yellow-500 to-purple-600"
                      onClick={() =>
                        window.open(
                          "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=YOUR_BRON_MINT_ADDRESS",
                          "_blank"
                        )
                      }
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy BronToken on Raydium
                    </Button>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 mt-4"
                      onClick={disconnectWallet}
                    >
                      Disconnect Wallet
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 mb-4">Connect your wallet to get started</p>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      onClick={connectWallet}
                    >
                      Connect Phantom Wallet
                    </Button>
                  </>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Don't have Phantom wallet?</p>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 bg-transparent"
                  onClick={() => window.open("https://phantom.app/CvL4j9eqJxfY1uzMJdfivjrEPfzB1PcW81thWN6iH7E7", "_blank")}
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

function StepItem({ step, text, color }: { step: number; text: string; color: "yellow" | "purple" }) {
  const colorClass = color === "yellow" ? "bg-yellow-400 text-black" : "bg-purple-500 text-white"
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 ${colorClass} rounded-full flex items-center justify-center font-bold`}>
        {step}
      </div>
      <span className="text-gray-300">{text}</span>
    </div>
  )
}
