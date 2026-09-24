import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function run() {
  console.log('1. Downloading 22MB image from R2...');
  const res = await fetch('https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790240142375-2.png');
  const buf = Buffer.from(await res.arrayBuffer());
  console.log('Downloaded:', buf.length, 'bytes');

  console.log('2. Optimizing 7680px PNG to 2560px WebP...');
  const optimizedBuf = await sharp(buf)
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  console.log('Optimized size:', (optimizedBuf.length / 1024).toFixed(1), 'KB (was 22.4 MB!)');

  const fileName = 'kriti-manjula-showcase-optimized.webp';
  console.log('3. Uploading optimized WebP to Cloudflare R2...');
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: optimizedBuf,
      ContentType: 'image/webp',
    })
  );

  const newUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
  console.log('Uploaded to R2:', newUrl);

  console.log('4. Updating Supabase database...');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  // Update site_setting
  const setRes = await pool.query('SELECT key, value FROM site_setting');
  for (const row of setRes.rows) {
    let changed = false;
    let val = row.value;

    if (row.key === 'featured') {
      val.image = newUrl;
      changed = true;
    }
    if (row.key === 'hero') {
      if (Array.isArray(val.images)) {
        val.images = val.images.map((img) => (img.includes('2.png') ? newUrl : img));
      }
      if (val.heroImage && val.heroImage.includes('2.png')) {
        val.heroImage = newUrl;
      }
      changed = true;
    }
    if (row.key === 'findYourNext') {
      val.image = 'https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196626089-whatsapp-image-2026-09-22-at-5.10.48-pm.avif';
      changed = true;
    }

    if (changed) {
      await pool.query('UPDATE site_setting SET value = $1 WHERE key = $2', [JSON.stringify(val), row.key]);
      console.log('Updated setting:', row.key);
    }
  }

  // Update projects table: replace photo-1545324418-cc1a3fa10c00 with real Kriti images
  await pool.query(
    'UPDATE "project" SET "heroImage" = $1 WHERE slug = $2',
    ['https://pub-a960e227e6d7427991deaa543564e119.r2.dev/1790196597978-whatsapp-image-2026-09-22-at-5.10.21-pm.avif', 'kriti-heights']
  );
  console.log('Updated kriti-heights heroImage');

  await pool.query(
    'UPDATE "project" SET "heroImage" = $1 WHERE slug = $2',
    ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', 'kriti-urban']
  );
  console.log('Updated kriti-urban heroImage');

  await pool.end();
  console.log('All image fixes completed successfully!');
}

run().catch(console.error);
