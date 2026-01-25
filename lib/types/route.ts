import type { GeoPoint } from "@/lib/types/geo";

/**
 * Represents the physical course of a race variant.
 *
 * A Route defines where a race starts and finishes and may optionally reference
 * GPX data used to render or analyze the course geometry.
 */
export interface Route {
  /**
   * The geographic starting point of the race.
   */
  start: GeoPoint;

  /**
   * The geographic finish point of the race.
   */
  finish: GeoPoint;

  /**
   * Raw GPX data representing the course geometry.
   *
   * This is optional, as not all events or organizers provide GPX files.
   * When present, this data is used for map rendering, distance calculations,
   * and elevation analysis.
   */
  gpxData?: string;

  /**
   * Domain-level points of interest associated with the route.
   *
   * The points are semantically meaningful to runners (e.g., aid stations,
   * toilets, medical tents) but do NOT define the route geometry itself.
   *
   * They are expected to be located in the immediate vicinity of the route
   * and may or may not be included in the GPX file.
   */
  pointsOfInterest?: RoutePOI[];
}

/**
 * Enumerates the supported semantic types for route points of interest.
 */
export type RoutePOIType =
  | "nutrition"
  | "toilet"
  | "medical"
  | "water"
  | "checkpoint"
  | "other";

/**
 * Represents a semantically meaningful point near or on a race route.
 *
 * RoutePOIs are NOT part of the route geometry and should not be used
 * to reconstruct the course. They exist purely to provide additional
 * context and information to runners.
 */
export interface RoutePOI {
  /**
   * Stable identifier for the point of interest.
   */
  id: string;

  /**
   * Geographic location of the POI.
   */
  location: GeoPoint;

  /**
   * The semantic category of this point of interest.
   */
  type: RoutePOIType;

  /**
   * Optional human-readable name (e.g., "Aid Station 2").
   */
  name?: string;

  /**
   * Optional descriptive text providing additional context.
   */
  description?: string;
}
