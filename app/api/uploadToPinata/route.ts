import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadForm = new FormData();
  uploadForm.append("file", new Blob([buffer]), file.name);
  uploadForm.append("network", "public");

  try {
    const resp = await axios.post(
      "https://uploads.pinata.cloud/v3/files",
      uploadForm,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );
    //console.log("Pinata Response:", resp.data);

    return NextResponse.json({ ipfs_hash: resp.data.data.cid });
  } catch (e: any) {
    console.error("Pinata upload error:", e.response?.data || e.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
