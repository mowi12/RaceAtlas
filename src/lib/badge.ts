import type {
  BadgeDifficulty,
  CapacityState,
  EventSurface,
} from "@/components/ui/Badge";
import type { RaceCapacity } from "@/types";
import { RaceDifficulty, Surface } from "@/types";

const SURFACE_TO_BADGE: Record<Surface, EventSurface> = {
  [Surface.ROAD]: "road",
  [Surface.TRAIL]: "trail",
  [Surface.MIXED]: "mixed",
};

const DIFFICULTY_TO_BADGE: Record<RaceDifficulty, BadgeDifficulty> = {
  [RaceDifficulty.EASY]: "Easy",
  [RaceDifficulty.MEDIUM]: "Medium",
  [RaceDifficulty.HARD]: "Hard",
  [RaceDifficulty.EXTREME]: "Extreme",
};

/** Maps the domain difficulty enum to the Badge's presentational variant. */
export const toBadgeDifficulty = (d: RaceDifficulty): BadgeDifficulty =>
  DIFFICULTY_TO_BADGE[d];

/**
 * Converts a given surface into its corresponding badge surface representation.
 *
 * This function takes a surface identifier and retrieves the corresponding
 * badge surface from a predefined mapping.
 *
 * @param {Surface} s - The surface to convert into the badge surface.
 * @returns {EventSurface} The mapped badge surface for the given surface.
 */
export const toBadgeSurface = (s: Surface): EventSurface => SURFACE_TO_BADGE[s];

/**
 * Converts a RaceCapacity object into a CapacityState string.
 *
 * @param {RaceCapacity} c - The race capacity object containing capacity details.
 * @return {CapacityState} Returns "open" if the taken slots are less than the capacity,
 *                         "waitlist" if the capacity is full but a waitlist is available,
 *                         or "full" if there is no waitlist and the capacity is full.
 */
export function toCapacityState(c: RaceCapacity): CapacityState {
  if (c.taken < c.cap) return "open";
  return c.waitlist ? "waitlist" : "full";
}
