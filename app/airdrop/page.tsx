"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const Airdrop = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return alert("Please enter a wallet address");

    setLoading(true);

    try {
      
        const res = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
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
        alert("✅ Airdrop sent!");
        } else {
        alert("❌ Airdrop failed: " + (data?.message || "Unknown error"));
        }
    } catch (err: any) {
        alert("❌ Error: " + err.message);
        console.error(err);
    } finally {
        setLoading(false);
    }
    };


  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Claim Your Airdrop 🎁</h2>
      <form onSubmit={handleAirdrop} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Claim Airdrop"}
        </button>
      </form>
    </div>
  );
};

export default Airdrop;
