import type { LocalizedString } from "@/lib/types/i18n";
import type { Route } from "@/lib/types/route";

/**
 * Describes the relative difficulty of a race variant.
 *
 * This is a coarse, human-facing classification intended for quick comparison.
 * It is not meant to replace objective metrics such as distance or elevation gain.
 */
export const RACE_DIFFICULTIES = ["Easy", "Medium", "Hard", "Extreme"] as const;
export type RaceDifficulty = (typeof RACE_DIFFICULTIES)[number];

/**
 * Represents a runnable distance variant within an event.
 *
 * A Race corresponds to what participants actually sign up for
 * (e.g., 10K, Half Marathon, Marathon).
 */
export interface Race {
  /**
   * Stable identifier for the race.
   */
  id: string;

  /**
   * Human-readable name of the race (e.g., "10K", "Half Marathon").
   */
  name: LocalizedString;

  /**
   * Official race distance in meters.
   */
  distanceMeters: number;

  /**
   * Total positive elevation gain in meters.
   */
  elevationGainMeters?: number;

  /**
   * Optional start time of this race variant.
   *
   * The data is expected to be derived from the parent Event.
   */
  startTime?: string;

  /**
   * Optional difficulty classification for this race.
   */
  difficulty?: RaceDifficulty;

  /**
   * Optional route describing the physical course of this race.
   */
  route?: Route;
}
