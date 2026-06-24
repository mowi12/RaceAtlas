interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * The RaceAtlas logo mark: a ringed contour glyph. Strokes use `currentColor`, so set the
 * color via the parent's text color (defaults to foreground in the top bar).
 *
 * TODO: Not final!
 */
export function BrandMark({ size = 28, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={className}
      style={{ color: "var(--foreground)" }}
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 14 Q8 9, 14 14 T25 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3 17 Q9 14, 14 17 T25 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
    </svg>
  );
}
