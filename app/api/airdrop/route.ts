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
  TokenAccountNotFoundError,
} from "@solana/spl-token";

export async function POST(req: Request) {
  let sender: PublicKey | null = null;
  let mint: PublicKey | null = null;

  try {
    console.log("🚨 Airdrop API hit!");
    const { walletAddress, tokens } = await req.json();

    if (!walletAddress) {
      console.error("Missing wallet address");
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Validate wallet address
    let recipient;
    try {
      recipient = new PublicKey(walletAddress);
    } catch (e) {
      console.error("Invalid wallet address:", walletAddress);
      return NextResponse.json(
        { message: "Invalid wallet address" },
        { status: 400 }
      );
    }

    console.log(`🚀 Airdrop started for: ${walletAddress}`);

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    console.log("Connection established");

    // Validate environment variables
    if (!process.env.BRON_KEY) {
      console.error("BRON_KEY is not set");
      throw new Error("BRON_KEY is not set");
    }
    if (!process.env.KEYPAIR_JSON) {
      console.error("KEYPAIR_JSON is not set");
      throw new Error("KEYPAIR_JSON is not set");
    }

    // Validate mint
    mint;
    try {
      mint = new PublicKey(process.env.BRON_KEY);
      console.log("Mint:", mint.toBase58());
    } catch (e) {
      console.error("Invalid mint address:", process.env.BRON_KEY);
      throw new Error("Invalid mint address");
    }

    // Verify mint is a Token-2022 token
    const mintInfo = await connection.getAccountInfo(mint);
    if (!mintInfo) {
      console.error("Mint does not exist:", mint.toBase58());
      throw new Error("Mint does not exist");
    }
    if (mintInfo.owner.toBase58() !== TOKEN_2022_PROGRAM_ID.toBase58()) {
      console.error("Mint is not a Token-2022 token:", mint.toBase58());
      throw new Error("Mint is not a Token-2022 token");
    }

    // Load keypair
    let keypair;
    try {
      const secret = JSON.parse(process.env.KEYPAIR_JSON);
      keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    } catch (e) {
      console.error("Invalid KEYPAIR_JSON format");
      throw new Error("Invalid KEYPAIR_JSON format");
    }
    sender = keypair.publicKey;
    console.log("Sender:", sender.toBase58());

    // Verify sender and mint are different
    if (sender.toBase58() === mint.toBase58()) {
      console.error("Sender and mint cannot be the same address");
      throw new Error("Sender and mint cannot be the same address");
    }

    // Check SOL balances
    const senderBalance = await connection.getBalance(sender);
    console.log("Sender SOL balance:", senderBalance / 1e9, "SOL");
    if (senderBalance < 0.00203928 * 1e9) {
      console.error("Sender has insufficient SOL to create ATA");
      throw new Error("Sender has insufficient SOL to create ATA");
    }

    const recipientBalance = await connection.getBalance(recipient);
    console.log("Recipient SOL balance:", recipientBalance / 1e9, "SOL");

    // Create/get sender ATA
    console.log("Attempting to create/get sender ATA...");
    let senderTokenAccount;
    try {
      senderTokenAccount = await getOrCreateAssociatedTokenAccount(
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
    } catch (error) {
      console.error("Failed to create/get sender ATA:", error);
      throw error;
    }

    // Create/get recipient ATA
    console.log("Attempting to create/get recipient ATA...");
    let recipientTokenAccount;
    try {
      recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
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
    } catch (error) {
      console.error("Failed to create/get recipient ATA:", error);
      throw error;
    }

    // Validate token amount
    if (!tokens || isNaN(Number(tokens)) || Number(tokens) <= 0) {
      console.error("Invalid token amount:", tokens);
      throw new Error("Invalid token amount");
    }

    const decimals = 9;
    console.log("Mint decimals:", decimals);

    const amount = Number(tokens) * 10 ** decimals;
    console.log("Transfer amount:", amount, "in smallest units");

    // Perform transfer
    console.log("Initiating transfer...");
    const sig = await transferChecked(
      connection,
      keypair,
      senderTokenAccount.address,
      mint,
      recipientTokenAccount.address,
      keypair,
      amount,
      decimals,
      [],
      { commitment: "confirmed" },
      TOKEN_2022_PROGRAM_ID
    );

    console.log("✅ Airdrop successful:", sig);

    return NextResponse.json({ message: "Airdrop sent!", tx: sig });
  } catch (error: any) {
    console.error("❌ Airdrop error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    if (error instanceof TokenAccountNotFoundError) {
      console.error("TokenAccountNotFoundError details:", {
        sender: sender?.toBase58(),
        mint: mint?.toBase58(),
      });
    }
    return NextResponse.json(
      { message: "Airdrop failed", error: error.message },
      { status: 500 }
    );
  }
}