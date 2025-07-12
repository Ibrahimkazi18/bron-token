"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/hero-section"
import WhatIsBronToken from "@/components/what-is-brontoken"
import FunFacts from "@/components/fun-facts"
import WalletIntegration from "@/components/wallet-integration"
import WalletSetup from "@/components/wallet-setup"
import Head from "next/head";

export default function HomePage() {
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
  }, []);

  const walletRef = useRef<HTMLDivElement>(null);

  const scrollToWallet = () => {
    walletRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Bron Token | LeBron James Inspired Web3 Coin</title>
        <link rel="icon" href="/images/BronTokenLogo.png" />
        <meta
          name="description"
          content="Bron Token is a basketball-themed Web3, Solana crypto coin inspired by LeBron James. Earn BRON by playing, holding, and joining the movement of fans and players."
        />
        <meta
          name="keywords"
          content="
                    bron token, 
                    bron solana coin, 
                    bron solana token, 
                    bron solana spl token, 
                    bron solana spl coin, 
                    bron meme token, 
                    lebron james solana coin, 
                    lebron james solana token, 
                    lebron james solana spl token, 
                    lebron solana coin, 
                    lebron solana token, 
                    lebron solana spl token, 
                    lebron james meme coin, 
                    lebron meme coin, 
                    lebron james meme token, 
                    lebron meme token, 
                    brontoken, 
                    lebron james crypto, 
                    basketball coin, 
                    nba token, lebron token, 
                    web3 basketball, 
                    web3 basketball token, 
                    web3 bron token, 
                    web3 lebron james token, 
                    crypto airdrop, 
                    solana token, 
                    solana basketball token, 
                    lebron james solana token, 
                    spl bron token, 
                    bron token solana spl,
                    meme coin,
                    meme token,
                    meme,
                    king,
                    king coin,
                    king token,
                    best meme coin,
                    best meme token,
                    best token,
                    best coin,
                    meme crypto token,
                    crypto meme token,
                    lebron crypto meme token
                  "
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Bron Token | LeBron James Inspired Web3 Coin" />
        <meta property="og:description" content="Join the Bron Token revolution. Earn crypto by playing. Inspired by the King himself." />
        <meta property="og:image" content="https://brontoken.com/images/BronTokenLogo.png" />
        <meta property="og:url" content="https://brontoken.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bron Token | LeBron James Inspired Web3 Coin" />
        <meta name="twitter:description" content="Bron Token is a basketball-themed Web3 crypto coin inspired by LeBron James." />
        <meta name="twitter:image" content="https://brontoken.com/images/BronTokenLogo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bron Token",
              "url": "https://brontoken.com",
              "logo": "https://brontoken.com/images/BronTokenLogo.png",
              "sameAs": [
                "https://x.com/brontoken",
                "https://discord.gg/qMWMXDa4",
                "https://www.reddit.com/user/brontoken/",
                "https://t.me/BronToken",
                "https://www.instagram.com/bron_token/"
              ],
              "description": "Bron Token is a Web3, Solana SPL basketball-themed crypto project inspired by LeBron James. Earn BRON tokens through gameplay, airdrops, and community challenges."
            }),
          }}
        />
      </Head>

      <HeroSection scrollToWallet={scrollToWallet} />
      <WhatIsBronToken />
      <FunFacts />
      <WalletIntegration ref={walletRef}/>
      <WalletSetup />
    </div>
  )
}
