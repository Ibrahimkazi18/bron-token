"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, useProgress } from "@react-three/drei"
import Basketball from "./Basketball"
import Chairs from "./Chairs"
import Stands from "./Stands"
import Hoop from "./Hoop"
import Court from "./Court"
import { Physics } from "@react-three/rapier"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Timer, Target, RotateCcw, Zap, Star, Award, Smartphone } from "lucide-react"
import MobileGameOverModal from "./mobile-game-over-modal"

interface MobileCanvasProps {
  setToken: (token: number) => void
  setOpenAirdropModal: (bool: boolean) => void
}

export default function MobileCanvas({ setToken, setOpenAirdropModal }: MobileCanvasProps) {
  const bronScore = 30
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [ballKey, setBallKey] = useState(0)
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [gameLoaded, setGameLoaded] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    setShowTutorial(false)
    setTimeLeft(60)
    setGameStarted(true)
    triggerBallReset();
  }

  const { progress } = useProgress();
  useEffect(() => {
    if (progress >= 100) {
      setGameLoaded(true);
    } else {
      setGameLoaded(false);
    }
  }, [progress]);

  useEffect(() => {
    if (!gameActive || !gameStarted) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setGameActive(false)
          setBallKey((prev) => prev + 1)
          // Show game over modal after 1.5 seconds
          setTimeout(() => {
            setShowGameOverModal(true)
          }, 1500)
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [gameActive, gameStarted])

  const triggerBallReset = () => setBallKey((prev) => prev + 1)

  const handleScore = () => {
    const newScore = score + 3
    const cappedScore = Math.min(newScore, 100)
    setScore(cappedScore)
    if (cappedScore > 30) {
      setToken(100)
    } else {
      setToken(cappedScore)
    }
    triggerBallReset()
  }

  const handleRestart = () => {
    setScore(0)
    setToken(0)
    setTimeLeft(30)
    setGameActive(true)
    setShowGameOverModal(false)
    setShowTutorial(true)
    setGameStarted(false)
    triggerBallReset()
  }

  const handleClaimAirdrop = () => {
    setShowGameOverModal(false)
    setOpenAirdropModal(true)
  }

  const getScoreStatus = () => {
    if (score > bronScore) return { text: "WINNING!", color: "text-green-400", icon: Trophy }
    if (score === bronScore) return { text: "TIED!", color: "text-yellow-400", icon: Award }
    return { text: "BEHIND", color: "text-red-400", icon: Target }
  }

  const scoreStatus = getScoreStatus()
  const StatusIcon = scoreStatus.icon;

  // Disable scroll during gameplay (especially for touch events)
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault()
    if (gameActive && gameStarted) {
      document.body.style.overflow = "hidden"
      document.addEventListener("touchmove", preventScroll, { passive: false })
    } else {
      document.body.style.overflow = "auto"
      document.removeEventListener("touchmove", preventScroll)
    }
    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("touchmove", preventScroll)
    }
  }, [gameActive, gameStarted])

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#fdb927] rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#552583] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Tutorial/Loading Overlay */}
        {showTutorial && (
          <div className="-mt-3 absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <Card className="glass-effect border-[#fdb927]/50 w-full max-w-sm mx-auto shadow-2xl shadow-[#fdb927]/20">
              <CardContent className="p-6 text-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fdb927]/10 via-[#552583]/10 to-[#00d4ff]/10"></div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-[#fdb927] to-[#552583] rounded-full opacity-30 animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Crown className="w-8 h-8 text-[#fdb927] animate-bounce" style={{ animationDuration: "2s" }} />
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] bg-clip-text text-transparent">
                        BronToken Challenge
                      </h1>
                      <Smartphone className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <p className="text-gray-300 text-sm">Mobile Basketball Game</p>
                  </div>

                  {/* Game Instructions */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-[#fdb927]" />
                      <h3 className="font-bold text-white text-lg">How to Play</h3>
                    </div>

                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-black/20">
                        <div className="w-2 h-2 rounded-full bg-[#fdb927] flex-shrink-0"></div>
                        <span>Drag & release the ball to shoot</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-black/20">
                        <div className="w-2 h-2 rounded-full bg-[#552583] flex-shrink-0"></div>
                        <span>Score 3 points per successful shot</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-black/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                        <span>Earn 1 BRON Token per point scored</span>
                      </div>
                    </div>
                  </div>

                  {/* Loading/Start Button */}
                  <div className="space-y-3">
                    {!gameLoaded ? (
                      <div className="text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#fdb927]/20 to-[#552583]/20 border border-[#fdb927]/30 mb-3">
                          <div className="w-5 h-5 border-2 border-[#fdb927] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[#fdb927] font-semibold">Loading Game...</span>
                        </div>
                        <p className="text-xs text-gray-400">Preparing the court and basketball physics</p>
                      </div>
                    ) : (
                      <Button
                        onClick={handleStartGame}
                        className="w-full py-4 bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] hover:from-[#fdb927]/80 hover:via-[#552583]/80 hover:to-[#00d4ff]/80 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Zap className="w-6 h-6 animate-pulse" />
                          Start Game
                          <Trophy className="w-6 h-6" />
                        </div>
                      </Button>
                    )}
                  </div>

                  {/* Game Stats Preview */}
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-black/20 border border-gray-700">
                      <div className="text-lg font-bold text-[#fdb927]">30s</div>
                      <div className="text-xs text-gray-400">Time Limit</div>
                    </div>
                    <div className="p-2 rounded-lg bg-black/20 border border-gray-700">
                      <div className="text-lg font-bold text-[#552583]">30</div>
                      <div className="text-xs text-gray-400">Target Score</div>
                    </div>
                    <div className="p-2 rounded-lg bg-black/20 border border-gray-700">
                      <div className="text-lg font-bold text-[#00d4ff]">100</div>
                      <div className="text-xs text-gray-400">Max Tokens</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Canvas - Always render but only active when game started */}
        <div className={`relative ${gameActive ? "h-[60vh]" : "h-[50vh]"}`}>
          <Canvas shadows camera={{ position: [0, 3.5, 8], fov: 100 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 1, 4]} angle={Math.PI} penumbra={1} intensity={100} castShadow />
            <spotLight position={[0, 2, -7]} angle={Math.PI / 1} penumbra={0.5} intensity={50} castShadow />
            <pointLight position={[0, 2, 6.5]} intensity={20} color="white" />
            <pointLight position={[0, 6, -7]} intensity={20} color="white" />
            <pointLight position={[0, 13, -8]} intensity={10} color="white" />
            <Environment preset="night" />
            <Physics gravity={[0, -9.81, 0]} timeStep="vary">
              <Basketball key={ballKey} gameActive={gameActive && gameStarted} />
              <Hoop onScore={handleScore} gameActive={gameActive && gameStarted} />
              <Chairs />
              <Court />
              <Stands />
            </Physics>
          </Canvas>
        </div>

        {/* Control Panel - Always render when game started */}
        {gameStarted && (
          <>
          <div className="relative z-10 p-3 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm border-t border-gray-700/50">
            {/* Score Row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {/* Player Score */}
              <Card className="glass-effect border-gray-700">
                <CardContent className="p-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-3 h-3 text-[#00d4ff]" />
                    <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30 text-xs px-1 py-0">YOU</Badge>
                  </div>
                  <p className="text-lg font-bold text-white">{score}</p>
                </CardContent>
              </Card>

              {/* Status */}
              <Card
                className={`glass-effect border-gray-700 ${
                  score > bronScore
                    ? "border-green-500/50"
                    : score === bronScore
                      ? "border-yellow-500/50"
                      : "border-red-500/50"
                }`}
              >
                <CardContent className="p-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <StatusIcon className={`w-3 h-3 ${scoreStatus.color}`} />
                  </div>
                  <p className={`text-xs font-bold ${scoreStatus.color}`}>{scoreStatus.text}</p>
                </CardContent>
              </Card>

              {/* LeBron Score */}
              <Card className="glass-effect border-gray-700">
                <CardContent className="p-2 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Crown className="w-3 h-3 text-[#fdb927]" />
                    <Badge className="bg-[#fdb927]/20 text-[#fdb927] border-[#fdb927]/30 text-xs px-1 py-0">KING</Badge>
                  </div>
                  <p className="text-lg font-bold text-white">{bronScore}</p>
                </CardContent>
              </Card>
            </div>

            {/* Timer and Controls Row */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Timer */}
              <Card className="glass-effect border-gray-700 hover:border-red-500 transition-all duration-300">
                <CardContent className="p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500">
                        <Timer className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p
                          className={`text-sm font-bold ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}
                        >
                          {timeLeft}s
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 relative">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={timeLeft <= 10 ? "#ef4444" : "#fdb927"}
                          strokeWidth="2"
                          strokeDasharray={`${(timeLeft / 60) * 100}, 100`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="flex items-center">
                {gameActive ? (
                  <Button
                    onClick={triggerBallReset}
                    className="w-full bg-gradient-to-r from-[#552583] to-[#fdb927] hover:from-[#552583]/80 hover:to-[#fdb927]/80 text-white font-bold py-2 rounded-lg transition-all duration-300 transform active:scale-95 text-xs"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset Ball
                  </Button>
                ) : (
                  <Button
                    onClick={handleRestart}
                    className="w-full bg-gradient-to-r from-[#fdb927] to-[#00d4ff] hover:from-[#fdb927]/80 hover:to-[#00d4ff]/80 text-black font-bold py-2 rounded-lg transition-all duration-300 transform active:scale-95 text-xs"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Restart
                  </Button>
                )}
              </div>
            </div>

            {/* Game Over Message - Only show if modal is not open */}
            {!gameActive && !showGameOverModal && (
              <Card className="glass-effect border-red-500/50 bg-red-500/10">
                <CardContent className="p-2 text-center">
                  <Trophy className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-red-400">Game Over!</p>
                  <p className="text-xs text-gray-400">
                    {score > bronScore
                      ? "You beat the King! 👑"
                      : score === bronScore
                        ? "It's a tie! 🤝"
                        : "LeBron wins! 🏀"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          </>
        )}

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
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>

      {/* Game Over Modal */}
      <MobileGameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
        score={score}
        bronScore={bronScore}
        tokens={score} // 1 token per point
        onClaimAirdrop={handleClaimAirdrop}
      />
    </>
  )
}