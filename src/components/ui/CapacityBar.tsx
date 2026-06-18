import { Progress } from "radix-ui";
import { capacityPct } from "@/lib/math";
import { cn } from "@/lib/utils";

interface CapacityBarProps {
  taken: number;
  cap: number;
  waitlist?: boolean;
  className?: string;
}

export function CapacityBar({
  taken,
  cap,
  waitlist = false,
  className,
}: CapacityBarProps) {
  const pct = capacityPct(taken, cap);
  const isFull = pct >= 100;

  const color =
    pct >= 90
      ? "var(--destructive)"
      : pct >= 75
        ? "var(--warm)"
        : "var(--primary)";

  const showWaitlist = waitlist && isFull;
  const label = showWaitlist
    ? "WAITLIST"
    : `${taken.toLocaleString()}/${cap.toLocaleString()}`;
  const labelColor = showWaitlist ? "var(--destructive)" : color;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3">
        <Progress.Root
          value={pct}
          className="relative flex-1 h-1 bg-border overflow-hidden"
        >
          <Progress.Indicator
            className="absolute inset-y-0 left-0 h-full transition-all"
            style={{
              width: `${pct}%`,
              background: color,
            }}
          />
        </Progress.Root>
        <span
          className="font-mono text-[10px] tracking-[1.5px] shrink-0"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
