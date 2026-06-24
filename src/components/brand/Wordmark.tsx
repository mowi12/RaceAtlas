interface WordmarkProps {
  size?: number;
  /** Caption shown beneath the title. Pass `null` (or `""`) to omit it entirely — the SVG's
   * bounding box shrinks to fit, so the title stays vertically centered in its box. */
  subtitle?: string | null;
  /**
   * Subtitle font size, in the SVG's own coordinate units — independent of `size`, so the
   * subtitle can be scaled relative to the title (e.g. tighter chrome like the TopBar, where
   * the title:subtitle ratio is much smaller than in the full /design wordmark).
   */
  subtitleSize?: number;
  /** Draws the contour underline between the title and the subtitle. */
  underline?: boolean;
  className?: string;
}

// Inner (pre-outer-translate) bottom edge of each element, used to size the viewBox so the
// box always wraps just what's actually drawn — no dead space when subtitle/underline are off.
const TITLE_BOTTOM = 120;
const UNDERLINE_BOTTOM = 150;
const OUTER_TRANSLATE = 20;
const BOTTOM_PADDING = 10;

const TITLE_WIDTH = 720;
const SUBTITLE_X = 2;
// JetBrains Mono is monospace, so each glyph's advance is a near-constant fraction of its
// font size — good enough to size the box without measuring actual rendered text.
const MONO_CHAR_WIDTH = 0.6;
const RIGHT_PADDING = 12;

export function Wordmark({
  size = 1,
  subtitle = "AN INDEX OF ROAD & TRAIL — EST. MMXXVI",
  subtitleSize = 15,
  underline = true,
  className,
}: WordmarkProps) {
  const hasSubtitle = Boolean(subtitle);
  // With the underline, the subtitle sits in the gap the contour art fills (y=170). Without
  // it, pull the subtitle up to clear the title's baseline (y=120) instead of leaving a gap.
  const subtitleY = underline ? 170 : 130 + subtitleSize * 0.8 + 8;
  const subtitleLetterSpacing = subtitleSize * (4 / 11);

  let innerBottom = underline ? UNDERLINE_BOTTOM : TITLE_BOTTOM;
  if (hasSubtitle) innerBottom = Math.max(innerBottom, subtitleY);
  const viewBoxHeight = innerBottom + OUTER_TRANSLATE + BOTTOM_PADDING;

  // The title is a fixed 720 wide, but a long/large subtitle can outrun that — widen the box
  // instead of letting the SVG clip it.
  let viewBoxWidth = TITLE_WIDTH;
  if (subtitle) {
    const charAdvance = subtitleSize * MONO_CHAR_WIDTH + subtitleLetterSpacing;
    viewBoxWidth = Math.max(
      viewBoxWidth,
      SUBTITLE_X + subtitle.length * charAdvance + RIGHT_PADDING,
    );
  }

  const w = viewBoxWidth * size;
  const h = viewBoxHeight * size;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      style={{
        width: w,
        height: h,
        display: "block",
        color: "var(--foreground)",
      }}
      className={className}
      aria-label="RaceAtlas"
    >
      <g transform="translate(0,20)">
        <text
          x="0"
          y="120"
          fontFamily="var(--font-fraunces), 'Times New Roman', serif"
          fontStyle="italic"
          fontSize="140"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="-3"
        >
          Race
        </text>
        <text
          x="300"
          y="120"
          fontFamily="var(--font-archivo), 'Arial Narrow', sans-serif"
          fontSize="140"
          fontWeight="900"
          fill="currentColor"
          letterSpacing="-4"
        >
          ATLAS
        </text>
        {underline && (
          <g transform="translate(-30,140)">
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M ${20 + i * 6} 0 C 120 ${-8 - i * 3}, 320 ${10 - i * 4}, 540 ${-4 - i * 3} S 700 ${4 - i * 2}, 720 ${-2 - i * 3}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                opacity={0.18 + i * 0.18}
              />
            ))}
          </g>
        )}
        {hasSubtitle && (
          <text
            x="2"
            y={subtitleY}
            fontFamily="var(--font-jetbrains), monospace"
            fontSize={subtitleSize}
            letterSpacing={subtitleLetterSpacing}
            fill="currentColor"
            opacity="0.65"
          >
            {subtitle}
          </text>
        )}
      </g>
    </svg>
  );
}
