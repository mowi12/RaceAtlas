import { Badge } from "@/components/ui/Badge";
import { CapacityBar } from "@/components/ui/CapacityBar";
import {
  daysUntil,
  eventSurface,
  fmtDate,
  primaryRace,
} from "@/data/mock-events";
import { toBadgeDifficulty, toBadgeSurface } from "@/lib/badge";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/types";

interface EventCardProps {
  event: EventListItem;
  variant?: "featured" | "compact";
  className?: string;
}

export function EventCard({
  event,
  variant = "featured",
  className,
}: EventCardProps) {
  const days = daysUntil(event.date);
  const race = primaryRace(event);
  const surface = toBadgeSurface(eventSurface(event));

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "p-4 bg-card border border-border flex flex-col gap-2",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[2px] text-muted-foreground">
            {String(days).padStart(3, "0")} DAYS OUT
          </div>
          <Badge variant="surface" value={surface} />
        </div>
        <div className="font-display font-black text-[32px] leading-none text-foreground">
          {event.name}
        </div>
        <div className="font-mono text-[10px] tracking-[1px] text-muted-foreground flex items-center gap-4">
          <span>{fmtDate(event.date)}</span>
          <span className="flex gap-1.5">
            {event.races.map((r) => (
              <Badge key={r.id} variant="distance" value={r.distanceMeters} />
            ))}
          </span>
          {race.difficulty && (
            <Badge
              variant="difficulty"
              value={toBadgeDifficulty(race.difficulty)}
            />
          )}
          {race.elevationGainMeters !== undefined && (
            <span>+{race.elevationGainMeters} M</span>
          )}
        </div>
        {race.capacity && (
          <CapacityBar
            taken={race.capacity.taken}
            cap={race.capacity.cap}
            waitlist={race.capacity.waitlist}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-7 bg-card border-b border-foreground flex flex-col gap-4 relative",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] tracking-[2px] text-muted-foreground mb-2.5">
            FEATURED · {String(days).padStart(3, "0")} DAYS OUT
          </div>
          <div className="font-display font-black text-[56px] leading-none text-foreground">
            {event.location.displayName}
            <br />
            {event.name.replace(event.location.displayName, "").trim()}
          </div>
        </div>
        <Badge variant="surface" value={surface} />
      </div>
      <div className="font-serif italic text-[16px] text-ink-soft">
        &ldquo;The flattest, fastest course in the majors.&rdquo;
      </div>
      <div className="font-mono text-[10px] tracking-[1px] text-muted-foreground flex items-center gap-4">
        <span>{fmtDate(event.date)}</span>
        <span className="flex gap-1.5">
          {event.races.map((r) => (
            <Badge key={r.id} variant="distance" value={r.distanceMeters} />
          ))}
        </span>
        {race.difficulty && (
          <Badge
            variant="difficulty"
            value={toBadgeDifficulty(race.difficulty)}
          />
        )}
        {race.elevationGainMeters !== undefined && (
          <span>+{race.elevationGainMeters} M</span>
        )}
      </div>
      {race.capacity && (
        <CapacityBar
          taken={race.capacity.taken}
          cap={race.capacity.cap}
          waitlist={race.capacity.waitlist}
        />
      )}
    </div>
  );
}
