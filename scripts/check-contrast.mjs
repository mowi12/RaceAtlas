// Computes WCAG contrast ratios for token pairs defined in src/app/globals.css.
//
// Run: npm run check:contrast (or: node scripts/check-contrast.mjs)
//
// How it works: reads :root { ... } from globals.css, parses every "--name: value"
// declaration, and resolves var(--x) references recursively (see resolve() below) so
// this always reflects whatever's currently in globals.css — no hardcoded color list
// to drift out of sync. Contrast is computed with the standard WCAG relative-luminance
// formula (same math as webaim.org's contrast checker). Each pair is checked against
// 4.5:1 (body text) or 3:1 (large text / UI components like ring, border), printed as
// pass/fail, and the process exits non-zero if anything fails — usable as a CI gate later.
//
// To check a new pair, add an entry to the `pairs` array below:
// [label, foregroundTokenName, backgroundTokenName, requiredRatio]
//
// Known failures as of the last run: muted-foreground (on background and card) and
// border (on background). Decided to leave as-is for now — revisit if these are used
// somewhere the failure actually matters (e.g. muted-foreground as real body text, or
// border as a meaningful focus/UI boundary rather than a decorative divider).
import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);

// Pull out the :root { ... } block and parse "--name: value;" declarations.
// Values are either literal hex (#fff) or var(--other) references, which we resolve recursively below.
const rootBlock = css.match(/:root\s*{([^}]*)}/s)?.[1] ?? "";
const raw = new Map();
for (const line of rootBlock.split(";")) {
  const match = line.match(/--([\w-]+)\s*:\s*(.+)/s);
  if (match) raw.set(match[1], match[2].trim());
}

function resolve(name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`circular var reference: ${name}`);
  seen.add(name);
  const value = raw.get(name);
  if (!value) throw new Error(`unknown token: --${name}`);
  const varRef = value.match(/^var\(--([\w-]+)\)$/);
  return varRef ? resolve(varRef[1], seen) : value;
}

function hexToRgb(hex) {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// WCAG relative luminance: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA, hexB) {
  const lA = luminance(hexToRgb(hexA));
  const lB = luminance(hexToRgb(hexB));
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

// [label, foreground token, background token, required ratio]
const pairs = [
  ["body text", "foreground", "background", 4.5],
  ["muted text on bg", "muted-foreground", "background", 4.5],
  ["muted text on card", "muted-foreground", "card", 4.5],
  ["card text", "card-foreground", "card", 4.5],
  ["primary button text", "primary-foreground", "primary", 4.5],
  ["secondary button text", "secondary-foreground", "secondary", 4.5],
  ["destructive button text", "destructive-foreground", "destructive", 4.5],
  ["ring on background", "ring", "background", 3],
  ["ring on card", "ring", "card", 3],
  ["border on background", "border", "background", 3],
];

let allPass = true;
for (const [label, fg, bg, required] of pairs) {
  const fgHex = resolve(fg);
  const bgHex = resolve(bg);
  const ratio = contrastRatio(fgHex, bgHex);
  const pass = ratio >= required;
  allPass &&= pass;
  console.log(
    `${pass ? "✅" : "❌"} ${label.padEnd(26)} ${fg} (${fgHex}) on ${bg} (${bgHex}) — ${ratio.toFixed(2)}:1 (need ${required}:1)`,
  );
}

process.exit(allPass ? 0 : 1);
