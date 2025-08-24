import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const data = new FormData();
  data.append("file", buffer, "metadata.json");

  try {
    const pinataRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        ...data.getHeaders(),
      },
    });

    return NextResponse.json({ ipfs_hash: pinataRes.data.IpfsHash });
  } catch (err: any) {
    console.error("Pinata upload failed:", err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
