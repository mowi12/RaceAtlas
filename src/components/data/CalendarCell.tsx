import { daysUntil, isTrailEvent } from "@/data/mock-events";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/types";

interface CalendarCellProps {
  day: number;
  inMonth?: boolean;
  event?: EventListItem | null;
  className?: string;
}

export function CalendarCell({
  day,
  inMonth = true,
  event = null,
  className,
}: CalendarCellProps) {
  const days = event ? daysUntil(event.date) : null;
  const isTrail = event ? isTrailEvent(event) : false;

  return (
    <div
      className={cn(
        "p-3 border-b border-border relative overflow-hidden",
        inMonth ? "bg-background" : "bg-card opacity-50",
        className,
      )}
    >
      <div className="flex justify-between items-baseline">
        <span
          className={cn(
            "font-display font-black text-[22px] leading-none",
            event ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {day}
        </span>
        {days !== null && (
          <span className="font-mono text-[9px] tracking-[1px] text-muted-foreground">
            {days}D
          </span>
        )}
      </div>
      {event && (
        <div className="mt-2">
          <div
            className="inline-block px-2 py-1.5 font-display font-black text-[15px] leading-none text-primary-foreground max-w-full"
            style={{
              background: isTrail ? "var(--warm)" : "var(--primary)",
            }}
          >
            {event.name}
          </div>
          <div className="mt-1.5 font-mono text-[9px] tracking-[1px] text-muted-foreground">
            {event.location.displayName.toUpperCase()} ·{" "}
            {event.races.map((r) => r.name).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}
