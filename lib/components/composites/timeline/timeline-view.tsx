"use client";

import { useLocale } from "next-intl";
import { useMemo, useState } from "react";
import { TimelineFilterBar } from "@/lib/components/composites/timeline/timeline-filter-bar";
import { TimelineList } from "@/lib/components/composites/timeline/timeline-list";
import type { EventFilters } from "@/lib/filter/event-filters";
import { filterEvents } from "@/lib/filter/filter-events";
import { useEventStore } from "@/lib/store/event-store";
import type { EventType } from "@/lib/types/event";

export function TimelineView() {
  const locale = useLocale();
  const events = useEventStore((state) => state.events);
  const [filters, setFilters] = useState<EventFilters>({});

  const distanceBoundsKm = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    events.forEach((event) => {
      event.races.forEach((race) => {
        const distanceKm = race.distanceMeters / 1000;
        min = Math.min(min, distanceKm);
        max = Math.max(max, distanceKm);
      });
    });

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.floor(min),
      max: Math.ceil(max),
    };
  }, [events]);

  const eventTypes = useMemo(() => {
    const unique = new Set<EventType>();
    events.forEach((event) => {
      unique.add(event.type);
    });
    return Array.from(unique);
  }, [events]);

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <TimelineFilterBar
        filters={filters}
        onFiltersChangeAction={setFilters}
        distanceBoundsKm={distanceBoundsKm}
        eventTypes={eventTypes}
        locale={locale}
      />

      <TimelineList
        events={filteredEvents}
        locale={locale}
        className="min-h-0 flex-1"
      />
    </div>
  );
}
