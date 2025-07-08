"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { forwardRef } from "react"

const WalletIntegration = forwardRef<HTMLDivElement>((_, ref) => {

  return (
    <section id="wallet" ref={ref} className="py-20 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Connect Your Wallet
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with BronToken in seconds. Connect your wallet on raydium to buy, trade, and hold the King's token.
            </p>
            <div className="space-y-4">
              <StepItem step={1} color="yellow" text="Connect your Wallet with Raydium" />
              <StepItem step={2} color="purple" text="Approve the connection" />
              <StepItem step={3} color="yellow" text="Start trading BronToken" />
            </div>
          </div>

          {/* Right Section */}
          <Card className="glass-effect border-yellow-400/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-400">
                <Wallet className="h-6 w-6" />
                <span>Raydium DEX</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/30 rounded-lg p-6 text-center">
                <>
                  <iframe
                    src="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=CvL4j9eqJxfY1uzMJdfivjrEPfzB1PcW81thWN6iH7E7"
                    width="100%"
                    height="600"
                    style={{ border: "none", borderRadius: "16px" }}
                    allow="clipboard-write"
                  />

                </>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
})

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


export default WalletIntegration;