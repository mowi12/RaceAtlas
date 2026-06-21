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
  /**
   * Excluded from the CLI gate: a sub-threshold ratio here is acceptable because
   * the token is used only decoratively (not as text or a control boundary), so
   * WCAG's contrast minimums don't apply. Still computed and shown for honesty.
   */
  exempt?: boolean;
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
    label: "success fill text",
    fg: "success-foreground",
    bg: "success",
    required: 4.5,
  },
  {
    label: "success as text on card",
    fg: "success",
    bg: "card",
    required: 4.5,
  },
  {
    label: "caution fill text",
    fg: "caution-foreground",
    bg: "caution",
    required: 4.5,
  },
  {
    label: "warning fill text",
    fg: "warning-foreground",
    bg: "warning",
    required: 4.5,
  },
  {
    label: "accent fill text",
    fg: "accent-foreground",
    bg: "accent",
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
    label: "input border on background",
    fg: "input",
    bg: "background",
    border: true,
    required: 3,
  },
  {
    label: "input border on card",
    fg: "input",
    bg: "card",
    border: true,
    required: 3,
  },
  {
    label: "border (decorative) on background",
    fg: "border",
    bg: "background",
    border: true,
    required: 3,
    exempt: true,
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
