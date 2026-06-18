// Shared WCAG contrast logic for src/app/globals.css tokens.
// Used by scripts/check-contrast.mjs (CLI gate) and the design system's
// ContrastCheck section (visual preview), so both stay in sync with whatever
// is currently in globals.css — no hardcoded color list to drift out of sync.
import { readFileSync } from "node:fs";
import path from "node:path";

export type ContrastPair = {
  label: string;
  fg: string;
  bg: string;
  border?: boolean;
  ring?: boolean;
  required: number;
};

export type ContrastResult = ContrastPair & {
  fgHex: string;
  bgHex: string;
  ratio: number;
  pass: boolean;
};

// [label, foreground token, background token, required ratio, flags]
export const contrastPairs: ContrastPair[] = [
  { label: "body text", fg: "foreground", bg: "background", required: 4.5 },
  {
    label: "muted-foreground on background",
    fg: "muted-foreground",
    bg: "background",
    required: 4.5,
  },
  {
    label: "muted-foreground on card",
    fg: "muted-foreground",
    bg: "card",
    required: 4.5,
  },
  { label: "card text", fg: "card-foreground", bg: "card", required: 4.5 },
  {
    label: "primary button text",
    fg: "primary-foreground",
    bg: "primary",
    required: 4.5,
  },
  {
    label: "secondary button text",
    fg: "secondary-foreground",
    bg: "secondary",
    required: 4.5,
  },
  {
    label: "destructive button text",
    fg: "destructive-foreground",
    bg: "destructive",
    required: 4.5,
  },
  {
    label: "ring on background",
    fg: "ring",
    bg: "background",
    ring: true,
    required: 3,
  },
  { label: "ring on card", fg: "ring", bg: "card", ring: true, required: 3 },
  {
    label: "border on background",
    fg: "border",
    bg: "background",
    border: true,
    required: 3,
  },
];

export function loadTokens(): Map<string, string> {
  const css = readFileSync(
    path.join(process.cwd(), "src/app/globals.css"),
    "utf8",
  );
  const rootBlock = css.match(/:root\s*{([^}]*)}/)?.[1] ?? "";
  const raw = new Map<string, string>();
  for (const line of rootBlock.split(";")) {
    const match = line.match(/--([\w-]+)\s*:\s*([\s\S]+)/);
    const name = match?.[1];
    const value = match?.[2];
    if (name && value) raw.set(name, value.trim());
  }
  return raw;
}

export function resolveToken(
  raw: Map<string, string>,
  name: string,
  seen: Set<string> = new Set(),
): string {
  if (seen.has(name)) throw new Error(`circular var reference: ${name}`);
  seen.add(name);
  const value = raw.get(name);
  if (!value) throw new Error(`unknown token: --${name}`);
  const varRef = value.match(/^var\(--([\w-]+)\)$/);
  const refName = varRef?.[1];
  return refName ? resolveToken(raw, refName, seen) : value;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// WCAG relative luminance: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
function luminance([r, g, b]: [number, number, number]): number {
  const [R, G, B] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lA = luminance(hexToRgb(hexA));
  const lB = luminance(hexToRgb(hexB));
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

export function computeContrastResults(): ContrastResult[] {
  const raw = loadTokens();
  return contrastPairs.map((pair) => {
    const fgHex = resolveToken(raw, pair.fg);
    const bgHex = resolveToken(raw, pair.bg);
    const ratio = contrastRatio(fgHex, bgHex);
    return { ...pair, fgHex, bgHex, ratio, pass: ratio >= pair.required };
  });
}
