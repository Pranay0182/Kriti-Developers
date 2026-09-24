import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "0915f0b1dccc2c0df41c55564e082545";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "f29419c575c578320add51155b8d43df";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "729c577856ac76dcaf54d98c916d93ee2db85e1940c4221cc08ad1237e4ba33b";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "images";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-a960e227e6d7427991deaa543564e119.r2.dev";

export const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
  const cleanFileName = `${Date.now()}-${fileName.replace(/\s+/g, "-").toLowerCase()}`;
  
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: cleanFileName,
      Body: fileBuffer,
      ContentType: contentType,
    })
  );

  return `${R2_PUBLIC_URL}/${cleanFileName}`;
}

export async function deleteFromR2(fileKey: string): Promise<void> {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
    })
  );
}
