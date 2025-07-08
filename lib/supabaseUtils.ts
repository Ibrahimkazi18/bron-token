import { supabase } from "./supabaseClient";

const threshold = 100;

export const validateWalletAddress = async (wallet_address: string, token_amount: number) => {
  try {
    const { data: walletData, error: fetchError } = await supabase
      .from("airdrop")
      .select("*")
      .eq("wallet_address", wallet_address)
      .single();

    if (walletData) {
      const currentTokens = walletData.token_amount;
      const newTotal = currentTokens + token_amount;

      const token_to_be_added = newTotal >= threshold
        ? threshold - currentTokens
        : token_amount;

      if (currentTokens >= threshold) {
        return {
          success: false,
          message: "This wallet has already reached the maximum airdrop limit.",
          token_amount: currentTokens,
          thresholdReached: true,
        };
      }

      const { error: updateError } = await supabase
        .from("airdrop")
        .update({ token_amount: currentTokens + token_to_be_added })
        .eq("wallet_address", wallet_address);

      if (updateError) {
        return {
          success: false,
          message: "Error updating token amount.",
          token_amount: currentTokens,
          thresholdReached: false,
        };
      }

      return {
        success: true,
        message: `Airdropped ${token_to_be_added} tokens.`,
        token_amount: currentTokens + token_to_be_added,
        tokens: token_to_be_added,
        thresholdReached: currentTokens + token_to_be_added >= threshold,
      };
    }

    const { data: inserted, error: insertError } = await supabase
      .from("airdrop")
      .insert({ wallet_address, token_amount: 0 })
      .select()
      .single();

    if (insertError || !inserted) {
      return {
        success: false,
        message: "Failed to initialize wallet for airdrop.",
        token_amount: 0,
        thresholdReached: false,
      };
    }

    const tokensAfterInsert = inserted.token_amount;
    const token_to_be_added = token_amount >= threshold
      ? threshold
      : token_amount;

    const { error: updateAfterInsertError } = await supabase
      .from("airdrop")
      .update({ token_amount: token_to_be_added })
      .eq("wallet_address", wallet_address);

    if (updateAfterInsertError) {
      return {
        success: false,
        message: "Failed to update token amount after wallet creation.",
        token_amount: 0,
        thresholdReached: false,
      };
    }

    return {
      success: true,
      message: `Wallet created and airdropped ${token_to_be_added} tokens.`,
      token_amount: token_to_be_added,
      tokens: token_to_be_added,
      thresholdReached: token_to_be_added >= threshold,
    };

  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred.",
      token_amount: 0,
      thresholdReached: false,
    };
  }
};
