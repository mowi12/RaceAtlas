import type { EventType } from "@/lib/types/event";
import type { GeoPoint } from "@/lib/types/geo";

/**
 * Defines the available filtering options for events.
 *
 * All properties are optional and can be combined freely.
 */
export interface EventFilters {
  /**
   * Limit events to a specific date range.
   */
  fromDate?: string;
  toDate?: string;

  /**
   * Filter by event types (TrailRun, RoadRace, etc.).
   */
  eventTypes?: EventType[];

  /**
   * Filter events within a certain distance (in kilometers)
   * from the user's current location.
   */
  maxDistanceKm?: number;

  /**
   * User's inferred geographic location (browser-based).
   */
  userLocation?: GeoPoint;

  /**
   * Fuzzy search query (name + description).
   */
  searchQuery?: string;
}
