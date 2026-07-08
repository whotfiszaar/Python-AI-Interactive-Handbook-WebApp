// Generates PWA PNG icons from public/icon.svg.
// Run with: bun run scripts/generate-icons.ts
import sharp from "sharp";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");
const SVG_PATH = join(PUBLIC_DIR, "icon.svg");

async function main() {
  const svg = await readFile(SVG_PATH);

  const sizes = [
    { size: 192, name: "icon-192.png" },
    { size: 512, name: "icon-512.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 32, name: "favicon-32.png" },
    { size: 16, name: "favicon-16.png" },
  ];

  for (const { size, name } of sizes) {
    const buf = await sharp(svg, { density: 384 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    await writeFile(join(PUBLIC_DIR, name), buf);
    console.log(`  generated ${name} (${size}x${size})`);
  }

  // Maskable icon: padded to 512 with the badge centered in the safe zone.
  const icon512 = await sharp(svg, { density: 384 })
    .resize(384, 384, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 64,
      bottom: 64,
      left: 64,
      right: 64,
      background: { r: 15, g: 23, b: 42, alpha: 1 },
    })
    .flatten({ background: "#0f172a" })
    .png()
    .toBuffer();
  await writeFile(join(PUBLIC_DIR, "icon-maskable-512.png"), icon512);
  console.log("  generated icon-maskable-512.png (512x512)");

  await writeFile(join(PUBLIC_DIR, "favicon.ico"), await sharp(svg, { density: 256 }).resize(32, 32).png().toBuffer());
  console.log("  generated favicon.ico");

  console.log("\nAll PWA icons generated successfully.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
