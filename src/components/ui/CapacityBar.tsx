import { Progress } from "radix-ui";
import { capacityPct } from "@/lib/math";
import { cn } from "@/lib/utils";

interface CapacityBarProps {
  taken: number;
  cap: number;
  /**
   * Only meaningful once the race is full: shows WAITLIST instead of FULL.
   * Ignored below capacity (a waitlist exists only after the race fills up).
   */
  waitlist?: boolean;
  className?: string;
}

// Bar fill carries the severity; the label stays on `foreground` so it always
// clears WCAG AA — gold/orange fail 4.5:1 as small text (see PROJECT_GUIDE §2.2).
function fillClass(pct: number): string {
  if (pct >= 90) return "bg-destructive";
  if (pct >= 75) return "bg-warning";
  if (pct >= 50) return "bg-caution";
  return "bg-primary";
}

export function CapacityBar({
  taken,
  cap,
  waitlist = false,
  className,
}: CapacityBarProps) {
  const pct = capacityPct(taken, cap);
  const isFull = taken >= cap;

  const label = isFull
    ? waitlist
      ? "WAITLIST"
      : "FULL"
    : `${taken.toLocaleString()}/${cap.toLocaleString()}`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3">
        <Progress.Root
          value={pct}
          className="relative flex-1 h-1 bg-border overflow-hidden"
        >
          <Progress.Indicator
            className={cn(
              "absolute inset-y-0 left-0 h-full transition-all",
              fillClass(pct),
            )}
            style={{ width: `${pct}%` }}
          />
        </Progress.Root>
        <span className="font-mono text-micro tracking-[1.5px] shrink-0 text-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
