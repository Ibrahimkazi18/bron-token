import { NextResponse } from "next/server";
import {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  transferChecked,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

export async function POST(req: Request) {
  try {
    console.log("🚨 Airdrop API hit!");
    const { walletAddress, tokens } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Validate wallet address
    try {
      new PublicKey(walletAddress);
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid wallet address" },
        { status: 400 }
      );
    }

    console.log("🚀 Airdrop started for:", walletAddress);

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    console.log("Connection established");

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_BRON_KEY) {
      throw new Error("NEXT_PUBLIC_BRON_KEY is not set");
    }
    if (!process.env.NEXT_PUBLIC_KEYPAIR_JSON) {
      throw new Error("NEXT_PUBLIC_KEYPAIR_JSON is not set");
    }

    const mint = new PublicKey(process.env.NEXT_PUBLIC_BRON_KEY);
    console.log("Mint:", mint.toBase58());

    // Verify mint is Token-2022
    const mintInfo = await connection.getAccountInfo(mint);
    if (!mintInfo) {
      throw new Error("Invalid mint address: Mint does not exist");
    }
    if (mintInfo.owner.toBase58() !== TOKEN_2022_PROGRAM_ID.toBase58()) {
      throw new Error("Mint is not a Token-2022 token");
    }

    const recipient = new PublicKey(walletAddress);
    const secret = JSON.parse(process.env.NEXT_PUBLIC_KEYPAIR_JSON);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    const sender = keypair.publicKey;

    console.log("Sender:", sender.toBase58());

    // Check sender SOL balance
    const senderBalance = await connection.getBalance(sender);
    if (senderBalance < 0.00203928 * 1e9) {
      throw new Error("Sender has insufficient SOL to create ATA");
    }

    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      sender,
      false,
      "confirmed",
      { commitment: "confirmed" },
      TOKEN_2022_PROGRAM_ID
    );
    console.log("Sender Token Account:", senderTokenAccount.address.toBase58());

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      recipient,
      false,
      "confirmed",
      { commitment: "confirmed" },
      TOKEN_2022_PROGRAM_ID
    );
    console.log("Recipient Token Account:", recipientTokenAccount.address.toBase58());

    // Assume 9 decimals (verify with mint metadata if possible)
    const decimals = 9;
    const amount = Number(tokens) * 10 ** decimals;

    const sig = await transferChecked(
      connection,
      keypair,
      senderTokenAccount.address,
      mint,
      recipientTokenAccount.address,
      keypair,
      amount,
      decimals
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