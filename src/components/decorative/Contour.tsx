type ContourDensity = "light" | "medium" | "dense";
type ContourColor = "black" | "yellow" | "orange" | "red";

interface ContourProps {
  w?: number;
  h?: number;
  density?: ContourDensity;
  /** Overrides the line count derived from `density` when set. */
  lines?: number;
  color?: ContourColor;
  seed?: number;
  opacity?: number;
  fade?: boolean;
  /**
   * Fraction of the box (measured from the top-right corner) over which the
   * strokes dissolve: the corner is fully gone, everything past this is solid.
   * 0.5 = the inner half nearest the corner fades; higher = a larger fade.
   */
  fadeStart?: number;
  className?: string;
}

const DENSITY_LINES: Record<ContourDensity, number> = {
  light: 6,
  medium: 10,
  dense: 20,
};

const COLOR_TOKENS: Record<ContourColor, string> = {
  black: "var(--foreground)",
  yellow: "var(--gold)",
  orange: "var(--warm)",
  red: "var(--destructive)",
};

function pseudoRand(i: number, j: number, seed: number): number {
  return Math.sin(i * 13.37 + j * 7.91 + seed) * 0.5 + 0.5;
}

export function Contour({
  w = 800,
  h = 400,
  density = "medium",
  lines: linesProp,
  color = "black",
  seed = 1,
  opacity = 0.18,
  fade = false,
  fadeStart = 0.5,
  className,
}: ContourProps) {
  const lines = linesProp ?? DENSITY_LINES[density];
  const stroke = COLOR_TOKENS[color];
  const paths: { d: string; key: number }[] = [];
  for (let i = 0; i < lines; i++) {
    const y0 = (h / lines) * i + 8;
    const startOff = (pseudoRand(i, 0, seed) - 0.5) * 60;
    let d = `M 0 ${(y0 + startOff).toFixed(1)}`;
    for (let x = w / 8; x <= w; x += w / 8) {
      const off = (pseudoRand(i, x, seed) - 0.5) * 60;
      d += ` L ${x.toFixed(1)} ${(y0 + off).toFixed(1)}`;
    }
    paths.push({ d, key: i });
  }

  // SSR-stable, instance-unique id (the fade mask is identical for every
  // instance, so even a collision would render correctly — this just keeps the
  // DOM ids valid). No hooks, so Contour stays usable in server components.
  const maskId = `contour-fade-${seed}-${density}-${w}x${h}-${fadeStart}`;
  const faded = fade && fadeStart > 0;
  // Diagonal dissolve, bottom-left (solid) → top-right (barely visible). The
  // fade spans the last `fadeStart` of the diagonal: 1 = whole diagonal,
  // 0.5 = from the middle, 0 = off.
  const fadeBegin = Math.max(0, 1 - fadeStart);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {faded && (
        <defs>
          {/* objectBoundingBox anchors the stops to the corners (bottom-left →
              top-right) regardless of the non-uniform preserveAspectRatio stretch. */}
          <linearGradient
            id={`${maskId}-grad`}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="1"
            x2="1"
            y2="0"
          >
            <stop offset={fadeBegin} stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0.06" />
          </linearGradient>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            <rect
              x="0"
              y="0"
              width="1"
              height="1"
              fill={`url(#${maskId}-grad)`}
            />
          </mask>
        </defs>
      )}
      <g mask={faded ? `url(#${maskId})` : undefined}>
        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill="none"
            stroke={stroke}
            strokeWidth="0.9"
            opacity={opacity}
          />
        ))}
      </g>
    </svg>
  );
}
