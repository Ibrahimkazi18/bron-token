"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PolicyPage() {
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

  const policies = [
    {
        main: "1. Introduction",
        sub: "We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our services.",
    },
    {
        main: "2. What We Collect",
        sub: "We collect wallet addresses, limited usage data, and public profile info for social campaigns (e.g., Twitter username).",
    },
    {
        main: "3. How We Use Your Data",
        sub: "We use the data to distribute tokens, verify eligibility for airdrops, prevent fraud, and improve website performance.",
    },
    {
        main: "4. No Sale of Personal Data",
        sub: "We do not sell, rent, or trade your personal data. Ever.",
    },
    {
        main: "5. Cookies & Tracking",
        sub: "We use minimal analytics and non-intrusive cookies solely for traffic and performance tracking. No personal tracking is done.",
    },
    {
        main: "6. Third-Party Services",
        sub: "We may use Google Forms, Discord, Twitter, and other platforms which have their own privacy policies.",
    },
    {
        main: "7. Security",
        sub: "We use reasonable technical and organizational measures to protect your data. No internet method is 100% secure.",
    },
    {
        main: "8. Children's Privacy",
        sub: "BRON Token is not intended for users under 13 years old. We do not knowingly collect data from children.",
    },
    {
        main: "9. Changes to This Policy",
        sub: "We may update our policy. Changes will be reflected on this page with a new effective date.",
    },
  ]


  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
              Privacy Policy - BRON 
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            This Privacy Policy is effective as of July 12, 2025. It governs how we handle your data when using https://brontoken.com.
          </p>
        </div>

        {/* policy Items */}
        <div className="space-y-4 scroll-reveal">
          {policies.map((policy, index) => (
            <Card
              key={index}
              className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{policy.main}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 py-4 pb-6">
                    <p className="text-gray-300 leading-relaxed">{policy.sub}</p>
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
  )
}
