import fs from 'node:fs/promises';
import sharp from 'sharp';

const assets = new URL('../public/assets/', import.meta.url);
const combined = await fs.readFile(new URL('tirun-animated.svg', assets), 'utf8');
// Extract the original symbol, then freeze its fully revealed state.
const symbol = combined.match(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="607"[\s\S]*?<\/svg>/)?.[0];
if (!symbol) throw new Error('Animated TiRun symbol not found');
const still = symbol
  .replace(/<style>[\s\S]*?<\/style>/g, '')
  .replace(/<mask\b[\s\S]*?<\/mask>/g, '')
  .replace(/<g mask="url\(#roadReveal\)"[\s\S]*?<\/g>/g, '')
  .replace(/<!--([\s\S]*?)-->/g, '')
  .replace('width="607" height="594" viewBox="0 0 607 594"', 'width="640" height="640" viewBox="-16 -23 640 640"');
const svg = still.replace(/(<svg[^>]*>)/, '$1\n<rect x="-16" y="-23" width="640" height="640" rx="100" fill="#ffffff"/>');
await fs.writeFile(new URL('favicon.svg', assets), svg);
const sizes = [16, 32, 48, 180, 192, 512];
const pngs = new Map();
for (const size of sizes) {
  const png = await sharp(Buffer.from(svg), { density: 192 }).resize(size, size).png().toBuffer();
  pngs.set(size, png);
  const name = size === 180 ? 'apple-touch-icon.png' : size >= 192 ? `android-chrome-${size}x${size}.png` : `favicon-${size}x${size}.png`;
  await fs.writeFile(new URL(name, assets), png);
}
// ICO directory containing PNG images at the common browser sizes.
const icoSizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
icoSizes.forEach((size, index) => {
  const entry = 6 + index * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs.get(size).length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs.get(size).length;
});
await fs.writeFile(new URL('favicon.ico', assets), Buffer.concat([header, ...icoSizes.map(size => pngs.get(size))]));
console.log('Generated SVG, ICO (16/32/48), PNG (16/32/48), Apple (180), and Android (192/512) icons.');
