/**
 * Calculates the percentage of capacity filled, rounded to the nearest
 * integer and clamped to 100 (overbooked counts don't exceed a full bar).
 *
 * @param taken - Number of spots currently taken.
 * @param cap - Total capacity.
 * @returns The fill percentage, an integer in the range [0, 100].
 */
export function capacityPct(taken: number, cap: number): number {
  return Math.min(100, Math.round((taken / cap) * 100));
}
