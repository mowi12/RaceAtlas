import { cn } from "@/lib/utils";

interface ElevationStat {
  gain: number;
  loss: number;
  highPoint: number;
  estFinishH: number;
}

interface ElevationProfileProps {
  stats?: ElevationStat;
  className?: string;
}

const DEFAULT_POINTS =
  "0,180 50,110 110,135 170,80 230,95 290,55 350,75 410,50 470,90 530,70 590,100 650,120 710,90 770,130 800,140";

export function ElevationProfile({ stats, className }: ElevationProfileProps) {
  const s = stats ?? {
    gain: 2300,
    loss: 2300,
    highPoint: 1247,
    estFinishH: 14,
  };

  const polyline = DEFAULT_POINTS;
  const polygon = `0,180 ${polyline} 800,180`;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="font-mono text-[10px] tracking-[2px] text-muted-foreground">
        COURSE · ELEVATION PROFILE
      </div>
      <svg
        viewBox="0 0 800 180"
        style={{ width: "100%", height: 180, display: "block" }}
        aria-hidden="true"
      >
        <polygon points={polygon} fill="var(--foreground)" opacity="0.08" />
        <polyline
          points={polyline}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.5"
        />
        {[10, 25, 50, 75, 100].map((k) => (
          <g key={k} transform={`translate(${(k / 100) * 800},0)`}>
            <line
              x1="0"
              x2="0"
              y1="170"
              y2="180"
              stroke="var(--muted-foreground)"
            />
            <text
              x="3"
              y="170"
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="9"
              fill="var(--muted-foreground)"
            >
              {k}K
            </text>
          </g>
        ))}
        <line x1="0" y1="180" x2="800" y2="180" stroke="var(--foreground)" />
      </svg>
      <div className="flex gap-6 font-mono text-[10px] tracking-[1.5px] text-muted-foreground">
        <div>
          <div className="font-display font-black text-[26px] leading-none text-foreground">
            +{s.gain.toLocaleString()}
            <span className="text-[11px]">m</span>
          </div>
          D+
        </div>
        <div>
          <div className="font-display font-black text-[26px] leading-none text-foreground">
            −{s.loss.toLocaleString()}
            <span className="text-[11px]">m</span>
          </div>
          D−
        </div>
        <div>
          <div className="font-display font-black text-[26px] leading-none text-foreground">
            {s.highPoint.toLocaleString()}
            <span className="text-[11px]">m</span>
          </div>
          HIGH POINT
        </div>
        <div>
          <div className="font-display font-black text-[26px] leading-none text-foreground">
            {s.estFinishH}
            <span className="text-[11px]">h</span>
          </div>
          EST. FINISH
        </div>
      </div>
    </div>
  );
}

// Compact sparkline for event rows
interface ElevSparkProps {
  w?: number;
  h?: number;
  peaks?: number;
  seed?: number;
  className?: string;
}

export function ElevationSpark({
  w = 120,
  h = 28,
  peaks = 5,
  seed = 1,
  className,
}: ElevSparkProps) {
  const pts: string[] = [];
  for (let i = 0; i <= peaks * 4; i++) {
    const x = (i / (peaks * 4)) * w;
    const y = h - (Math.sin(i * 0.7 + seed) * 0.5 + 0.5) * (h - 4) - 2;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const polyline = pts.join(" ");
  const polygon = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{ display: "block" }}
      className={className}
      aria-hidden="true"
    >
      <polygon points={polygon} fill="var(--foreground)" opacity="0.12" />
      <polyline
        points={polyline}
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
