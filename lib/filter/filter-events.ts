import type { EventFilters } from "@/lib/filter/event-filters";
import { distanceInKm } from "@/lib/geo/distance";
import { fuzzySearchEvents } from "@/lib/search/event-search";
import type { Event } from "@/lib/types/event";

/**
 * Filters a list of events based on the provided filter criteria.
 *
 * All filters are optional and are applied cumulatively.
 *
 * @param events - The complete list of events.
 * @param filters - The filter criteria to apply.
 * @returns A new array containing only events matching the filters.
 */
export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  let result = [...events];

  const { fromDate, toDate } = filters;

  // Date filtering
  if (fromDate) {
    result = result.filter((event) => !event.date || event.date >= fromDate);
  }

  if (toDate) {
    result = result.filter((event) => !event.date || event.date <= toDate);
  }

  // Event type filtering
  if (filters.eventTypes?.length) {
    result = result.filter((event) => filters.eventTypes?.includes(event.type));
  }

  // Fuzzy search
  if (filters.searchQuery?.trim()) {
    result = fuzzySearchEvents(result, filters.searchQuery.trim());
  }

  const { maxDistanceKm, userLocation } = filters;

  // Geographic distance from user filtering
  if (maxDistanceKm !== undefined && userLocation) {
    result = result.filter((event) => {
      if (!event.location) return false;

      const distance = distanceInKm(userLocation, event.location);

      return distance <= maxDistanceKm;
    });
  }

  const { minRaceDistanceKm, maxRaceDistanceKm } = filters;

  // Race distance (length) filtering
  if (minRaceDistanceKm !== undefined || maxRaceDistanceKm !== undefined) {
    result = result.filter((event) =>
      eventHasRaceWithinKmRange(event, minRaceDistanceKm, maxRaceDistanceKm),
    );
  }

  return result;
}

/**
 * Determines whether an event offers at least one race whose length
 * falls within the specified distance range.
 *
 * The check is inclusive and succeeds if **any** race of the event
 * matches the constraints.
 *
 * @param event - The event whose races should be evaluated.
 * @param minKm - Optional minimum race distance in kilometers (inclusive). If omitted, no lower bound is applied.
 * @param maxKm - Optional maximum race distance in kilometers (inclusive). If omitted, no upper bound is applied.
 * @returns `true` if the event has at least one race with a distance (in km) within the given range; otherwise `false`.
 */
function eventHasRaceWithinKmRange(
  event: Event,
  minKm?: number,
  maxKm?: number,
): boolean {
  return event.races.some((race) =>
    isWithinRange(race.distanceMeters / 1000, minKm, maxKm),
  );
}

/**
 * Checks whether a numeric value lies within an optional inclusive range.
 *
 * Both bounds are optional:
 * - If `min` is undefined, no lower bound is enforced.
 * - If `max` is undefined, no upper bound is enforced.
 *
 * @param value - The value to test.
 * @param min - Optional inclusive lower bound.
 * @param max - Optional inclusive upper bound.
 * @returns `true` if the value satisfies the range constraints; otherwise `false`.
 */
function isWithinRange(value: number, min?: number, max?: number): boolean {
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}
