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

  // Distance-based filtering
  if (maxDistanceKm !== undefined && userLocation) {
    result = result.filter((event) => {
      if (!event.location) return false;

      const distance = distanceInKm(userLocation, event.location);

      return distance <= maxDistanceKm;
    });
  }

  return result;
}
