import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Key, DollarSign, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

export default function WalletSetup() {
  const steps = [
    {
      icon: Download,
      title: "Install Phantom",
      description: "Download the Phantom wallet extension for your browser",
      color: "text-yellow-400",
    },
    {
      icon: Key,
      title: "Create a Wallet",
      description: "Set up your new wallet and save your seed phrase securely",
      color: "text-purple-400",
    },
    {
      icon: DollarSign,
      title: "Fund with SOL",
      description: "Add Solana (SOL) to your wallet to pay for transactions",
      color: "text-yellow-400",
    },
    {
      icon: Plus,
      title: "Add BronToken",
      description: "Use our contract address to add BronToken to your wallet",
      color: "text-purple-400",
    },
  ]

  return (
    <section className="py-20 bg-black/30 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              How to Setup Your Wallet
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            New to crypto? No problem! Follow these simple steps to get started with BronToken
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                {index + 1}
              </div>
              <CardContent className="p-6 text-center pt-12">
                <step.icon
                  className={`h-16 w-16 ${step.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 scroll-reveal">
          <Card className="glass-effect border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-center text-yellow-400">BronToken Contract Address</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-black/50 rounded-lg p-6 font-mono text-lg text-gray-300 break-all mb-4">
                mntKoQfF6gxwpi6xgDrzdoTuDQ51zD3EcyDTD3ucVXH
              </div>
              <p className="text-gray-400 mb-6">Copy this address to add BronToken to your wallet</p>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText("mntKoQfF6gxwpi6xgDrzdoTuDQ51zD3EcyDTD3ucVXH")
                    toast.success("Copied to clipboard")
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600">
                  Copy Address
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
