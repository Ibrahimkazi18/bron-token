import { NextResponse } from "next/server";
import { Connection, PublicKey, Keypair, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    console.log("🚨 Airdrop API hit!");
    const { walletAddress, tokens } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ message: "Wallet address is required" }, { status: 400 });
    }

    console.log("🚀 Airdrop started for:", walletAddress);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const mint = new PublicKey(process.env.NEXT_PUBLIC_BRON_KEY!); 
    const recipient = new PublicKey(walletAddress);

    const secret = JSON.parse(process.env.NEXT_PUBLIC_KEYPAIR_JSON!);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    const sender = keypair.publicKey;

    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      sender
    );

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      recipient
    );

    const sig = await transfer(
      connection,
      keypair,
      senderTokenAccount.address,
      recipientTokenAccount.address,
      keypair,
      1000000000 * tokens // = 1 token if 6 decimals
    );

    console.log("✅ Airdrop successful:", sig);

    return NextResponse.json({ message: "Airdrop sent!", tx: sig });
  } catch (error: any) {
    console.error("❌ Airdrop error:", error);
    return NextResponse.json(
      { message: "Airdrop failed", error: error.message },
      { status: 500 }
    );
  }
}
