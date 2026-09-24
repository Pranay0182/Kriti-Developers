import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve('C:/Kriti Developers/logo.png');
const outputPath = path.resolve('C:/Kriti Developers/site/public/logo-transparent.png');
const outputPathAdmin = path.resolve('C:/Kriti Developers/admin/public/logo-transparent.png');

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Distance from pure white
    const dr = 255 - r;
    const dg = 255 - g;
    const db = 255 - b;
    
    // Max distance defines alpha
    const maxDiff = Math.max(dr, dg, db);
    
    // If very close to white (background paper noise threshold)
    if (maxDiff < 8) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
      continue;
    }

    // Smooth alpha ramp
    const alpha = Math.min(1, Math.max(0, (maxDiff - 4) / (255 - 4)));
    
    if (alpha <= 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
    } else {
      // Un-multiply white background to recover true foreground gold color
      const trueR = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - alpha)) / alpha)));
      const trueG = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - alpha)) / alpha)));
      const trueB = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - alpha)) / alpha)));

      out[i] = trueR;
      out[i + 1] = trueG;
      out[i + 2] = trueB;
      out[i + 3] = Math.round(alpha * 255);
    }
  }

  // Trim empty transparent border
  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  await sharp(outputPath).toFile(outputPathAdmin);
  console.log('Successfully generated transparent gold logo!');
}

processLogo().catch(console.error);
