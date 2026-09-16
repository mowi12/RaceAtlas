import { Badge } from "@/components/ui/Badge";
import {
  daysUntil,
  distanceFromKm,
  fmtDateShort,
  isTrailEvent,
  isUltraEvent,
} from "@/data/mock-events";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/types";

interface EventRowProps {
  event: EventListItem;
  showKm?: boolean;
  className?: string;
}

export function EventRow({ event, showKm = true, className }: EventRowProps) {
  const days = daysUntil(event.date);
  const isTrail = isTrailEvent(event);
  const isUltra = isUltraEvent(event);

  const markerColor = isUltra
    ? "var(--lime)"
    : isTrail
      ? "var(--warm)"
      : "var(--foreground)";

  return (
    <div
      className={cn(
        "flex items-baseline gap-3.5 py-3 border-t border-border first:border-t-0",
        className,
      )}
    >
      {/* event type marker */}
      <div
        className="shrink-0 w-[3px] h-[22px] self-center"
        style={{
          background: markerColor,
          outline: isUltra ? "1px solid var(--foreground)" : "none",
        }}
      />
      {/* countdown */}
      <div className="w-14 shrink-0">
        <span className="font-display font-black text-[26px] leading-none text-foreground">
          {String(days).padStart(3, "0")}
        </span>
        <span className="font-display text-[12px] text-muted-foreground">
          D
        </span>
      </div>
      {/* event details */}
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-foreground leading-tight truncate">
          {event.name}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground tracking-[1px] mt-0.5 flex items-center gap-1.5">
          <span>
            {fmtDateShort(event.date)} · {event.location.displayName}
          </span>
          {event.races.map((r) => (
            <Badge key={r.id} variant="distance" value={r.distanceMeters} />
          ))}
        </div>
      </div>
      {/* km from reference */}
      {showKm && (
        <div className="shrink-0 text-right">
          <span className="font-serif italic text-[16px] text-ink-soft">
            {distanceFromKm(event)}
          </span>
          <span className="font-mono text-[9px] ml-1 text-muted-foreground">
            km
          </span>
        </div>
      )}
    </div>
  );
}
