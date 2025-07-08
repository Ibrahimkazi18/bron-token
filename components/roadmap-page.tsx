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
      title: "Discussion",
      date: "May 2025",
      description:
        "Initial brainstorming, project scope definition, and planning discussions involving team goals and timeline setup.",
      icon: Users,
      status: "completed",
      details: [
        "Core idea finalized",
        "Scope defined",
        "Tech stack evaluation",
        "Timeline draft created",
      ],
    },
    {
      title: "Development",
      date: "June 2025",
      description:
        "Start of development phase with setup of repositories, coding standards, and foundational modules.",
      icon: Zap,
      status: "completed",
      details: [
        "GitHub repo initialized",
        "Frontend & backend structure setup",
        "CI/CD pipelines established",
        "First feature sprint",
      ],
    },
    {
      title: "Website",
      date: "June 2025",
      description:
        `Created the project's website with essential information, roadmap, and onboarding features.`,
      icon: Globe,
      status: "completed",
      details: [
        "Landing page",
        "Responsive UI complete",
        "Basic user info and roadmap",
        "Will host on Vercel",
      ],
    },
    {
      title: "Game Integration for Airdrop",
      date: "July 2025",
      description:
        "Seamless integration of a game created by us with the website for airdrop and user engagement mechanics.",
      icon: Gamepad2,
      status: "completed",
      details: [
        "Game created",
        "Smart contract airdrop module",
        "In-game rewards mechanics",
        "Testing & integration",
      ],
    },
    {
      title: "Community Platforms",
      date: "July 2025",
      description:
        "Expansion across social platforms including Discord, Twitter, Reddit, Telegram, and Instagram to build community engagement.",
      icon: Users,
      status: "completed",
      details: [
        "Discord & Telegram channels launched",
        "Reddit + Twitter community building",
        "Instagram for visual content",
        "Moderation & bots setup",
      ],
    },
    {
      title: "Launch and Airdrop",
      date: "July 2025",
      description:
        "Official launch of the platform with token airdrop campaign to early community members and users.",
      icon: Rocket,
      status: "completed",
      details: [
        "Launch event planned",
        "Airdrop distribution tool ready",
        "Marketing campaign live",
        "On-chain distribution tracked",
      ],
    },
    {
      title: "LeBron the GOAT - Meme Tribute",
      date: "∞",
      description:
        "A celebration of greatness. This meme card honors the King himself with maximum glaze and zero hesitation. This is not a feature. This is legacy.",
      icon: Trophy,
      status: "meme",
      details: [
        "🕶️ LeBron when he dropped 50 and still passed for the game-winner",
        "🔥 2016 Finals Game 7 block played in 4K on loop",
        "🧠 Big Brain Pass to JR Smith (he forgot the score, but Bron remembered greatness)",
        "🐐 Meme vault unlocked: all hail the King",
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
                                    : item.status === "meme"
                                      ? "bg-gradient-to-r from-[#fdb927] to-[#552583] text-white shadow-md text-xs animate-pulse"
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
