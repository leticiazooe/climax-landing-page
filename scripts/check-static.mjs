import { readFile, stat } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
const heroTag = html.match(/<video[^>]*id="hero-video"[^>]*>/i)?.[0] || "";

const rules = [
  [scripts.length <= 1, "Only the tiny video scheduler script is allowed"],
  [!/<script[^>]+src=/i.test(html), "No external application JavaScript is allowed"],
  [scripts.every((m) => m[1].length < 2600), "Inline performance script exceeded 2.6 KB"],
  [!html.includes("/_next/"), "Production HTML must not reference _next assets"],
  [!html.includes("__NEXT_DATA__"), "Next/Vinext runtime must not reach production HTML"],
  [!html.includes("data:video/"), "Hero video must not be base64"],
  [heroTag.includes("data-src="), "Hero video URL must be deferred via data-src"],
  [!/(?:^|\s)src="/i.test(heroTag), "Hero video must not have src during initial HTML parse"],
  [heroTag.includes('preload="none"'), "Hero video must not block initial loading"],
  [html.includes('loading="lazy"'), "Below-fold product images must be lazy-loaded"],
  [html.includes('fetchpriority="low"'), "Product media must use low fetch priority"],
  [css.includes("content-visibility: auto"), "Below-fold sections must defer rendering"],
  [css.includes("contain-intrinsic-size: auto"), "Deferred sections must preserve stable layout"],
  [css.includes(".hero-video.is-ready"), "Hero video must fade in only when ready"],
];

for (const [ok, message] of rules) {
  if (!ok) throw new Error(message);
}

const htmlSize = (await stat("dist/index.html")).size;
const cssSize = (await stat("dist/styles.css")).size;
const inlineJsSize = scripts.reduce((sum, m) => sum + Buffer.byteLength(m[1]), 0);

if (htmlSize > 24000) throw new Error(`HTML too large: ${htmlSize} bytes`);
if (cssSize > 24000) throw new Error(`CSS too large: ${cssSize} bytes`);
if (inlineJsSize > 2600) throw new Error(`Inline JS too large: ${inlineJsSize} bytes`);

console.log(`Performance checks passed — HTML ${htmlSize} B, CSS ${cssSize} B, inline JS ${inlineJsSize} B`);
