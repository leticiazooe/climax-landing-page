import { readFile, stat } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
const heroTag = html.match(/<video[^>]*id="hero-video"[^>]*>/i)?.[0] || "";

const rules = [
  [scripts.length === 0, "Production landing must not ship application JavaScript"],
  [!/<script[^>]+src=/i.test(html), "No external application JavaScript is allowed"],
  [!html.includes("/_next/"), "Production HTML must not reference _next assets"],
  [!html.includes("__NEXT_DATA__"), "Next/Vinext runtime must not reach production HTML"],
  [!html.includes("data:video/"), "Hero video must not be base64"],
  [heroTag.includes('src="/climax-hero.mp4"'), "Hero video must use the same-origin static asset"],
  [heroTag.includes("autoplay"), "Hero video must autoplay"],
  [heroTag.includes("muted"), "Hero video must be muted for reliable autoplay"],
  [heroTag.includes("playsinline"), "Hero video must play inline on mobile"],
  [heroTag.includes('preload="auto"'), "Hero video must preload immediately"],
  [html.includes('rel="preload" href="/climax-hero.mp4"'), "Hero video must be preloaded from the page head"],
  [html.includes('loading="lazy"'), "Below-fold product images must be lazy-loaded"],
  [html.includes('fetchpriority="low"'), "Product media must use low fetch priority"],
  [css.includes("content-visibility: auto"), "Below-fold sections must defer rendering"],
  [css.includes("contain-intrinsic-size: auto"), "Deferred sections must preserve stable layout"],
];

for (const [ok, message] of rules) {
  if (!ok) throw new Error(message);
}

const htmlSize = (await stat("dist/index.html")).size;
const cssSize = (await stat("dist/styles.css")).size;
const heroVideoSize = (await stat("dist/climax-hero.mp4")).size;

if (htmlSize > 22000) throw new Error(`HTML too large: ${htmlSize} bytes`);
if (cssSize > 24000) throw new Error(`CSS too large: ${cssSize} bytes`);
if (heroVideoSize < 500000) throw new Error(`Hero video is unexpectedly small or invalid: ${heroVideoSize} bytes`);

console.log(`Performance checks passed — HTML ${htmlSize} B, CSS ${cssSize} B, hero video ${heroVideoSize} B, application JS 0 B`);
