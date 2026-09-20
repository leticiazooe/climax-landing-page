import { cp, mkdir, rm, copyFile, stat } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
await copyFile("static/index.html", "dist/index.html");
await copyFile("app/globals.css", "dist/styles.css");

const html = await stat("dist/index.html");
const css = await stat("dist/styles.css");
console.log(`Static CLIMAX build ready: HTML ${html.size} bytes, CSS ${css.size} bytes`);
