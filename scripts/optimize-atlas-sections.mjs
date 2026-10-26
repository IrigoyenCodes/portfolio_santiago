import sharp from 'sharp';
import { stat, unlink } from 'fs/promises';

const sections = [
  'atlas_dashboard',
  'atlas_conversations',
  'atlas_calendar',
  'atlas_ctas',
];

for (const name of sections) {
  const input = `public/project_images/${name}_src.png`;
  const output = `public/project_images/${name}.webp`;

  const before = (await stat(input)).size;

  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(output);

  const after = (await stat(output)).size;
  console.log(`${name}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);

  await unlink(input);
}
