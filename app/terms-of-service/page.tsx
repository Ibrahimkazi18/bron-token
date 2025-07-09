"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function TermsPage() {
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

  const terms = [
      {
          main: "1. Acceptance of Terms",
          sub: "By using BRON Token’s website or services, you agree to these terms. If not, do not use the platform.",
      },
      {
          main: "2. Eligibility",
          sub: "Users must be at least 13 years old and comply with applicable crypto laws in their jurisdiction.",
      },
      {
          main: "3. Use of the Site",
          sub: "Do not use bots, automation, or submit fake or fraudulent info. We may ban users or deny airdrops for abuse.",
      },
      {
          main: "4. Airdrop Disclaimer",
          sub: "Airdrops are free, voluntary, and limited. Token allocation is not guaranteed. Terms may change.",
      },
      {
          main: "5. No Financial Advice",
          sub: "Nothing on the site is financial, investment, or legal advice. DYOR (Do Your Own Research).",
      },
      {
          main: "6. Intellectual Property",
          sub: "All branding, visuals, and game code belong to BRON Token. Do not use or redistribute without permission.",
      },
      {
          main: "7. Limitation of Liability",
          sub: "We are not liable for indirect, incidental, or consequential damages resulting from using the site or services.",
      },
      {
          main: "8. Changes to Terms",
          sub: "We may modify these terms anytime. Continued use means you accept the latest version.",
      },
  ]

  return (
    <>
      <Head>
        <title>Terms of Service | Bron Token - Solana Meme Coin</title>
        <meta
          name="description"
          content="Read the official Terms of Service for Bron Token. Understand your rights, responsibilities, and conditions for using our Solana-based meme coin platform."
        />
        <meta
          name="keywords"
          content="bron token terms, brontoken terms of service, solana meme coin rules, crypto tos, bron coin airdrop terms, lebron crypto token legal"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | Bron Token" />
        <meta property="og:description" content="These terms govern your use of Bron Token and all associated services. Stay informed and secure." />
        <meta property="og:image" content="https://brontoken.com/images/BronTokenLogo.png" />
        <meta property="og:url" content="https://brontoken.com/terms-of-service" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service | Bron Token" />
        <meta name="twitter:description" content="Review Bron Token's official Terms of Service before participating in our Solana-based meme coin ecosystem." />
        <meta name="twitter:image" content="https://brontoken.com/images/BronTokenLogo.png" />
      </Head>

      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These Terms are effective from July 12, 2025. They apply to all users of https://brontoken.com.
            </p>
          </div>

          {/* term Items */}
          <div className="space-y-4 scroll-reveal">
            {terms.map((term, index) => (
              <Card
                key={index}
                className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{term.main}</h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 py-4 pb-6">
                      <p className="text-gray-300 leading-relaxed">{term.sub}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center scroll-reveal">
              <div className="mt-16 text-center scroll-reveal">
                  <Card className="glass-effect border-purple-400/20">
                      <CardContent className="p-8">
                          <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
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
      </div>
    </>
  )
}