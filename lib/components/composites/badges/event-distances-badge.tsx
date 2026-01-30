import { ChevronRight, Route } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/lib/components/primitives/badge";

type EventDistancesBadgeProps = {
  distances: string[];
};

function stopLinkNavigation(e: React.SyntheticEvent) {
  e.preventDefault();
  e.stopPropagation();
}

export function EventDistancesBadge({ distances }: EventDistancesBadgeProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (distances.length === 0) return;
    setOpen(!open);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Badge
        data-block-card-hover
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={(e) => {
          stopLinkNavigation(e);
          toggle();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            stopLinkNavigation(e);
            toggle();
          }
        }}
        className="bg-muted text-muted-foreground border-border cursor-pointer select-none transition-colors hover:text-foreground"
      >
        <Route />
        {distances.length} Distances
      </Badge>

      {open && distances.length > 0 && (
        <div className="inline-flex items-center gap-2">
          <ChevronRight
            className="text-muted-foreground h-4 w-4"
            aria-hidden="true"
          />

          {distances.map((distance) => (
            <Badge
              key={distance}
              className="bg-muted text-muted-foreground border-border"
            >
              {distance}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
