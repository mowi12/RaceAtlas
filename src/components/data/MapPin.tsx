import { distanceFromKm, fmtDateShort } from "@/data/mock-events";
import { cn } from "@/lib/utils";
import type { EventListItem } from "@/types";

interface MapPinYouProps {
  type: "you";
  label?: string;
  className?: string;
}

interface MapPinEventProps {
  type: "road" | "trail";
  event: EventListItem;
  className?: string;
}

type MapPinProps = MapPinYouProps | MapPinEventProps;

export function MapPin(props: MapPinProps) {
  if (props.type === "you") {
    return (
      <div
        className={cn(
          "relative inline-flex flex-col items-center",
          props.className,
        )}
      >
        <div
          className="w-5 h-5 rounded-full border-2 border-foreground"
          style={{
            background: "var(--lime)",
            boxShadow: `0 0 0 8px color-mix(in srgb, var(--lime) 33%, transparent)`,
          }}
        />
        <div className="absolute left-7 top-0 whitespace-nowrap">
          <div className="font-display font-black text-[18px] leading-none text-foreground">
            {props.label ?? "You"}
          </div>
          <div className="font-mono text-[9px] tracking-[1px] text-muted-foreground">
            BERLIN
          </div>
        </div>
      </div>
    );
  }

  const { event } = props;
  const isTrail = props.type === "trail";

  return (
    <div className={cn("relative inline-flex", props.className)}>
      {/* rotated diamond */}
      <div
        className="w-3.5 h-3.5 border border-foreground shrink-0"
        style={{
          background: isTrail ? "var(--warm)" : "var(--foreground)",
          transform: "rotate(45deg)",
        }}
      />
      <div className="absolute left-4 top-[-4px] whitespace-nowrap">
        <div className="font-mono text-[10px] leading-tight text-foreground">
          {event.name}
        </div>
        <div className="font-mono text-[9px] tracking-[1px] text-muted-foreground">
          {distanceFromKm(event)}KM · {fmtDateShort(event.date)}
        </div>
      </div>
    </div>
  );
}
