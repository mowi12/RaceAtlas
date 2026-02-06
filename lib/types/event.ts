import type { GeoPoint } from "@/lib/types/geo";
import type { LocalizedString } from "@/lib/types/i18n";
import type { Race } from "@/lib/types/race";

/**
 * High-level classification of a running event.
 *
 * This describes the general nature of the event and is used
 * for filtering, labeling, and visual differentiation.
 */
export type EventType =
  | "FunRun"
  | "TrailRun"
  | "RoadRace"
  | "Ultra"
  | "ObstacleRun"
  | "StairRun"
  | "Challenge";

/**
 * Represents a running event that may consist of one or more race variants.
 *
 * An Event is the primary entity displayed on maps, timelines, and calendars.
 * Users typically discover events first and then select a specific race variant.
 */
export interface Event {
  /**
   * Stable identifier for the event.
   */
  id: string;

  /**
   * Official name of the event.
   */
  name: LocalizedString;

  /**
   * Optional textual description providing additional context.
   */
  description?: LocalizedString;

  /**
   * Optional geographic location of the event.
   */
  location?: GeoPoint;

  /**
   * Date on which the event takes place.
   *
   * This represents the overall event date; individual race variants may specify their own start times.
   */
  date?: string;

  /**
   * High-level classification of the event.
   */
  type: EventType;

  /**
   * Collection of race variants offered as part of this event.
   *
   * There must always be at least one race present.
   */
  races: Race[];

  /**
   * Optional external link to the official event website or registration page.
   */
  externalLink?: string;
}
