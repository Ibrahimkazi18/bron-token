"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Key, DollarSign, Plus, ExternalLink, Shield, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import Head from "next/head"

export default function WalletGuidePage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: Download,
      image: "/images/phantomwallet.png",
      title: "Download Phantom Wallet",
      description: "Visit phantom.app and download the browser extension or mobile app",
      details: [
        "Available for Chrome, Firefox, Safari, and Edge browsers",
        "Also available on iOS and Android app stores",
        "Free to download and use",
      ],
    },
    {
      icon: Key,
      image: "/images/createwallet.jpg",
      title: "Create Your Wallet",
      description: "Set up a new wallet and secure your seed phrase",
      details: [
        "Click 'Create New Wallet' in the Phantom extension",
        "Write down your 12-word seed phrase on paper",
        "Store your seed phrase in a safe, offline location",
        "Never share your seed phrase with anyone",
      ],
    },
    {
      icon: DollarSign,
      image: "/images/fundwithsol.jpg",
      title: "Fund with SOL",
      description: "Add Solana (SOL) to your wallet for transactions",
      details: [
        "Buy SOL from exchanges like Coinbase, Binance, or FTX",
        "Send SOL to your Phantom wallet address",
        "You'll need SOL to pay for transaction fees",
        "Start with a small amount to test",
      ],
    },
    {
      icon: Plus,
      image: "/images/buybron.jpg",
      title: "Add BronToken",
      description: "Import BronToken using our contract address",
      details: [
        "Copy the BronToken contract address",
        "In Phantom, click 'Add Token' or the '+' button",
        "Paste the contract address",
        "BronToken will appear in your wallet",
      ],
    },
  ]

  return (
    <>
      <Head>
        <title>Solana Wallet Setup Guide | BronToken</title>
        <meta
          name="description"
          content="New to crypto? Follow our beginner-friendly step-by-step guide to set up Phantom Wallet, fund it with SOL, and add BronToken on the Solana network."
        />
        <meta
          name="keywords"
          content="phantom wallet guide, solana wallet setup, bron token guide, how to add bron token, install phantom, add solana token, crypto wallet tutorial"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Solana Wallet Setup Guide | BronToken" />
        <meta
          property="og:description"
          content="Learn how to install Phantom Wallet, fund it with SOL, and add BronToken. Step-by-step wallet guide for beginners."
        />
        <meta property="og:image" content="https://brontoken.com/images/wallet-guide-preview.png" />
        <meta property="og:url" content="https://brontoken.com/wallet-guide" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solana Wallet Guide | Add BronToken" />
        <meta
          name="twitter:description"
          content="Step-by-step instructions to create a Solana wallet using Phantom and add BronToken. Perfect for first-time crypto users."
        />
        <meta name="twitter:image" content="https://brontoken.com/images/wallet-guide-preview.png" />
      </Head>

      <div className="min-h-screen py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Wallet Setup Guide
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              New to crypto? No problem! Follow our step-by-step guide to set up your Solana wallet and start using
              BronToken.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="scroll-reveal">
                <Card className="glass-effect border-yellow-400/20 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-yellow-400/10 to-purple-500/10">
                    <CardTitle className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                        {index + 1}
                      </div>
                      <step.icon className="h-8 w-8 text-yellow-400" />
                      <span className="text-2xl text-white">{step.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <p className="text-lg text-gray-300 mb-6">{step.description}</p>
                        <ul className="space-y-3">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative">
                        <Image
                          src={step.image}
                          alt={`Step ${index + 1} illustration`}
                          width={500}
                          height={400}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Security Tips */}
          <div className="mt-20 scroll-reveal">
            <Card className="glass-effect border-red-400/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-400">
                  <Shield className="h-6 w-6" />
                  <span>Security Best Practices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span>Do's</span>
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Write down your seed phrase on paper</li>
                      <li>• Store it in a safe, offline location</li>
                      <li>• Double-check wallet addresses before sending</li>
                      <li>• Start with small amounts when testing</li>
                      <li>• Keep your wallet software updated</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span>Don'ts</span>
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Never share your seed phrase with anyone</li>
                      <li>• Don't store seed phrases digitally</li>
                      <li>• Don't click suspicious links</li>
                      <li>• Don't invest more than you can afford to lose</li>
                      <li>• Don't ignore security warnings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Address */}
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

          {/* Help Section */}
          <div className="mt-16 text-center scroll-reveal">
            <Card className="glass-effect border-purple-400/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-6">Join our community for step-by-step assistance and support</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="bg-gradient-to-r hover:text-white from-blue-500 to-blue-600 hover:from-blue-600 hover:border-white hover:border hover:to-blue-700"
                  >
                    <a
                    href="https://t.me/BronToken"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Telegram
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                  >
                    <a
                    href="https://discord.gg/qMWMXDa4"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
