import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(process.cwd());

const mimeTypes = {
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function assetMime(assetPath) {
  return mimeTypes[extname(assetPath).toLowerCase()] || "application/octet-stream";
}

async function inlineAssets(source) {
  const assetPattern = /"(assets\/[^"]+\.(?:avif|jpe?g|png|webp))"/gi;
  const replacements = new Map();
  const matches = source.matchAll(assetPattern);

  for (const match of matches) {
    const assetPath = match[1];
    if (replacements.has(assetPath)) continue;
    const buffer = await readFile(resolve(root, assetPath));
    replacements.set(assetPath, `data:${assetMime(assetPath)};base64,${buffer.toString("base64")}`);
  }

  let output = source;
  for (const [assetPath, dataUri] of replacements) {
    output = output.replaceAll(`"${assetPath}"`, `"${dataUri}"`);
  }
  return output;
}

const [html, css, script] = await Promise.all([
  readFile(resolve(root, "coloring.html"), "utf8"),
  readFile(resolve(root, "coloring.css"), "utf8"),
  readFile(resolve(root, "src/coloring.js"), "utf8"),
]);

const inlinedScript = await inlineAssets(script);
const standalone = html
  .replace(/<link rel="stylesheet" href="coloring\.css"\s*\/?>/, `<style>\n${css}\n</style>`)
  .replace(/<script src="src\/coloring\.js"><\/script>/, `<script>\n${inlinedScript}\n</script>`);

await writeFile(resolve(root, "coloring-standalone.html"), standalone, "utf8");
console.log("Wrote coloring-standalone.html");
