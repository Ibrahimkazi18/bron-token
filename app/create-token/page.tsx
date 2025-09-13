"use client";

import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropletIcon,
  Upload,
  Coins,
  Flame,
  Copy,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch-option";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createTokenWithMetadata } from "@/lib/createToken";
import { revokeMintAfter } from "@/lib/revokeMintAfter";
import { revokeFreezeAfter } from "@/lib/revokeFreezeAfter";
import { revokeUpdateAfter } from "@/lib/revokeUpdateAfter";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Connection, PublicKey } from "@solana/web3.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateLiquidityPool from "@/components/createLP";
import TokenInventory from "@/components/burnTokens";

export default function TokenManagementPage() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimals: 6,
    description: "",
    file: null as File | null,
    totalSupply: "",
    revokeMint: false,
    revokeFreeze: false,
    revokeUpdate: false,
  });

  const { wallet, publicKey } = useWallet();
  const umi = useMemo(() => {
    if (!wallet || !wallet.adapter || !publicKey) return null;
    const rpcUrl = `https://www.brontoken.com/api/rpc`;
    return createUmi(rpcUrl)
      .use(walletAdapterIdentity(wallet.adapter))
      .use(mplTokenMetadata());
  }, [wallet, publicKey]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mintAddressMint, setMintAddressMint] = useState<string>("");
  const [mintAddressFreeze, setMintAddressFreeze] = useState<string>("");
  const [mintAddressUpdate, setMintAddressUpdate] = useState<string>("");
  const [isRevokingMint, setIsRevokingMint] = useState(false);
  const [isRevokingFreeze, setIsRevokingFreeze] = useState(false);
  const [isRevokingUpdate, setIsRevokingUpdate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rpcUrl = `https://www.brontoken.com/api/rpc`;
  const connection = useMemo(() => new Connection(rpcUrl, "confirmed"), []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Token name is required.";
    if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required.";
    if (formData.symbol.length > 8)
      newErrors.symbol = "Symbol cannot exceed 8 characters.";
    if (!formData.decimals || formData.decimals < 1 || formData.decimals > 9)
      newErrors.decimals = "Decimals must be between 1 and 9.";
    if (!imageFile) newErrors.file = "Image is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (formData.description.length > 300)
      newErrors.description = "Description cannot exceed 300 characters.";
    if (!formData.totalSupply) {
      newErrors.totalSupply = "Supply is required.";
    } else {
      const supply = Number.parseFloat(formData.totalSupply);
      if (isNaN(supply) || supply <= 0) {
        newErrors.totalSupply = "Enter a valid supply.";
      } else {
        const maxSupply =
          formData.decimals <= 4
            ? 1_844_674_407_370_955
            : formData.decimals <= 7
            ? 1_844_674_407_370
            : formData.decimals === 8
            ? 184_467_440_737
            : 18_446_744_073;
        if (supply > maxSupply) {
          newErrors.totalSupply = `For decimals ${
            formData.decimals
          }, max supply is ${maxSupply.toLocaleString()}`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        toast.error("Image size must be 1MB or smaller.", {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setImageFile(null);
        setFileName(null);
        setPreviewUrl(null);
        return;
      }

      if (file.type !== "image/png") {
        toast.error("Only PNG files are allowed.", {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setImageFile(null);
        setFileName(null);
        setPreviewUrl(null);
        return;
      }

      setImageFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToPinata = async () => {
    if (!imageFile) return null;

    const form = new FormData();
    form.append("file", imageFile);

    const res = await fetch("/api/uploadToPinata", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      toast.error("Failed to upload image to IPFS.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return null;
    }

    const data = await res.json();
    toast.success("Image uploaded successfully to IPFS!", {
      className:
        "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
      progressClassName: "bg-green-300",
    });
    return data.ipfs_hash as string;
  };

  const uploadMetadataToPinata = async (metadata: any) => {
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    formData.append("file", blob, "metadata.json");

    const res = await fetch("/api/uploadMetadataToPinata", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast.error("Failed to upload metadata to IPFS.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return null;
    }

    const data = await res.json();
    toast.success("Metadata uploaded successfully to IPFS!", {
      className:
        "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
      progressClassName: "bg-green-300",
    });
    return data.ipfs_hash as string;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (!wallet?.adapter || !publicKey) {
      toast.error("Please connect your wallet.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    try {
      const ipfsHash = await uploadToPinata();
      if (!ipfsHash) return;

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const metadata = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        image: imageUrl,
      };

      const metadataHash = await uploadMetadataToPinata(metadata);
      if (!metadataHash) return;

      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

      const decimals = Number(formData.decimals);
      const rawSupply = Number(formData.totalSupply);
      const supply = BigInt(rawSupply * 10 ** decimals);

      const result = await createTokenWithMetadata({
        name: formData.name,
        metadataUri: metadataUrl,
        decimals,
        supply,
        revokeMint: formData.revokeMint,
        revokeFreeze: formData.revokeFreeze,
        revokeUpdate: formData.revokeUpdate,
        userWallet: wallet.adapter,
        symbol: formData.symbol,
      });
      if (!result) {
        toast.error(
          "Transaction Simulation Failed! Please ensure your wallet has sufficient funds and try again",
          {
            className: "bg-red-500 text-white text-sm max-w-[90%] break-words",
            progressClassName: "bg-red-300",
          }
        );
        return null;
      }
      const { signature, mintAddress, explorerLink } = result;

      toast.info(
        ({ closeToast }) => (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="break-all">
              Mint Address: {mintAddress.toBase58()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(mintAddress.toBase58());
                toast.success("Mint address copied to clipboard!", {
                  className:
                    "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
                  progressClassName: "bg-green-300",
                });
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        ),
        {
          className:
            "bg-blue-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-blue-300",
        }
      );

      toast.info(
        ({ closeToast }) => (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="break-all">
              Transaction Signature: {signature.slice(0, 4)}...
              {signature.slice(-4)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`https://solscan.io/tx/${signature}?`, "_blank")
              }
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        ),
        {
          className:
            "bg-blue-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-blue-300",
        }
      );

      toast.success(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p>Token created successfully!</p>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(mintAddress.toBase58());
                  toast.success("Mint address copied to clipboard!", {
                    className:
                      "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
                    progressClassName: "bg-green-300",
                  });
                }}
              >
                Copy Mint Address
                <Copy className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://solscan.io/token/${mintAddress.toBase58()}? `,
                    "_blank"
                  )
                }
              >
                View on Solscan
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ),
        {
          className:
            "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-green-300",
        }
      );

      setFormData({
        name: "",
        symbol: "",
        decimals: 6,
        description: "",
        file: null,
        totalSupply: "",
        revokeMint: false,
        revokeFreeze: false,
        revokeUpdate: false,
      });
      setImageFile(null);
      setFileName(null);
      setPreviewUrl(null);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create token. Please try again.",
        {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        }
      );
    }
  };

  const handleRevokeMint = async () => {
    if (!mintAddressMint) {
      toast.error("Please enter a valid mint address.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }
    if (!wallet?.adapter || !publicKey) {
      toast.error("Please connect your wallet.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    let mintPublicKey: PublicKey;
    try {
      mintPublicKey = new PublicKey(mintAddressMint);
    } catch (error) {
      toast.error("Invalid mint address provided.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    setIsRevokingMint(true);
    try {
      const result = await revokeMintAfter({
        mint: mintPublicKey,
        userWallet: wallet.adapter,
      });
      if (!result) {
        toast.error(
          "Transaction Simulation Failed! Please check the wallet, mint address, an other parameters before revoking the authorities",
          {
            className:
              "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
            progressClassName: "bg-red-300",
          }
        );
        return;
      }
      const { signature, explorerLink } = result;
      toast.success(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p>Mint authority revoked successfully!</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`https://solscan.io/tx/${signature}?`, "_blank")
              }
            >
              View on Solscan
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ),
        {
          className:
            "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-green-300",
        }
      );
      setMintAddressMint("");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to revoke mint authority. Please ensure you have the authority and the mint address is valid.",
        {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        }
      );
    } finally {
      setIsRevokingMint(false);
    }
  };

  const handleRevokeFreeze = async () => {
    if (!mintAddressFreeze) {
      toast.error("Please enter a valid mint address.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }
    if (!wallet?.adapter || !publicKey) {
      toast.error("Please connect your wallet.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    let mintPublicKey: PublicKey;
    try {
      mintPublicKey = new PublicKey(mintAddressFreeze);
    } catch (error) {
      toast.error("Invalid mint address provided.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    setIsRevokingFreeze(true);
    try {
      const result = await revokeFreezeAfter({
        mint: mintPublicKey,
        userWallet: wallet.adapter,
      });
      if (!result) {
        toast.error(
          "Transaction Simulation Failed! Please check the wallet, mint address, an other parameters before revoking the authorities",
          {
            className:
              "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
            progressClassName: "bg-red-300",
          }
        );
        return;
      }
      const { signature, explorerLink } = result;
      toast.success(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p>Freeze authority revoked successfully!</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`https://solscan.io/tx/${signature}?`, "_blank")
              }
            >
              View on Solscan
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ),
        {
          className:
            "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-green-300",
        }
      );
      setMintAddressFreeze("");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to revoke freeze authority. Please ensure you have the authority and the mint address is valid.",
        {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        }
      );
    } finally {
      setIsRevokingFreeze(false);
    }
  };

  const handleRevokeUpdate = async () => {
    if (!mintAddressUpdate) {
      toast.error("Please enter a valid mint address.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }
    if (!wallet?.adapter || !publicKey) {
      toast.error("Please connect your wallet.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    let mintPublicKey: PublicKey;
    try {
      mintPublicKey = new PublicKey(mintAddressUpdate);
    } catch (error) {
      toast.error("Invalid mint address provided.", {
        className:
          "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
        progressClassName: "bg-red-300",
      });
      return;
    }

    setIsRevokingUpdate(true);
    try {
      const result = await revokeUpdateAfter({
        mint: mintPublicKey,
        userWallet: wallet.adapter,
      });
      if (!result) {
        toast.error(
          "Transaction Simulation Failed! Please check the wallet, mint address, an other parameters before revoking the authorities",
          {
            className:
              "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
            progressClassName: "bg-red-300",
          }
        );
        return;
      }
      const { signature, explorerLink } = result;
      toast.success(
        ({ closeToast }) => (
          <div className="space-y-2">
            <p>Update authority revoked successfully!</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`https://solscan.io/tx/${signature}?`, "_blank")
              }
            >
              View on Solscan
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ),
        {
          className:
            "bg-green-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-green-300",
        }
      );
      setMintAddressUpdate("");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Failed to revoke update authority. Please ensure you have the authority and the mint address is valid.",
        {
          className:
            "bg-red-500 text-white text-sm max-w-[90%] break-words overflow-hidden",
          progressClassName: "bg-red-300",
        }
      );
    } finally {
      setIsRevokingUpdate(false);
    }
  };

  const ConnectWalletSection = () => (
    <div className="flex justify-center py-6">
      <WalletMultiButton className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base" />
    </div>
  );

  return (
    <div
      className="bg-black/30 w-full min-h-screen overflow-x-hidden"
      style={{ boxSizing: "border-box" }}
    >
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
      `}</style>
      <div className="text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 sm:py-12">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick
          pauseOnHover
          theme="colored"
          className="z-[1000] w-full max-w-[90%] sm:max-w-md"
          toastClassName="rounded-lg p-4 text-sm overflow-hidden"
        />
        <section className="text-center space-y-5 p-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Meme Token LaunchPad
          </h1>
          <p className="text-sm sm:text-base p-3 text-white font-semibold flex items-center justify-center gap-2">
            Launch your own Token-2022 Meme Coins on Solana using our tools!
          </p>
          <h2 className="text-sm sm:text-base glass-effect p-3 text-cyan-300 font-semibold flex items-center justify-center gap-2">
            Remember to buy $BRON to support us!
          </h2>
          <h2 className="text-sm sm:text-base font-medium text-yellow-300 flex items-between justify-center gap-2 glass-effect border rounded-lg p-3">
            <AlertTriangle size={25} className=" text-yellow-400" />
            Beta Warning: This section is new and may contain bugs. Proceed at
            your own risk!
          </h2>
          <ConnectWalletSection />
        </section>

        <Tabs defaultValue="create-token" className="w-full">
          <TabsList className="grid bg-black/50 w-full mx-auto grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 rounded-xl gap-2 sm:gap-0">
            <TabsTrigger
              value="create-token"
              className="text-sm sm:text-base flex data-[state=active]:bg-gradient-to-r from-green-400/70 via-blue-400/70 to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 rounded-xl py-3 sm:py-0"
            >
              <Coins className="w-4 h-4" /> Create Token
            </TabsTrigger>
            <TabsTrigger
              value="add-liquidity"
              className="text-sm sm:text-base flex data-[state=active]:bg-gradient-to-r from-green-400/50 via-blue-400/70 to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 rounded-xl py-3 sm:py-0"
            >
              <DropletIcon className="w-4 h-4" /> Create Liquidity Pool
            </TabsTrigger>
            <TabsTrigger
              value="burn-coin"
              className="text-sm sm:text-base flex data-[state=active]:bg-gradient-to-r from-green-400/50 via-blue-400/70 to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 rounded-xl py-3 sm:py-0"
            >
              <Flame className="w-4 h-4" /> Burn Coin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create-token" className="mt-8 space-y-8">
            <section className="p-4 sm:p-6 bg-black/50 space-y-4 rounded-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-center">
                How it works
              </h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 text-sm sm:text-base">
                <li className="text-green-400">
                  <span className="text-white">
                    Connect your Solana wallet.
                  </span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">Enter your Token Name</span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">
                    Choose a Symbol (max 8 characters)
                  </span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">
                    Select Decimals (recommended: 6)
                  </span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">Add a description</span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">
                    Upload a PNG image (token logo)
                  </span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">Enter total Supply</span>
                </li>
                <li className="text-green-400">
                  <span className="text-white">
                    Click Create – confirm the transaction
                  </span>
                </li>
              </ol>
              <div className="bg-card text-card-foreground p-3 text-center text-sm font-medium border border-green-400/50">
                Total cost:{" "}
                <span className="font-semibold text-green-400">0.1 SOL</span> +
                gas fees.
              </div>
            </section>

            <section>
              <Card className="bg-black/50 border-none rounded-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl sm:text-2xl">
                    Token Creator
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Fill in the details to create your new token.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="token-name"
                        className="text-sm sm:text-base"
                      >
                        Token Name (Max 32 Characters)
                      </Label>
                      <Input
                        id="token-name"
                        placeholder="Eg: MemeToken"
                        maxLength={32}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border-gray-100/70 text-sm sm:text-base py-2"
                      />
                      {errors.name && (
                        <p className="text-destructive text-red-600 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="token-symbol"
                        className="text-sm sm:text-base"
                      >
                        Token Symbol (Max 8 Characters)
                      </Label>
                      <Input
                        id="token-symbol"
                        placeholder="Eg: MEME"
                        maxLength={8}
                        value={formData.symbol}
                        onChange={(e) =>
                          setFormData({ ...formData, symbol: e.target.value })
                        }
                        className="border-gray-100/70 text-sm sm:text-base py-2"
                      />
                      {errors.symbol && (
                        <p className="text-destructive text-red-600 text-sm mt-1">
                          {errors.symbol}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="decimals"
                        className="text-sm sm:text-base"
                      >
                        Decimals (Range 1-9)
                      </Label>
                      <Input
                        id="decimals"
                        type="number"
                        placeholder="Decimals"
                        value={formData.decimals}
                        min={1}
                        max={9}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            decimals: Number.parseInt(e.target.value || "0"),
                          })
                        }
                        className="border-gray-100/70 text-sm sm:text-base py-2"
                      />
                      {errors.decimals && (
                        <p className="text-destructive text-red-600 text-sm mt-1">
                          {errors.decimals}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="total-supply"
                        className="text-sm sm:text-base"
                      >
                        Total Supply
                      </Label>
                      <Input
                        id="total-supply"
                        type="number"
                        placeholder="Eg: 1000000000"
                        value={formData.totalSupply}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalSupply: e.target.value,
                          })
                        }
                        className="border-gray-100/70 text-sm sm:text-base py-2"
                      />
                      {errors.totalSupply && (
                        <p className="text-destructive text-red-600 text-sm mt-1">
                          {errors.totalSupply}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm sm:text-base"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Eg: This is just a meme token made for fun :P"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="border-gray-100/70 text-sm sm:text-base min-h-[100px]"
                    />
                    {errors.description && (
                      <p className="text-destructive text-red-600 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="file-upload"
                      className="text-sm sm:text-base"
                    >
                      Token Logo (PNG)
                    </Label>
                    <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors border-gray-100/70">
                      <span className="text-sm font-medium text-muted-foreground">
                        {previewUrl ? (
                          <div className="text-center">
                            <img
                              src={previewUrl}
                              alt="Selected Preview"
                              className="mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md border"
                            />
                            {fileName && (
                              <p className="text-sm mt-2 break-all">
                                Selected file: {fileName}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="grid-cols-1 text-center">
                            <Upload className="w-8 sm:w-10 mx-auto h-8 sm:h-10 text-muted-foreground mb-2" />
                            Click to upload or drag and drop
                          </div>
                        )}
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/png"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                    </div>
                    {errors.file && (
                      <p className="text-destructive text-red-600 text-sm mt-1">
                        {errors.file}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-green-400/70 border rounded-lg bg-card">
                    <div className="space-y-1">
                      <Label
                        htmlFor="revoke-freeze"
                        className="text-sm sm:text-base"
                      >
                        Revoke Freeze Authority
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Prevents freezing of token accounts – required for
                        liquidity pools.
                        <strong> Optional, but recommended.</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <Switch
                        id="revoke-freeze"
                        checked={formData.revokeFreeze}
                        onCheckedChange={(val) =>
                          setFormData({ ...formData, revokeFreeze: val })
                        }
                        color="green"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg border-blue-400/80 bg-card">
                    <div className="space-y-1">
                      <Label
                        htmlFor="revoke-mint"
                        className="text-sm sm:text-base"
                      >
                        Revoke Mint Authority
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Prevents any further minting of tokens – useful for
                        building trust. <strong> Optional.</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <Switch
                        id="revoke-mint"
                        checked={formData.revokeMint}
                        onCheckedChange={(val) =>
                          setFormData({ ...formData, revokeMint: val })
                        }
                        color="blue"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-card border-purple-400/80">
                    <div className="space-y-1">
                      <Label
                        htmlFor="revoke-update"
                        className="text-sm sm:text-base"
                      >
                        Revoke Update Authority
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Prevents any further metadata update – useful for
                        building trust. Optional.{" "}
                        <b>
                          <br />
                          Do not revoke if you would like to change the token
                          metadata later on!
                        </b>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <Switch
                        id="revoke-update"
                        checked={formData.revokeUpdate}
                        onCheckedChange={(val) =>
                          setFormData({ ...formData, revokeUpdate: val })
                        }
                        color="purple"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full rounded-xl text-sm sm:text-md mt-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-semibold hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-300 hover:to-purple-400 py-3"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!publicKey}
                  >
                    Create Token
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-4">
              <Card className="bg-black/50 border-none rounded-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl sm:text-2xl">
                    Revoke Token Authorities
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Manage mint, freeze, or update authorities for a token.
                    <div className="bg-card text-card-foreground mt-5 p-3 text-center text-sm font-medium border border-green-400/50">
                      Total cost:{" "}
                      <span className="font-semibold text-green-400">
                        0.1 SOL
                      </span>{" "}
                      + gas fees per transaction.
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="mint" className="w-full">
                    <TabsList className="grid bg-black/50 w-full mx-auto grid-cols-1 sm:grid-cols-3 h-auto sm:h-12 rounded-xl gap-2 sm:gap-0">
                      <TabsTrigger
                        value="mint"
                        className="text-sm sm:text-base rounded-xl flex data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400/70 data-[state=active]:via-blue-400/70 data-[state=active]:to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 py-3 sm:py-0"
                      >
                        Mint Authority
                      </TabsTrigger>
                      <TabsTrigger
                        value="freeze"
                        className="text-sm sm:text-base rounded-xl flex data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400/70 data-[state=active]:via-blue-400/70 data-[state=active]:to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 py-3 sm:py-0"
                      >
                        Freeze Authority
                      </TabsTrigger>
                      <TabsTrigger
                        value="update"
                        className="text-sm sm:text-base rounded-xl flex data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400/70 data-[state=active]:via-blue-400/70 data-[state=active]:to-purple-500/70 border data-[state=active]:border-gray-100/70 border-transparent data-[state=active]:text-white items-center gap-2 py-3 sm:py-0"
                      >
                        Update Authority
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="mint" className="space-y-4 mt-4">
                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        Enter the token mint address to revoke its mint
                        authority. <strong>This action is irreversible.</strong>
                      </p>
                      <div className="space-y-2">
                        <Label
                          htmlFor="mint-address-mint"
                          className="text-sm sm:text-base"
                        >
                          Token Mint Address
                        </Label>
                        <Input
                          id="mint-address-mint"
                          placeholder="Enter mint address (e.g., 7xKX...yzAB)"
                          value={mintAddressMint}
                          onChange={(e) => setMintAddressMint(e.target.value)}
                          className="border-gray-100/70 text-sm sm:text-base py-2"
                        />
                      </div>
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white text-sm sm:text-md font-semibold py-3"
                        size="lg"
                        onClick={handleRevokeMint}
                        disabled={
                          isRevokingMint || !mintAddressMint || !publicKey
                        }
                      >
                        {isRevokingMint
                          ? "Revoking..."
                          : "Revoke Mint Authority"}
                      </Button>
                    </TabsContent>
                    <TabsContent value="freeze" className="space-y-4 mt-4">
                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        Enter the token mint address to revoke its freeze
                        authority. <strong>This action is irreversible.</strong>
                      </p>
                      <div className="space-y-2">
                        <Label
                          htmlFor="mint-address-freeze"
                          className="text-sm sm:text-base"
                        >
                          Token Mint Address
                        </Label>
                        <Input
                          id="mint-address-freeze"
                          placeholder="Enter mint address (e.g., 7xKX...yzAB)"
                          value={mintAddressFreeze}
                          onChange={(e) => setMintAddressFreeze(e.target.value)}
                          className="border-gray-100/70 text-sm sm:text-base py-2"
                        />
                      </div>
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white text-sm sm:text-md font-semibold py-3"
                        size="lg"
                        onClick={handleRevokeFreeze}
                        disabled={
                          isRevokingFreeze || !mintAddressFreeze || !publicKey
                        }
                      >
                        {isRevokingFreeze
                          ? "Revoking..."
                          : "Revoke Freeze Authority"}
                      </Button>
                    </TabsContent>
                    <TabsContent value="update" className="space-y-4 mt-4">
                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        Enter the token mint address to revoke its update
                        authority. <strong>This action is irreversible.</strong>
                      </p>
                      <div className="space-y-2">
                        <Label
                          htmlFor="mint-address-update"
                          className="text-sm sm:text-base"
                        >
                          Token Mint Address
                        </Label>
                        <Input
                          id="mint-address-update"
                          placeholder="Enter mint address (e.g., 7xKX...yzAB)"
                          value={mintAddressUpdate}
                          onChange={(e) => setMintAddressUpdate(e.target.value)}
                          className="border-gray-100/70 text-sm sm:text-base py-2"
                        />
                      </div>
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white text-sm sm:text-md font-semibold py-3"
                        size="lg"
                        onClick={handleRevokeUpdate}
                        disabled={
                          isRevokingUpdate || !mintAddressUpdate || !publicKey
                        }
                      >
                        {isRevokingUpdate
                          ? "Revoking..."
                          : "Revoke Update Authority"}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="add-liquidity">
            <CreateLiquidityPool connection={connection} />
          </TabsContent>

          <TabsContent value="burn-coin" className="mt-8">
            <Card className="border-none bg-black/50 rounded-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">
                  Burn Meme Coin
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Reduce the total supply of your token by burning a specified
                  amount.
                  <div className="bg-card text-card-foreground mt-5 p-3 text-center text-sm font-medium border border-green-400/50">
                    Total cost:{" "}
                    <span className="font-semibold text-green-400">
                      0.1 SOL
                    </span>{" "}
                    + gas fees.
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TokenInventory connection={connection} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
