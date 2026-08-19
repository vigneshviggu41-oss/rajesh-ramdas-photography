import { createHash } from "node:crypto";
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const source = process.env.RAJESH_PHOTO_SOURCE ?? "E:\\personal\\my\\Mobile\\08-12-2021\\DCIM\\MyAlbums\\rajesh anna\\pics";
const destination = path.resolve("public/portfolio");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (supported.has(path.extname(entry.name).toLowerCase())) files.push(fullPath);
  }
  return files;
}

async function checksum(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

function jpegDimensions(buffer) {
  if (buffer.readUInt16BE(0) !== 0xffd8) return { width: null, height: null };
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return { width: null, height: null };
}

const files = await walk(source);
const seen = new Map();
const inventory = [];
for (const filePath of files) {
  const fileStats = await stat(filePath);
  const dimensions = path.extname(filePath).toLowerCase() === ".jpg" || path.extname(filePath).toLowerCase() === ".jpeg" ? jpegDimensions(await readFile(filePath)) : { width: null, height: null };
  const hash = await checksum(filePath);
  const duplicateOf = seen.get(hash) ?? null;
  seen.set(hash, filePath);
  inventory.push({ file: path.basename(filePath), sourcePath: filePath, format: path.extname(filePath).slice(1).toLowerCase(), width: dimensions.width, height: dimensions.height, orientation: dimensions.width && dimensions.height ? (dimensions.width >= dimensions.height ? "landscape" : "portrait") : null, bytes: fileStats.size, sha256: hash, duplicateOf });
}

await mkdir("data", { recursive: true });
await writeFile("data/photo-inventory.json", JSON.stringify(inventory, null, 2) + "\n");
console.log(`Inventoried ${inventory.length} source images. Wrote data/photo-inventory.json.`);

if (process.argv.includes("--copy-selected")) {
  const selected = inventory.filter((item) => !item.duplicateOf);
  await mkdir(destination, { recursive: true });
  for (const item of selected) {
    const safeName = item.file.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    await copyFile(item.sourcePath, path.join(destination, safeName));
  }
  console.log(`Copied ${selected.length} unique images into public/portfolio.`);
} else {
  console.log("Read-only audit complete. Pass --copy-selected only after reviewing the inventory and choosing destinations.");
}
