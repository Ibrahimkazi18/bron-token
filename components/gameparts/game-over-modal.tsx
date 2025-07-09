"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, X, Gift, Star, Zap, Award, Target } from "lucide-react"

interface GameOverModalProps {
  isOpen: boolean
  onClose: () => void
  score: number
  bronScore: number
  tokens: number
  onClaimAirdrop: () => void
}

export default function GameOverModal({
  isOpen,
  onClose,
  score,
  bronScore,
  tokens,
  onClaimAirdrop,
}: GameOverModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Start entrance animation
      setTimeout(() => setIsVisible(true), 100)
      setTimeout(() => setShowContent(true), 300)
    } else {
      setIsVisible(false)
      setShowContent(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const beatLeBron = score >= bronScore
  const isMaxTokens = tokens >= 100
  const performanceLevel = beatLeBron
    ? "champion"
    : score >= bronScore * 0.8
      ? "excellent"
      : score >= bronScore * 0.5
        ? "good"
        : "tryagain"

  const getPerformanceData = () => {
    switch (performanceLevel) {
      case "champion":
        return {
          title: "CHAMPION! 👑",
          subtitle: "You beat the King!",
          color: "from-yellow-400 to-orange-500",
          icon: Crown,
          bgGlow: "shadow-yellow-500/30",
          borderColor: "border-yellow-500/50",
        }
      case "excellent":
        return {
          title: "EXCELLENT! 🔥",
          subtitle: "Outstanding performance!",
          color: "from-green-400 to-emerald-500",
          icon: Trophy,
          bgGlow: "shadow-green-500/30",
          borderColor: "border-green-500/50",
        }
      case "good":
        return {
          title: "GOOD GAME! 💪",
          subtitle: "Nice shooting!",
          color: "from-blue-400 to-cyan-500",
          icon: Target,
          bgGlow: "shadow-blue-500/30",
          borderColor: "border-blue-500/50",
        }
      default:
        return {
          title: "GAME OVER",
          subtitle: "Keep practicing!",
          color: "from-purple-400 to-pink-500",
          icon: Award,
          bgGlow: "shadow-purple-500/30",
          borderColor: "border-purple-500/50",
        }
    }
  }

  const performance = getPerformanceData()
  const PerformanceIcon = performance.icon

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? "bg-black/80 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={onClose}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-[#fdb927] rounded-full blur-3xl transition-opacity duration-2000 ${
            isVisible ? "opacity-10" : "opacity-0"
          } animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#552583] rounded-full blur-3xl transition-opacity duration-2000 ${
            isVisible ? "opacity-10" : "opacity-0"
          } animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 w-64 h-64 bg-[#00d4ff] rounded-full blur-3xl transition-opacity duration-2000 ${
            isVisible ? "opacity-10" : "opacity-0"
          } animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Modal Content */}
      <Card
        className={`glass-effect border-gray-700 ${performance.borderColor} transition-all duration-700 transform ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-0 translate-y-8"
        } w-full max-w-md mx-auto shadow-2xl ${performance.bgGlow} hover:scale-105`}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-8 text-center relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${performance.color} opacity-5 transition-opacity duration-500 ${
              showContent ? "opacity-10" : "opacity-5"
            }`}
          ></div>

          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r from-[#fdb927] to-[#552583] rounded-full transition-opacity duration-1000 ${
                  showContent ? "opacity-40" : "opacity-0"
                } animate-float`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 z-20"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="relative z-10">
            {/* Header Section */}
            <div
              className={`mb-8 transition-all duration-700 delay-200 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative mb-6">
                <div
                  className={`inline-flex p-6 rounded-full bg-gradient-to-r ${performance.color} mb-4 animate-pulse shadow-lg`}
                >
                  <PerformanceIcon
                    className="w-16 h-16 text-white animate-bounce"
                    style={{ animationDuration: "2s" }}
                  />
                </div>

                {/* Decorative elements */}
                {beatLeBron && (
                  <>
                    <Star
                      className="absolute -top-2 -left-2 w-6 h-6 text-[#fdb927] animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                    <Star
                      className="absolute -top-2 -right-2 w-6 h-6 text-[#00d4ff] animate-spin"
                      style={{ animationDuration: "3s", animationDirection: "reverse" }}
                    />
                  </>
                )}
              </div>

              <h2
                className={`text-4xl font-bold bg-gradient-to-r ${performance.color} bg-clip-text text-transparent mb-3`}
              >
                {performance.title}
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">{performance.subtitle}</p>
            </div>

            {/* Score Section */}
            <div
              className={`mb-8 transition-all duration-700 delay-400 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Your Score */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#00d4ff]/10 to-[#552583]/10 border border-[#00d4ff]/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-[#00d4ff]" />
                    <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30 text-xs">YOU</Badge>
                  </div>
                  <p className="text-3xl font-bold text-white">{score}</p>
                  <p className="text-xs text-gray-400">Points</p>
                </div>

                {/* LeBron Score */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#fdb927]/10 to-[#552583]/10 border border-[#fdb927]/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-[#fdb927]" />
                    <Badge className="bg-[#fdb927]/20 text-[#fdb927] border-[#fdb927]/30 text-xs">KING</Badge>
                  </div>
                  <p className="text-3xl font-bold text-white">{bronScore}</p>
                  <p className="text-xs text-gray-400">Target</p>
                </div>
              </div>

              {/* Token Reward */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-[#fdb927]/10 via-[#552583]/10 to-[#00d4ff]/10 border border-[#fdb927]/30 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-6 h-6 text-[#fdb927]" />
                  <h3 className="text-xl font-bold text-white">Tokens Earned</h3>
                </div>

                <div className="relative">
                  <p className="text-5xl font-bold bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] bg-clip-text text-transparent mb-2">
                    {tokens}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">BRON Tokens</p>

                  {isMaxTokens && (
                    <Badge className="bg-gradient-to-r from-[#fdb927] to-[#552583] text-white border-none animate-pulse">
                      MAX REWARD! 🎉
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  <p>• 1 Token = 1 Point scored</p>
                  <p>• Maximum 100 tokens per wallet</p>
                  {beatLeBron && <p>• 🏆 Champion bonus applied!</p>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`space-y-4 transition-all duration-700 delay-600 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                onClick={onClaimAirdrop}
                disabled={score === 0}
                className="w-full py-4 bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] hover:from-[#fdb927]/80 hover:via-[#552583]/80 hover:to-[#00d4ff]/80 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 animate-pulse" />
                  Claim Your Airdrop
                  <Gift className="w-6 h-6" />
                </div>
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                className="w-full py-3 border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 bg-transparent"
              >
                Close
              </Button>
            </div>

            {/* Achievement Badges */}
            {beatLeBron && (
              <div
                className={`mt-6 transition-all duration-700 delay-800 ${
                  showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex justify-center gap-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none animate-bounce">
                    👑 King Slayer
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-none animate-bounce">
                    🏀 Sharpshooter
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}
