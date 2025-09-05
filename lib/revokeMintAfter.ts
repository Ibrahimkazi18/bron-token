import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import {
  createSetAuthorityInstruction,
  getMint,
  AuthorityType,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

type RevokeAfterParams = {
  mint: PublicKey;
  userWallet: WalletAdapter;
};

export async function revokeMintAfter({ mint, userWallet }: RevokeAfterParams) {
  // Initialize connection
  const rpcUrl = `${window.location.origin}/api/rpc`;
  const connection = new Connection(rpcUrl, "confirmed");

  // Validate wallet connection
  if (!userWallet.connected || !userWallet.publicKey) {
    throw new Error("Wallet is not connected");
  }
  const authority = userWallet.publicKey;

  // Validate mint address and check existence
  try {
    new PublicKey(mint);
    const mintInfo = await getMint(
      connection,
      mint,
      "confirmed",
      TOKEN_2022_PROGRAM_ID
    );
    // Log mint info safely, converting BigInt to string
    console.log(
      "Mint Info:",
      JSON.stringify(
        {
          ...mintInfo,
          mintAuthority: mintInfo.mintAuthority?.toBase58(),
          freezeAuthority: mintInfo.freezeAuthority?.toBase58(),
          supply: mintInfo.supply.toString(),
        },
        null,
        2
      )
    );
    if (!mintInfo) {
      throw new Error(
        `Mint account ${mint.toBase58()} does not exist!`
      );
    }
    // Check if mint authority is already revoked
    if (mintInfo.mintAuthority === null) {
      throw new Error(
        `Mint authority is already revoked for mint ${mint.toBase58()}. Verify on Solana Explorer: https://explorer.solana.com/address/${mint.toBase58()}`
      );
    }
    // Check if wallet is the current mint authority
    if (!mintInfo.mintAuthority.equals(authority)) {
      throw new Error(
        `Wallet ${authority.toBase58()} is not the current mint authority for mint ${mint.toBase58()}`
      );
    }
  } catch (error: any) {
    console.error("Invalid mint or mint authority issue:", error);
    throw new Error(
      error.message ||
        `Invalid mint address or issue with mint authority: ${mint.toBase58()}`
    );
  }

  // Create setAuthority instruction to revoke mint authority
  const revokeMintAuthorityIx = createSetAuthorityInstruction(
    mint,
    authority,
    AuthorityType.MintTokens,
    null,
    [],
    TOKEN_2022_PROGRAM_ID
  );

  // Define your fee receiver and fee amount
  const FEE_RECEIVER_ADDRESS = new PublicKey(
    "tmkyqcxDBGhcLc4mf7gyoLN2CoriyegPHLeDjWWHgdd"
  );
  const feeLamports = Math.round(0.1 * LAMPORTS_PER_SOL);

  // Create fee transfer instruction
  const feeTransferIx = SystemProgram.transfer({
    fromPubkey: authority,
    toPubkey: FEE_RECEIVER_ADDRESS,
    lamports: feeLamports,
  });

  // Create VersionedTransaction for simulation and execution
  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  const message = new TransactionMessage({
    payerKey: authority,
    recentBlockhash: blockhash,
    instructions: [feeTransferIx, revokeMintAuthorityIx],
  }).compileToV0Message();
  const versionedTransaction = new VersionedTransaction(message);

  // Simulate transaction
  console.log("Simulating mint authority revocation...");
  const simulation = await connection.simulateTransaction(
    versionedTransaction,
    {
      commitment: "confirmed",
      sigVerify: false,
    }
  );
  console.log("Simulation Result:", JSON.stringify(simulation.value, null, 2));
  if (simulation.value.err) {
    console.error("Simulation failed:", simulation.value.err);
    console.log("Simulation Logs:", simulation.value.logs);
    return null;
  }
  console.log("Simulation Logs:", simulation.value.logs);
  console.log("Simulation successful, proceeding with revocation...");

  // Sign and send transaction
  try {
    const transactionSignature = await userWallet.sendTransaction(
      versionedTransaction,
      connection,
      {
        signers: [],
        skipPreflight: false,
        preflightCommitment: "confirmed",
      }
    );

    const { blockhash: latestBlockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");
    await connection.confirmTransaction(
      {
        signature: transactionSignature,
        blockhash: latestBlockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    return {
      signature: transactionSignature,
      explorerLink: `https://explorer.solana.com/tx/${transactionSignature}`,
      message: `Mint authority revoked successfully for mint ${mint.toBase58()}`,
    };
  } catch (error: any) {
    console.error("Mint authority revocation failed:", error);
    throw new Error(`Failed to revoke mint authority: ${error.message}`);
  }
}
