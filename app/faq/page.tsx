"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

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

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What is BronToken?",
      answer:
        "BronToken is a meme coin inspired by LeBron James, built on the Solana blockchain. It celebrates the King's legendary career and cultural impact while providing a fun way for basketball and crypto fans to connect.",
    },
    {
      question: "Is this affiliated with LeBron James?",
      answer:
        "No, BronToken is not officially affiliated with LeBron James. It's a fan-created tribute token that celebrates his legacy and impact on basketball culture.",
    },
    {
      question: "How do I buy BronToken?",
      answer:
        "You can buy BronToken through decentralized exchanges on Solana. First, you'll need a Solana wallet like Phantom, some SOL for transaction fees, then you can swap SOL for BronToken using our contract address.",
    },
    {
      question: "What wallet do I need?",
      answer:
        "We recommend using Phantom Wallet, which is the most popular and user-friendly Solana wallet. Other compatible wallets include Solflare and Slope.",
    },
    {
      question: "When is the airdrop?",
      answer:
        "Airdrop details will be announced on our official social media channels. Make sure to follow us on Twitter and join our Telegram group for the latest updates.",
    },
    {
      question: "Is this safe?",
      answer:
        "While we've taken security measures in developing BronToken, please remember that all cryptocurrency investments carry risk. Only invest what you can afford to lose and always do your own research.",
    },
    {
      question: "What makes BronToken different?",
      answer:
        "BronToken combines the cultural phenomenon of LeBron James with the speed and efficiency of the Solana blockchain. It's built by basketball fans for basketball fans, with a strong community focus.",
    },
    {
      question: "How can I join the community?",
      answer:
        "Join our growing community on Twitter, Telegram, and Discord. We regularly host events, giveaways, and discussions about basketball and crypto.",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Got questions about BronToken? We've got answers. Find everything you need to know about the King's token.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 scroll-reveal">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 py-4 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center scroll-reveal">
          <Card className="glass-effect border-purple-400/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-6">Join our community channels for real-time support and discussions</p>
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
  )
}
