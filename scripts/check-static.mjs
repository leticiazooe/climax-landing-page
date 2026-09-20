import { readFile, stat } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");
const motion = await readFile("dist/motion.js", "utf8");

const heroTag = html.match(/<video[^>]*id="hero-video"[^>]*>/i)?.[0] || "";
const externalScripts = [...html.matchAll(/<script[^>]+src="([^"]+)"[^>]*><\/script>/gi)].map((m) => m[1]);
const inlineScripts = [...html.matchAll(/<script(?![^>]+src=)[^>]*>([\s\S]*?)<\/script>/gi)];

const rules = [
  [externalScripts.length === 1 && externalScripts[0] === "/motion.js", "Only /motion.js is allowed in production"],
  [inlineScripts.length === 0, "Inline application JavaScript is not allowed"],
  [!html.includes("/_next/"), "Production HTML must not reference _next assets"],
  [!html.includes("__NEXT_DATA__"), "Next/Vinext runtime must not reach production HTML"],
  [!html.includes("react-dom"), "React runtime must not reach production HTML"],
  [!html.includes("data:video/"), "Hero video must not be base64"],
  [heroTag.includes('src="/climax-hero.mp4"'), "Hero video must use the same-origin static asset"],
  [heroTag.includes("autoplay"), "Hero video must autoplay"],
  [heroTag.includes("muted"), "Hero video must be muted for reliable autoplay"],
  [heroTag.includes("playsinline"), "Hero video must play inline on mobile"],
  [heroTag.includes('preload="auto"'), "Hero video must preload immediately"],
  [html.includes('loading="lazy"'), "Below-fold product images must be lazy-loaded"],
  [html.includes('fetchpriority="low"'), "Product media must use low fetch priority"],
  [css.includes("--motion-fast:"), "Motion token system is missing"],
  [css.includes("--ease-cinematic:"), "Motion easing system is missing"],
  [css.includes("prefers-reduced-motion"), "Reduced-motion behavior is missing"],
  [css.includes("content-visibility: auto"), "Below-fold sections must defer rendering"],
  [css.includes("contain-intrinsic-size: auto"), "Deferred sections must preserve stable layout"],
  [motion.includes("IntersectionObserver"), "Viewport motion must use IntersectionObserver"],
  [!motion.includes("requestAnimationFrame"), "Continuous requestAnimationFrame loops are not allowed"],
];

for (const [ok, message] of rules) {
  if (!ok) throw new Error(message);
}

const htmlSize = (await stat("dist/index.html")).size;
const cssSize = (await stat("dist/styles.css")).size;
const motionSize = (await stat("dist/motion.js")).size;
const heroVideoSize = (await stat("dist/climax-hero.mp4")).size;

if (htmlSize > 22000) throw new Error(`HTML too large: ${htmlSize} bytes`);
if (cssSize > 26000) throw new Error(`CSS too large: ${cssSize} bytes`);
if (motionSize > 4000) throw new Error(`Motion controller too large: ${motionSize} bytes`);
if (heroVideoSize < 500000) throw new Error(`Hero video is unexpectedly small or invalid: ${heroVideoSize} bytes`);

console.log(
  `Performance checks passed — HTML ${htmlSize} B, CSS ${cssSize} B, motion JS ${motionSize} B, hero video ${heroVideoSize} B`
);
