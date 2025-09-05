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
  createUpdateAuthorityInstruction,
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

type RevokeAfterParams = {
  mint: PublicKey;
  userWallet: WalletAdapter;
};

export async function revokeUpdateAfter({
  mint,
  userWallet,
}: RevokeAfterParams) {
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
    const mintInfo = await connection.getAccountInfo(mint);
    if (!mintInfo) {
      throw new Error(
        `Mint account ${mint.toBase58()} does not exist!`
      );
    }
    if (!mintInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
      throw new Error(
        `Mint account ${mint.toBase58()} is not owned by the Token-2022 program`
      );
    }
  } catch (error) {
    console.error("Invalid or non-existent mint address:", error);
    throw new Error(`Invalid or non-existent mint address: ${mint.toBase58()}`);
  }

  // Check metadata and update authority
  let metadata;
  try {
    metadata = await getTokenMetadata(connection, mint);
    console.log("Fetched Metadata:", JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.error("Failed to fetch Token-2022 metadata:", error);
    throw new Error(
      `Failed to fetch metadata for mint ${mint.toBase58()}. Ensure the token has a metadata extension. Verify on Solana Explorer: https://explorer.solana.com/address/${mint.toBase58()}`
    );
  }
  if (!metadata) {
    throw new Error(
      `No metadata found for mint ${mint.toBase58()}. Verify on Solana Explorer: https://explorer.solana.com/address/${mint.toBase58()}`
    );
  }
  if (
    metadata.updateAuthority === undefined ||
    metadata.updateAuthority === null
  ) {
    throw new Error(
      `Update authority already revoked for mint ${mint.toBase58()}. Verify on Solana Explorer: https://explorer.solana.com/address/${mint.toBase58()}`
    );
  }
  if (metadata.updateAuthority.toBase58() !== authority.toBase58()) {
    throw new Error(
      `Wallet ${authority.toBase58()} is not the current update authority for mint ${mint.toBase58()}`
    );
  }

  // Build instruction to revoke update authority
  const instruction = createUpdateAuthorityInstruction({
    metadata: mint,
    oldAuthority: authority,
    newAuthority: null,
    programId: TOKEN_2022_PROGRAM_ID,
  });

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
    instructions: [feeTransferIx,instruction],
  }).compileToV0Message();
  const versionedTransaction = new VersionedTransaction(message);

  // Simulate transaction
  console.log("Simulating update authority revocation...");
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
      message: `Update authority revoked successfully for mint ${mint.toBase58()}`,
    };
  } catch (error: any) {
    console.error("Update authority revocation failed:", error);
    throw new Error(`Failed to revoke update authority: ${error.message}`);
  }
}
