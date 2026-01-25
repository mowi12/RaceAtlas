/**
 * A simple geographic coordinate expressed in WGS84 latitude/longitude.
 *
 * This is a primitive used throughout the application to describe positions on earth
 * without tying the model to any specific geo, map, or routing library.
 */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}
