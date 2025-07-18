"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Users, Trophy } from "lucide-react"
import Head from "next/head"

export default function AboutPage() {
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

  const devTeam = [
    { name: "LeDev", role: "Lead Developer", avatar: "/images/dev_i.png" },
    { name: "BronCoder", role: "Smart Contract Dev", avatar: "/images/dev_h.png" },
    { name: "KingScript", role: "Frontend Wizard", avatar: "/images/dev_k.png" },
    { name: "GoatDesign", role: "UI/UX Designer", avatar: "/images/dev_r.png" },
    { name: "ChampMarketing", role: "Community Manager", avatar: "/images/dev_t.png" },
  ]

  return (
    <>
            <Head>
        <title>About Bron Token | The LeBron James Inspired Crypto Coin</title>
        <meta
          name="description"
          content="Discover the story behind Bron Token — a basketball meme coin on Solana inspired by the legendary LeBron James. Learn about our mission, team, and cultural roots."
        />
        <meta
          name="keywords"
          content="about bron token, lebron james coin, solana meme coin, bron crypto project, basketball crypto, solana basketball token, crypto dream team"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About Bron Token | The LeBron James Inspired Crypto Coin" />
        <meta property="og:description" content="Bron Token is built on Solana and inspired by basketball legend LeBron James. Explore our vision, team, and backstory." />
        <meta property="og:image" content="https://brontoken.com/images/BronTokenLogo.png" />
        <meta property="og:url" content="https://brontoken.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Bron Token | The LeBron James Inspired Crypto Coin" />
        <meta name="twitter:description" content="Learn about the vision, cultural inspiration, and team behind Bron Token — a basketball-powered Solana meme coin." />
        <meta name="twitter:image" content="https://brontoken.com/images/BronTokenLogo.png" />
      </Head>

      <div className="">
        {/* Hero Section */}
        <section className="scroll-reveal overflow-hidden relative min-h-screen"> 
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20 -z-10">
            <div className="absolute inset-0 bg-[url('/images/solana-bg.jpg')] bg-cover bg-center opacity-[0.08]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                    About BronToken
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Born from the legendary career of LeBron James, BronToken represents the intersection of basketball
                  greatness and blockchain innovation.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">2025</div>
                    <div className="text-gray-400">Launch Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">Solana</div>
                    <div className="text-gray-400">Blockchain</div>
                  </div>
                </div>
              </div>
              <div className="relative lg:ml-32">
                <Image
                  src="/images/king.png"
                  alt="LeBron James Meme"
                  width={400}
                  height={500}
                  className="rounded-lg animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-lg blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* LeBron's Influence */}
        <section className="py-20 scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                  The King's Cultural Impact
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-effect border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Basketball Royalty</h3>
                  <p className="text-gray-400">4x NBA Champion, 4x Finals MVP, and the all-time scoring leader</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Cultural Icon</h3>
                  <p className="text-gray-400">From Akron to global superstar, inspiring millions worldwide</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Meme Legend</h3>
                  <p className="text-gray-400">The Decision, LeGM, and countless viral moments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Development Team */}
        <section className="py-20 bg-black/30 scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                  Meet the Dream Team
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our anonymous development team, united by their love for basketball and blockchain technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {devTeam.map((dev, index) => (
                <Card
                  key={index}
                  className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Image
                        src={dev.avatar || "/placeholder.svg"}
                        alt={dev.name}
                        fill
                        className="rounded-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{dev.name}</h3>
                    <p className="text-sm text-gray-400">{dev.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Backstory */}
        <section className="py-20 scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                  The Genesis Story
                </span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  In the summer of 2025, as LeBron James continued to defy age and expectations on the basketball court, a
                  group of crypto enthusiasts and basketball fans came together with a vision.
                </p>
                <p>
                  They saw the perfect opportunity to merge the legendary status of the King with the revolutionary
                  potential of blockchain technology. Thus, BronToken was born on the Solana network.
                </p>
                <p>
                  More than just a meme coin, BronToken represents the spirit of greatness, perseverance, and community
                  that LeBron James embodies. It's a tribute to the GOAT and a symbol of what's possible when passion
                  meets innovation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
