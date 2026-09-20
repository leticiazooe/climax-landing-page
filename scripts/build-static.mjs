import { cp, mkdir, rm, stat } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
await cp("static", "dist", { recursive: true });

const html = await stat("dist/index.html");
const css = await stat("dist/styles.css");
console.log(`Static CLIMAX build ready: HTML ${html.size} bytes, CSS ${css.size} bytes`);
