"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/hero-section"
import WhatIsBronToken from "@/components/what-is-brontoken"
import FunFacts from "@/components/fun-facts"
import WalletIntegration from "@/components/wallet-integration"
import WalletSetup from "@/components/wallet-setup"

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
      <HeroSection scrollToWallet={scrollToWallet} />
      <WhatIsBronToken />
      <FunFacts />
      <WalletIntegration ref={walletRef}/>
      <WalletSetup />
    </div>
  )
}
