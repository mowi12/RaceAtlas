"use client";

import type { DateRange } from "react-day-picker";
import { DateRangeFilter } from "@/lib/components/composites/timeline/filters/date-range-filter";
import { DistanceRangeFilter } from "@/lib/components/composites/timeline/filters/distance-range-filter";
import { EventTypeFilter } from "@/lib/components/composites/timeline/filters/event-type-filter";
import { TextSearchFilter } from "@/lib/components/composites/timeline/filters/text-search-filter";
import type { EventFilters } from "@/lib/filter/event-filters";
import type { EventType } from "@/lib/types/event";

type TimelineFilterBarProps = {
  filters: EventFilters;
  onFiltersChangeAction: (next: EventFilters) => void;
  distanceBoundsKm: { min: number; max: number };
  eventTypes: EventType[];
  locale: string;
};

function toIsoDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDateRange(filters: EventFilters): DateRange | undefined {
  if (!filters.fromDate && !filters.toDate) return undefined;
  const from = filters.fromDate
    ? new Date(`${filters.fromDate}T00:00:00`)
    : undefined;
  const to = filters.toDate
    ? new Date(`${filters.toDate}T00:00:00`)
    : undefined;
  return { from, to };
}

export function TimelineFilterBar({
  filters,
  onFiltersChangeAction,
  distanceBoundsKm,
  eventTypes,
  locale,
}: TimelineFilterBarProps) {
  const distanceMin = distanceBoundsKm.min;
  const distanceMax = distanceBoundsKm.max;
  const rangeValue: [number, number] = [
    filters.minRaceDistanceKm ?? distanceMin,
    filters.maxRaceDistanceKm ?? distanceMax,
  ];

  const handleDistanceChange = ([min, max]: [number, number]) => {
    onFiltersChangeAction({
      ...filters,
      minRaceDistanceKm: min === distanceMin ? undefined : min,
      maxRaceDistanceKm: max === distanceMax ? undefined : max,
    });
  };

  const handleDateChange = (range?: DateRange) => {
    onFiltersChangeAction({
      ...filters,
      fromDate: range?.from ? toIsoDateString(range.from) : undefined,
      toDate: range?.to ? toIsoDateString(range.to) : undefined,
    });
  };

  return (
    <div className="rounded-md border border-border bg-card/50 p-3">
      <div className="grid gap-3 md:grid-cols-4">
        <DistanceRangeFilter
          min={distanceMin}
          max={distanceMax}
          value={rangeValue}
          onChange={handleDistanceChange}
          disabled={distanceMin === distanceMax}
        />
        <TextSearchFilter
          value={filters.searchQuery ?? ""}
          onChange={(value) =>
            onFiltersChangeAction({
              ...filters,
              searchQuery: value.length ? value : undefined,
            })
          }
        />
        <DateRangeFilter
          value={toDateRange(filters)}
          onChange={handleDateChange}
          onClear={() =>
            onFiltersChangeAction({
              ...filters,
              fromDate: undefined,
              toDate: undefined,
            })
          }
          locale={locale}
        />
        <EventTypeFilter
          options={eventTypes}
          value={filters.eventTypes ?? []}
          onChangeAction={(next) =>
            onFiltersChangeAction({
              ...filters,
              eventTypes: next.length ? next : undefined,
            })
          }
          onClearAction={() =>
            onFiltersChangeAction({
              ...filters,
              eventTypes: undefined,
            })
          }
        />
      </div>
    </div>
  );
}
