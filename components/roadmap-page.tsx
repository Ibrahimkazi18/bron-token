"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Globe,
  Crown,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Gamepad2,
  Trophy,
  Target,
  Building,
  Smartphone,
} from "lucide-react"

export default function RoadmapPage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 },
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const roadmapItems = [
    {
      title: "Genesis Launch",
      date: "Q1 2024",
      description:
        "Official BronToken launch on Solana blockchain with initial liquidity pools. Smart contract deployment and security audits completed.",
      icon: Rocket,
      status: "completed",
      details: [
        "Smart contract deployed",
        "Initial liquidity: $500K",
        "Security audit passed",
        "Community launch event",
      ],
    },
    {
      title: "Community Foundation",
      date: "Q1 2024",
      description:
        "Building the strongest crypto community with exclusive Discord channels, Twitter campaigns, and early adopter rewards program.",
      icon: Users,
      status: "completed",
      details: [
        "Discord server: 10K+ members",
        "Twitter followers: 25K+",
        "Ambassador program launched",
        "Community governance voting",
      ],
    },
    {
      title: "Major DEX Listings",
      date: "Q2 2024",
      description:
        "Strategic listings on top-tier decentralized exchanges including Raydium, Orca, and Jupiter for maximum accessibility.",
      icon: TrendingUp,
      status: "completed",
      details: [
        "Raydium listing completed",
        "Orca integration live",
        "Jupiter aggregator support",
        "24/7 trading availability",
      ],
    },
    {
      title: "LeBron NFT Collection",
      date: "Q3 2024",
      description:
        "Exclusive 10,000 piece NFT collection featuring legendary LeBron moments, with special utilities and staking rewards.",
      icon: Crown,
      status: "in-progress",
      details: [
        "Artwork creation: 80% complete",
        "Utility design finalized",
        "Staking mechanism ready",
        "Whitelist: 5K holders",
      ],
    },
    {
      title: "Mobile App Launch",
      date: "Q3 2024",
      description:
        "Native iOS and Android app for portfolio tracking, staking, and exclusive community features with push notifications.",
      icon: Smartphone,
      status: "in-progress",
      details: ["iOS development: 70%", "Android development: 65%", "Beta testing phase", "App store submission prep"],
    },
    {
      title: "Gaming Integration",
      date: "Q4 2024",
      description:
        "Integration with popular blockchain games, allowing BRON tokens to be used for in-game purchases and rewards.",
      icon: Gamepad2,
      status: "upcoming",
      details: ["Partnership negotiations", "Game integration SDK", "Play-to-earn mechanics", "Tournament prize pools"],
    },
    {
      title: "Staking & DeFi Hub",
      date: "Q4 2024",
      description:
        "Launch comprehensive DeFi platform with staking pools, yield farming, and liquidity mining with up to 150% APY.",
      icon: Zap,
      status: "upcoming",
      details: [
        "Staking pools: 3 tiers",
        "Yield farming protocols",
        "Liquidity mining rewards",
        "Auto-compound features",
      ],
    },
    {
      title: "Global Partnerships",
      date: "Q1 2025",
      description:
        "Strategic partnerships with major sports brands, celebrity endorsements, and integration with traditional finance platforms.",
      icon: Globe,
      status: "upcoming",
      details: [
        "Sports brand collaborations",
        "Celebrity partnerships",
        "Traditional finance bridges",
        "Global marketing campaign",
      ],
    },
    {
      title: "Metaverse Expansion",
      date: "Q1 2025",
      description:
        "Virtual real estate in major metaverse platforms, exclusive BronToken holder events, and virtual merchandise store.",
      icon: Building,
      status: "upcoming",
      details: [
        "Virtual land acquisition",
        "Metaverse events space",
        "Digital merchandise",
        "VR experience development",
      ],
    },
    {
      title: "Layer 2 Integration",
      date: "Q2 2025",
      description:
        "Multi-chain expansion to Ethereum Layer 2 solutions, Polygon, and Arbitrum for reduced fees and faster transactions.",
      icon: Shield,
      status: "upcoming",
      details: ["Polygon bridge deployment", "Arbitrum integration", "Cross-chain swaps", "Unified wallet experience"],
    },
    {
      title: "DAO Governance",
      date: "Q2 2025",
      description:
        "Full decentralization with community-driven governance, proposal voting, and treasury management by token holders.",
      icon: Target,
      status: "upcoming",
      details: ["Governance token distribution", "Voting mechanism", "Proposal system", "Treasury management"],
    },
    {
      title: "Championship Rewards",
      date: "Q3 2025",
      description:
        "Special reward system tied to LeBron's performance and Lakers games, with bonus distributions for championship wins.",
      icon: Trophy,
      status: "upcoming",
      details: [
        "Performance-based rewards",
        "Game prediction pools",
        "Championship bonuses",
        "Fan engagement features",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white">
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] bg-clip-text text-transparent mb-4 md:mb-6">
              BronToken Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              From genesis to greatness - follow our roadmap as we build the ultimate crypto ecosystem combining
              blockchain innovation with championship legacy
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#fdb927] via-[#552583] to-[#00d4ff] opacity-40"></div>

            {roadmapItems.map((item, index) => {
              const Icon = item.icon
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.has(index)

              return (
                <div
                  key={index}
                  data-index={index}
                  className="scroll-reveal relative mb-12 md:mb-20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(48px)",
                    transition: `all 0.8s ease-out ${index * 0.1}s`,
                  }}
                >
                  {/* Mobile Layout (stacked) */}
                  <div className="block md:hidden">
                    <div className="flex items-center mb-4">
                      {/* Timeline Node for Mobile */}
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583] border-4 border-[#0a0a0a] shadow-lg shadow-[#fdb927]/50 mr-4 flex-shrink-0">
                      </div>

                      {/* Date Badge for Mobile */}
                      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#fdb927]/20 to-[#552583]/20 border border-[#fdb927]/30">
                        <span className="text-[#fdb927] font-bold text-sm">{item.date}</span>
                      </div>
                    </div>

                    {/* Content Card for Mobile */}
                    <div className="ml-10">
                      <Card className="glass-effect border-gray-700 hover:border-[#fdb927] transition-all duration-500 group">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583]">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <Badge
                              variant={
                                item.status === "completed"
                                  ? "default"
                                  : item.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                item.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700 text-white text-xs"
                                  : item.status === "in-progress"
                                    ? "bg-[#fdb927] text-black hover:bg-[#fdb927]/80 text-xs"
                                    : "border-[#552583] text-[#552583] hover:bg-[#552583] hover:text-white text-xs"
                              }
                            >
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#fdb927] transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.description}</p>

                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-[#fdb927] mb-2">Key Milestones:</h4>
                            {item.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583] flex-shrink-0"></div>
                                <span className="text-xs text-gray-400">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Desktop Layout (alternating) */}
                  <div className={`hidden md:flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content Card */}
                    <div className={`w-5/12 ${isLeft ? "pr-8 lg:pr-12" : "pl-8 lg:pl-12"}`}>
                      <Card className="glass-effect border-gray-700 hover:border-[#fdb927] transition-all duration-500 group hover:scale-105">
                        <CardContent className="p-6 lg:p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583]">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <Badge
                              variant={
                                item.status === "completed"
                                  ? "default"
                                  : item.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                item.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : item.status === "in-progress"
                                    ? "bg-[#fdb927] text-black hover:bg-[#fdb927]/80"
                                    : "border-[#552583] text-[#552583] hover:bg-[#552583] hover:text-white"
                              }
                            >
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>

                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[#fdb927] transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-lg text-[#fdb927] font-bold mb-4">{item.date}</p>

                          <p className="text-gray-300 text-base leading-relaxed mb-6">{item.description}</p>

                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-[#fdb927] mb-3">Key Milestones:</h4>
                            {item.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583] flex-shrink-0"></div>
                                <span className="text-sm text-gray-400">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Date Badge on opposite side */}
                    <div
                      className={`w-5/12 relative flex items-center ${isLeft ? "justify-start pl-8 lg:pl-20" : "justify-end pr-8 lg:pr-20"}`}
                    >
                      
                        <div className={`${isLeft ? "flex-row" : "flex-row-reverse"} flex gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#fdb927]/20 to-[#552583]/20 border border-[#fdb927]/30`}>
                          {/* Timeline Node */}
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583] border-4 border-[#0a0a0a] z-10 shadow-lg shadow-[#fdb927]/50">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#fdb927] to-[#552583] lg:animate-ping opacity-75"></div>
                          </div>

                          <span className="text-[#fdb927] font-bold text-lg">{item.date}</span>
                        </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
