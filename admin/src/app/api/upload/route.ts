import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicUrl = await uploadToR2(buffer, file.name, file.type || "application/octet-stream");

    return NextResponse.json({ url: publicUrl, name: file.name, size: file.size });
  } catch (error: any) {
    console.error("R2 Upload Error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
