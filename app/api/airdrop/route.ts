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

      console.log("🚀 Airdrop started for:", walletAddress);
      
      console.log("test log added")
      const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
      console.log("connection made")
      
      const mint = new PublicKey(process.env.NEXT_PUBLIC_BRON_KEY!);
      console.log("Mint:", mint.toBase58());
      const recipient = new PublicKey(walletAddress);

      const secret = JSON.parse(process.env.NEXT_PUBLIC_KEYPAIR_JSON!);
      const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
      console.log("keypair", keypair);
      const sender = keypair.publicKey;

      console.log("Sender:", sender.toBase58());

      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        sender
      );

      console.log("Sender Token Account:", senderTokenAccount.address.toBase58());

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        recipient
      );

      console.log("Recipient Token Account:", recipientTokenAccount.address.toBase58());

      // Transfer with checked decimals (assume 9 for devnet SPL tokens)
      const decimals = 9;

      const sig = await transferChecked(
        connection,
        keypair,
        senderTokenAccount.address,
        mint,
        recipientTokenAccount.address,
        keypair,
        Number(tokens) * 10 ** decimals,
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
