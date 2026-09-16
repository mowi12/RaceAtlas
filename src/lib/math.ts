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

/**
 * Calculates the great-circle distance between two geographical points
 * using the Haversine formula. The distance is returned in kilometers.
 *
 * @param a - The first geographical point.
 * @param a.lat - The latitude of the first point in degrees.
 * @param a.lng - The longitude of the first point in degrees.
 * @param b - The second geographical point.
 * @param b.lat - The latitude of the second point in degrees.
 * @param b.lng - The longitude of the second point in degrees.
 * @return The distance between the two points in kilometers.
 */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sin =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(sin), Math.sqrt(1 - sin));
}
