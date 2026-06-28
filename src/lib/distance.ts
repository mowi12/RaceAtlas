const MARATHON_M = 42195;
const HALF_M = 21097;
const TOLERANCE_M = 1000;

/**
 * Human-readable race-distance label, derived purely from `distanceMeters`.
 * Matches near marathon/half are labeled by name; anything past marathon
 * distance is "Ultra"; otherwise whole km, or meters under 1K.
 */
export function formatDistance(distanceMeters: number): string {
  if (Math.abs(distanceMeters - MARATHON_M) <= TOLERANCE_M) return "Marathon";
  if (Math.abs(distanceMeters - HALF_M) <= TOLERANCE_M) return "Half";
  if (distanceMeters > MARATHON_M) {
    return `Ultra · ${Math.round(distanceMeters / 1000)}K`;
  }
  if (distanceMeters >= 1000) return `${Math.round(distanceMeters / 1000)}K`;
  return `${Math.round(distanceMeters)}m`;
}
