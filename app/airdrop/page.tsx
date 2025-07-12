"use client";

import ResponsiveCanvas from "@/components/gameparts/ResponsiveCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { validateWalletAddress } from "@/lib/supabaseUtils";
import { useProgress } from "@react-three/drei";
import { ChevronLeft, Crown, Gift, Plane, Zap } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";

const Airdrop = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAirdropModal, setOpenAirdropModal] = useState(false);
  const [token, setToken] = useState(0);

  const gameEnd = () => {
    const score = 10;
    setToken(score);
    setOpenAirdropModal(true);
  }

  const handleAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return alert("Please enter a wallet address");

    setLoading(true);

    try {
      const validation = await validateWalletAddress(walletAddress, token);

      if(!validation.success) {
        toast.error(`${validation.message}\nTokens Gained: ${validation.token_amount}`);
        return;
      }

      toast.success(validation.message);

      const res = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, tokens: validation.tokens }),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Server returned invalid JSON:", text);
        throw new Error("Server did not return valid JSON");
      }

      if (res.ok) {
        toast.success(`✅ Airdropped ${validation.tokens} BRONs`);
      } else {
        toast.error("❌ Airdrop failed: " + (data?.message || "Unknown error"));
      }

    } catch (err: any) {
      toast.error("❌ Error: " + err.message);
      console.error(err);
    } finally {
       setLoading(false);
       setOpenAirdropModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white flex items-center justify-center p-4">
      
      {
        !openAirdropModal && 
            <Suspense fallback={<LoadingScreen />}>
              <ResponsiveCanvas setToken={setToken} setOpenAirdropModal={setOpenAirdropModal} />
            </Suspense>
      }

      {
        openAirdropModal && (
          <div>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fdb927] rounded-full blur-3xl opacity-[0.02] animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#552583] rounded-full blur-3xl opacity-[0.02] animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00d4ff] rounded-full blur-3xl opacity-[0.02] animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto">
              <Card className="glass-effect border-gray-700 rounded-md hover:border-[#fdb927] transition-all duration-500 group hover:scale-105 shadow-2xl shadow-[#fdb927]/10">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fdb927]/5 via-[#552583]/5 to-[#00d4ff]/5 group-hover:from-[#fdb927]/10 group-hover:via-[#552583]/10 group-hover:to-[#00d4ff]/10 transition-all duration-500"></div>

                  {/* Floating Particles Effect */}
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
                    {/* Header Section */}
                    <div className="mb-8">
                      <div className="relative mb-6">
                        <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] mb-4 animate-pulse">
                          <Gift className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                        </div>

                        {/* Crown decoration */}
                        <Crown
                          className="absolute -top-2 -right-2 w-6 h-6 text-[#fdb927] animate-bounce"
                          style={{ animationDuration: "2s" }}
                        />
                        
                        <div 
                          className="cursor-pointer absolute -top-2 -left-2 flex animate-bounce items-center" 
                          style={{ animationDuration: "2s" }}
                          onClick={() => setOpenAirdropModal(false)}
                        >
                          <ChevronLeft
                            className="w-6 h-6 text-[#00d4ff]"
                          />

                          <span className="hover:underline text-sm text-[#00d4ff]">Return</span>
                        </div>
                      </div>

                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#fdb927] via-[#552583] to-[#00d4ff] bg-clip-text text-transparent mb-3">
                        Claim Your Airdrop
                      </h2>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        Join the BronToken revolution and claim your exclusive airdrop tokens
                      </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleAirdrop} className="space-y-6 mb-6">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter your Solana wallet address"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-700 focus:border-[#fdb927] focus:ring-2 focus:ring-[#fdb927]/20 transition-all duration-300"
                          disabled={loading}
                        />
                        <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fdb927] opacity-50" />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading || !walletAddress.trim()}
                        className="w-full py-3 bg-gradient-to-r from-[#fdb927] to-[#552583] hover:from-[#fdb927]/80 hover:to-[#552583]/80 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Plane className="w-5 h-5" />
                            Claim Airdrop {token} Brons
                          </div>
                        )}
                      </Button>
                    </form>


                    {/* Info Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <Crown className="w-4 h-4 text-[#fdb927]" />
                        <span>Maximum 100 tokens per wallet</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-black/20 border border-gray-700">
                          <div className="text-lg font-bold text-[#fdb927]">1B</div>
                          <div className="text-xs text-gray-400">Total Supply</div>
                        </div>
                        <div className="p-3 rounded-lg bg-black/20 border border-gray-700">
                          <div className="text-lg font-bold text-[#552583]">15%</div>
                          <div className="text-xs text-gray-400">Airdrop Pool</div>
                        </div>
                        <div className="p-3 rounded-lg bg-black/20 border border-gray-700">
                          <div className="text-lg font-bold text-[#00d4ff]">100M</div>
                          <div className="text-xs text-gray-400">Airdrop Tokens</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By claiming this airdrop, you agree to our terms and conditions.
                  <br />
                  BronToken is built on Solana for lightning-fast transactions.
                </p>
              </div>
            </div>

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
        )
      }
    </div>
  );
};

export default Airdrop;


function LoadingScreen() {
  const { progress } = useProgress()

  return (
    <div className="text-center justify-center flex flex-col w-full min-h-screen bg-black text-white">
      <p className="text-3xl mb-2">Loading your game...</p>
      <p className="text-3xl font-bold">{progress.toFixed(0)}%</p>
    </div>
  )
}
