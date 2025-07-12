"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Crown, Users, TrendingUp, Flame, Lock, Coins, Shield, Zap } from "lucide-react"
import Head from "next/head"

export default function TokenomicsPage() {
  const tokenomicsData = [
    {
      label: "Total Supply",
      value: "500 Million",
      subtitle: "BRON",
      icon: Coins,
      position: "top",
      description: "Fixed supply with no additional minting",
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Liquidity Pool",
      value: "90%",
      subtitle: "450M BRON",
      icon: TrendingUp,
      position: "right",
      description: "DEX liquidity and trading pairs",
      color: "from-blue-400 to-cyan-500",
    },
    {
      label: "Developer Fund",
      value: "5%",
      subtitle: "50M BRON",
      icon: Lock,
      position: "bottom-right",
      description: "Team allocation with 2-year vesting",
      color: "from-green-400 to-emerald-500",
    },
    {
      label: "Airdrop Pool",
      value: "5%",
      subtitle: "100M BRON",
      icon: Users,
      position: "bottom",
      description: "Early adopters and community airdrops",
      color: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <>
      <Head>
        <title>BronToken Tokenomics | Supply, Allocation & Deflation Model</title>
        <meta
          name="description"
          content="Explore the complete tokenomics of BronToken. Learn about supply distribution, airdrops, liquidity, developer fund, and the deflationary burn mechanism."
        />
        <meta
          name="keywords"
          content="BronToken, tokenomics, BRON supply, crypto tokenomics, Solana token, community reserve, liquidity pool, airdrop pool, token burn, developer fund"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="BronToken Tokenomics | Strategic Supply Allocation" />
        <meta
          property="og:description"
          content="Get insights into BronToken’s 1B supply, community rewards, liquidity pool, and burning mechanism that powers the token's sustainability."
        />
        <meta property="og:image" content="https://brontoken.com/images/tokenomics-preview.png" />
        <meta property="og:url" content="https://brontoken.com/tokenomics" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BronToken Tokenomics | 1B Supply & Strategic Distribution" />
        <meta
          name="twitter:description"
          content="A breakdown of BronToken’s supply: community, dev fund, liquidity, burns & more. See how we sustain value and empower holders."
        />
        <meta name="twitter:image" content="https://brontoken.com/images/tokenomics-preview.png" />
      </Head>


      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#fdb927] rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#552583] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-48 md:w-64 h-48 md:h-64 bg-[#00d4ff] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] bg-clip-text text-transparent mb-4 md:mb-6">
                Tokenomics
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                Built for sustainability, designed for growth. The BronToken ecosystem rewards holders, fuels innovation,
                and creates lasting value through strategic allocation and deflationary mechanics.
              </p>
            </div>

            {/* Mobile Layout - Stacked Cards */}
            <div className="block lg:hidden">
              <div className="space-y-6 mb-12">
                {tokenomicsData.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="glass-effect border-gray-700 hover:border-[#fdb927] transition-all duration-500 group hover:scale-105"
                    >
                      <CardContent className="p-6 text-center relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                        ></div>

                        <div className="relative z-10">
                          <div className="mb-4">
                            <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${item.color} mb-3`}>
                              <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            </div>
                          </div>

                          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#fdb927] transition-colors">
                            {item.label}
                          </h3>

                          <div className="mb-3">
                            <p
                              className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                            >
                              {item.value}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
                          </div>

                          <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Desktop Layout - Circular Hub */}
            <div className="hidden lg:block">
              <div className="relative flex items-center justify-center" style={{ minHeight: "900px" }}>
                {/* Central Token Hub */}
                <div className="relative z-20">
                  <div className="w-60 h-w-60 xl:w-64 xl:h-64 rounded-full bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] p-2 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-[#fdb927]/20 via-[#552583]/20 to-[#00d4ff]/20 animate-pulse"></div>
                      <div className="text-center relative z-10">
                        <Crown
                          className="w-16 h-16 xl:w-20 xl:h-20 text-[#fdb927] mx-auto mb-4 animate-bounce"
                          style={{ animationDuration: "3s" }}
                        />
                        <div className="text-3xl xl:text-4xl font-bold text-white mb-2">BRON</div>
                        <div className="text-xl xl:text-2xl text-gray-400 mb-2">TOKEN</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tokenomics Cards in Perfect Circle */}
                {tokenomicsData.map((item, index) => {
                  const Icon = item.icon
                  const angle = index * 90 * (Math.PI / 180) // 60 degrees apart
                  const radius = 380 // Distance from center
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <div
                      key={index}
                      className="absolute animate-float"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                        animationDelay: `${index * 0.5}s`,
                        animationDuration: `${6 + index * 0.3}s`,
                      }}
                    >
                      <Card className="glass-effect border-gray-700 hover:border-[#fdb927] transition-all duration-500 group hover:scale-110 w-64 h-64 xl:w-72 xl:h-72 hover:shadow-2xl hover:shadow-[#fdb927]/20">
                        <CardContent className="p-6 xl:p-8 text-center relative overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                          ></div>

                          <div className="relative z-10">
                            <div className="mb-4">
                              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${item.color} mb-3`}>
                                <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                              </div>
                            </div>

                            <h3 className="font-bold text-white text-lg xl:text-xl mb-2 group-hover:text-[#fdb927] transition-colors">
                              {item.label}
                            </h3>

                            <div className="mb-3">
                              <p
                                className={`text-3xl xl:text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                              >
                                {item.value}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
                            </div>

                            <p className="text-xs xl:text-sm text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}

                {/* Connecting Network Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 z-10">
                  <defs>
                    <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fdb927" />
                      <stop offset="50%" stopColor="#552583" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>

                  {tokenomicsData.map((_, index) => {
                    const angle = index * 90 * (Math.PI / 180) // 60 degrees apart
                    const radius = 380                        // Distance from center
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    const centerX = 630;
                    const centerY = 450;
                    const endX = centerX + x;
                    const isHorizontal = Math.abs(y) < 1e-5;
                    const endY = centerY + (isHorizontal ? 0.1 : y);

                    return (
                      <g key={index}>
                        <line
                          x1={centerX}
                          y1={centerY}
                          x2={endX}
                          y2={endY}
                          stroke="url(#networkGradient)"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <circle
                          cx={`calc(50% + ${x}px)`}
                          cy={`calc(50% + ${y}px)`}
                          r="5"
                          fill="url(#networkGradient)"
                          className="animate-ping"
                          style={{ animationDelay: `${index * 0.4}s` }}
                        />
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="glass-effect border-gray-700 hover:border-[#fdb927] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#fdb927] mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Security First</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Multi-signature wallets and time-locked contracts ensure maximum security for all token holders.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-gray-700 hover:border-[#552583] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#552583] mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Deflationary Model</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Quarterly token burns reduce supply over time, creating scarcity and potential value appreciation.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-gray-700 hover:border-[#00d4ff] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-[#00d4ff] mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Community Driven</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Governance voting allows token holders to shape the future direction of the BronToken ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <style jsx>{`
          .animate-spin-slow {
            animation: spin 30s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-15px); }
          }
        `}</style>
      </div>
    </>
  )
}
