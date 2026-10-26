import sharp from 'sharp';
import { stat, unlink } from 'fs/promises';

const input = 'public/project_images/omada_src.png';
const hero = 'public/project_images/omada_hero.webp';
const full = 'public/project_images/omada_full.webp';

const before = (await stat(input)).size;
const meta = await sharp(input).metadata();
console.log(`source: ${meta.width}x${meta.height}, ${(before / 1024).toFixed(0)} KB`);

// Hero crop: top of the landing at 16:10 ratio
const cropW = meta.width;
const cropH = Math.round(cropW * 10 / 16);
await sharp(input)
  .extract({ left: 0, top: 0, width: cropW, height: cropH })
  .webp({ quality: 92, effort: 6 })
  .toFile(hero);

// Full landing, resized to 1400px wide for gallery
await sharp(input)
  .resize({ width: 1400 })
  .webp({ quality: 90, effort: 6 })
  .toFile(full);

const heroSize = (await stat(hero)).size;
const fullSize = (await stat(full)).size;
console.log(`hero: ${(heroSize / 1024).toFixed(0)} KB`);
console.log(`full: ${(fullSize / 1024).toFixed(0)} KB`);

await unlink(input);
