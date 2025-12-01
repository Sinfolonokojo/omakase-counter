import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [
  { width: 192, height: 192, name: 'icon-192.png' },
  { width: 512, height: 512, name: 'icon-512.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
];

const inputPath = path.join(__dirname, 'public', 'ICON.png');
const outputDir = path.join(__dirname, 'public');

async function resizeIcons() {
  console.log('Starting icon resize process...\n');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, size.name);

    try {
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center',
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`✓ Created ${size.name} (${size.width}x${size.height})`);
    } catch (error) {
      console.error(`✗ Failed to create ${size.name}:`, error.message);
    }
  }

  console.log('\n✓ All icons generated successfully!');
  console.log('Icons are ready in the public/ folder.');
}

resizeIcons();
