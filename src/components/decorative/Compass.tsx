import { cn } from "@/lib/utils";

interface CompassProps {
  /**
   * Fixed px size. Omit it and size via `className` (e.g. `size-10 md:size-16`)
   * for responsive sizing — CSS width/height overrides the SVG's intrinsic box.
   */
  size?: number;
  className?: string;
}

const C = 50;

// Angle measured clockwise from North (up), in degrees.
function pt(angle: number, r: number): [number, number] {
  const a = ((angle - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}
const f = (n: number) => n.toFixed(2);

// A star ray split down its center axis into a dark half and a light (outline)
// half — the classic two-tone compass spike.
function ray(angle: number, rTip: number, w: number) {
  const [tx, ty] = pt(angle, rTip);
  const [rx, ry] = pt(angle + 90, w);
  const [lx, ly] = pt(angle - 90, w);
  return {
    angle,
    dark: `M ${f(tx)} ${f(ty)} L ${f(rx)} ${f(ry)} L ${C} ${C} Z`,
    light: `M ${f(tx)} ${f(ty)} L ${f(lx)} ${f(ly)} L ${C} ${C} Z`,
  };
}

const cardinals = [0, 90, 180, 270].map((a) => ray(a, 33, 4.2));
const diagonals = [45, 135, 225, 315].map((a) => ray(a, 22, 3));

const ticks = Array.from({ length: 48 }, (_, i) => {
  const a = i * 7.5;
  const major = i % 6 === 0;
  const [x1, y1] = pt(a, 38);
  const [x2, y2] = pt(a, major ? 34 : 35.6);
  return { a, major, d: `M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)}` };
});

const letters = [
  { c: "N", p: pt(0, 45) },
  { c: "E", p: pt(90, 45) },
  { c: "S", p: pt(180, 45) },
  { c: "W", p: pt(270, 45) },
];

export function Compass({ size, className }: CompassProps) {
  const ink = "var(--foreground)";
  const paper = "var(--background)";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      // Fallback box only when neither `size` nor a sizing class is supplied;
      // a caller's width/height utility wins via tailwind-merge.
      className={cn(size == null && "size-20", className)}
      aria-hidden="true"
    >
      {/* concentric detail rings */}
      <circle cx={C} cy={C} r={38} fill="none" stroke={ink} strokeWidth={1} />
      <circle cx={C} cy={C} r={34} fill="none" stroke={ink} strokeWidth={0.5} />
      <circle cx={C} cy={C} r={30} fill="none" stroke={ink} strokeWidth={0.5} />
      <circle cx={C} cy={C} r={20} fill="none" stroke={ink} strokeWidth={0.5} />
      <circle
        cx={C}
        cy={C}
        r={17}
        fill="none"
        stroke={ink}
        strokeWidth={0.4}
        strokeDasharray="1.5 2.5"
      />

      {/* tick ring */}
      {ticks.map((t) => (
        <path
          key={`tick-${t.a}`}
          d={t.d}
          stroke={ink}
          strokeWidth={t.major ? 1 : 0.4}
        />
      ))}

      {/* 8-point star: diagonals under cardinals */}
      {diagonals.map((r) => (
        <g key={`diag-${r.angle}`}>
          <path d={r.light} fill="none" stroke={ink} strokeWidth={0.4} />
          <path d={r.dark} fill={ink} />
        </g>
      ))}
      {cardinals.map((r) => (
        <g key={`card-${r.angle}`}>
          <path d={r.light} fill="none" stroke={ink} strokeWidth={0.5} />
          <path d={r.dark} fill={ink} />
        </g>
      ))}

      {/* center hub */}
      <circle cx={C} cy={C} r={6} fill={paper} stroke={ink} strokeWidth={0.8} />
      <circle cx={C} cy={C} r={3.8} fill={ink} />
      <circle cx={C} cy={C} r={1.5} fill={paper} />

      {/* cardinal letters */}
      {letters.map((l) => (
        <text
          key={l.c}
          x={f(l.p[0])}
          y={f(l.p[1])}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={7}
          fontWeight={700}
          fontFamily="var(--font-jetbrains), monospace"
          fill={ink}
        >
          {l.c}
        </text>
      ))}
    </svg>
  );
}
