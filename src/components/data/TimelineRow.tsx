import {
  distanceFromKm,
  fmtDateShort,
  isTrailEvent,
  isUltraEvent,
  primaryRace,
} from "@/data/mock-events";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/types";

interface TimelineRowProps {
  event: EventListItem;
  /** 0–100: horizontal position as percentage of total timeline width */
  offsetPct: number;
  /** Vertical position in px from timeline top */
  top?: number;
  className?: string;
}

export function TimelineRow({
  event,
  offsetPct,
  top = 0,
  className,
}: TimelineRowProps) {
  const isTrail = isTrailEvent(event);
  const isUltra = isUltraEvent(event);
  const race = primaryRace(event);

  const markerColor = isUltra
    ? "var(--lime)"
    : isTrail
      ? "var(--warm)"
      : "var(--foreground)";

  return (
    <div
      className={cn("absolute left-0 right-0 h-[22px]", className)}
      style={{ top }}
    >
      {/* row rule */}
      <div
        className="absolute left-0 right-0 top-[10px] h-px opacity-50"
        style={{ background: "var(--border)" }}
      />
      {/* event marker + label */}
      <div
        className="absolute top-0 h-[22px] flex items-center gap-2"
        style={{ left: `${offsetPct}%`, transform: "translateX(-1px)" }}
      >
        <div
          className="w-[3px] h-[22px] shrink-0"
          style={{
            background: markerColor,
            outline: isUltra ? "1px solid var(--foreground)" : "none",
          }}
        />
        <span className="font-display font-black text-[16px] leading-none text-foreground whitespace-nowrap">
          {event.name}
        </span>
        <span className="font-mono text-[9px] tracking-[1px] text-muted-foreground">
          {fmtDateShort(event.date)} · {race.name} · {distanceFromKm(event)}KM
        </span>
      </div>
    </div>
  );
}
