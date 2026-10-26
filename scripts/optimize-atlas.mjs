import sharp from 'sharp';
import { stat, unlink } from 'fs/promises';

const input = 'public/project_images/atlas_hero.png';
const hero = 'public/project_images/atlas_hero.webp';
const full = 'public/project_images/atlas_full.webp';

const before = (await stat(input)).size;

// Hero crop: top 1818x1136 (16:10 ratio) — matches the card aspect-ratio
await sharp(input)
  .extract({ left: 0, top: 0, width: 1818, height: 1136 })
  .webp({ quality: 92, effort: 6 })
  .toFile(hero);

// Full landing as webp, resized to a reasonable width for gallery
await sharp(input)
  .resize({ width: 1400 })
  .webp({ quality: 90, effort: 6 })
  .toFile(full);

const heroSize = (await stat(hero)).size;
const fullSize = (await stat(full)).size;

console.log(`original: ${(before / 1024).toFixed(0)} KB`);
console.log(`hero:     ${(heroSize / 1024).toFixed(0)} KB`);
console.log(`full:     ${(fullSize / 1024).toFixed(0)} KB`);

await unlink(input);
console.log('removed original PNG');
