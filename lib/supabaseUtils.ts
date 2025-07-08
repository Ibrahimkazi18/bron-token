import { toast } from "sonner"
import { supabase } from "./supabaseClient"

export const validateWalletAddress = async (wallet_address: string) => {
    try {
        const { data: data, error: err } = await supabase.from("airdrop").select("*").eq("wallet_address", wallet_address)
        if (err) {
            toast.error(err?.message)
        }
        if (!data) {
            const { data: response, error: error } = await supabase.from('airdrop').insert({ wallet_address, token_amount: 0 })
            if (error) {
                toast.error(error?.message)
            }
            if (response) {
                console.log(response);
                toast.success("Wallet Address Registered")
            } else {
                console.log("no data while inserting in airdrop")
            }
        }

    } catch (error) {

    }
}