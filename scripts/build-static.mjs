import { cp, copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

await cp("public", "dist", { recursive: true });
await cp("static", "dist", { recursive: true });

// Keep source CSS readable, but publish a compact production file.
const cssPath = "dist/styles.css";
const cssSource = await readFile(cssPath, "utf8");
const cssMinified = cssSource
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();
await writeFile(cssPath, cssMinified + "\n", "utf8");

// The canonical hero video lives in video-parts/svg/.
// Copy it last so it always wins over any stale public asset.
await copyFile("video-parts/svg/climax-hero.mp4", "dist/climax-hero.mp4");

const html = await stat("dist/index.html");
const css = await stat("dist/styles.css");
const video = await stat("dist/climax-hero.mp4");

console.log(
  `Static CLIMAX build ready: HTML ${html.size} bytes, CSS ${css.size} bytes, hero video ${video.size} bytes`
);
