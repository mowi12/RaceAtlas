import type { GeoPoint } from "@/lib/types/geo";

/**
 * Calculates the great-circle distance between two points
 * using the Haversine formula.
 *
 * This function assumes coordinates are expressed in WGS84
 * latitude/longitude.
 *
 * @param a - First geographic point.
 * @param b - Second geographic point.
 * @returns Distance between the two points in kilometers.
 */
export function distanceInKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371; // Earth radius in km

  const dLat = degToRad(b.latitude - a.latitude);
  const dLon = degToRad(b.longitude - a.longitude);

  const lat1 = degToRad(a.latitude);
  const lat2 = degToRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Converts degrees to radians.
 *
 * @param deg - Angle in degrees.
 * @returns Angle in radians.
 */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
