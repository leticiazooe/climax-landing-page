import { readFile, stat } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");

const rules = [
  [!/<script\b/i.test(html), "Production HTML must not ship application JavaScript"],
  [!html.includes("/_next/"), "Production HTML must not reference _next assets"],
  [!html.includes("data:video/"), "Hero video must be a static asset, not base64"],
  [html.includes('preload="none"'), "Hero video must not block initial loading"],
  [html.includes('loading="lazy"'), "Below-fold product images must be lazy-loaded"],
  [html.includes('fetchpriority="low"'), "Product media must use low fetch priority"],
  [css.includes("content-visibility: auto"), "Below-fold sections must defer rendering"],
];

for (const [ok, message] of rules) {
  if (!ok) throw new Error(message);
}

const htmlSize = (await stat("dist/index.html")).size;
const cssSize = (await stat("dist/styles.css")).size;
if (htmlSize > 60000) throw new Error(`HTML too large: ${htmlSize} bytes`);
if (cssSize > 50000) throw new Error(`CSS too large: ${cssSize} bytes`);

console.log(`Static checks passed — HTML ${htmlSize} B, CSS ${cssSize} B, application JS 0 B`);
