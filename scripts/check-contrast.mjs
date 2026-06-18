// Computes WCAG contrast ratios for token pairs defined in src/app/globals.css.
//
// Run: pnpm check:contrast (or: node scripts/check-contrast.mjs)
//
// Shared logic lives in src/lib/contrast.ts (also used by the ContrastCheck
// design system section), so the token list and math can't drift between the
// CLI gate and the visual preview.
//
// Known failure: border (#cfc8b6) on background, 1.43:1 vs the 3:1 UI threshold.
// Left as-is — border is used as a decorative divider/track-fill (CapacityBar,
// RadiusControl, table rows), not a meaningful focus/UI boundary, so WCAG 1.4.11's
// non-text-contrast rule doesn't actually apply here. Revisit if border is ever used
// as a real control boundary (e.g. input outline) where the failure would matter.
import { computeContrastResults } from "../src/lib/contrast.ts";

const results = computeContrastResults();
let allPass = true;
for (const { label, fg, fgHex, bg, bgHex, ratio, required, pass } of results) {
  allPass &&= pass;
  console.log(
    `${pass ? "✅" : "❌"} ${label.padEnd(26)} ${fg} (${fgHex}) on ${bg} (${bgHex}) — ${ratio.toFixed(2)}:1 (need ${required}:1)`,
  );
}

process.exit(allPass ? 0 : 1);
