// Computes WCAG contrast ratios for token pairs defined in src/app/globals.css.
//
// Run: pnpm check:contrast (or: node scripts/check-contrast.mjs)
//
// Shared logic lives in src/lib/contrast.ts (also used by the ContrastCheck
// design system section), so the token list and math can't drift between the
// CLI gate and the visual preview.
//
// The decorative `border` (#cfc8b6) is 1.43:1 on background — below the 3:1 UI
// threshold, but it's only used for dividers/track-fills (CapacityBar, RadiusControl,
// table rows), never as text or a control boundary, so WCAG 1.4.11 doesn't apply. It
// is marked `exempt` in contrast.ts so it's shown (⚠️) but doesn't fail the gate.
// Real control boundaries (form inputs/select) use the darker `input` token, which is
// gated at 3:1 and must pass.
import { computeContrastResults } from "../src/lib/contrast.ts";

const results = computeContrastResults();
let allPass = true;
for (const {
  label,
  fg,
  fgHex,
  bg,
  bgHex,
  ratio,
  required,
  pass,
  exempt,
} of results) {
  allPass &&= pass || Boolean(exempt);
  const mark = pass ? "✅" : exempt ? "⚠️ " : "❌";
  const suffix = !pass && exempt ? " (exempt — decorative use only)" : "";
  console.log(
    `${mark} ${label.padEnd(34)} ${fg} (${fgHex}) on ${bg} (${bgHex}) — ${ratio.toFixed(2)}:1 (need ${required}:1)${suffix}`,
  );
}

process.exit(allPass ? 0 : 1);
