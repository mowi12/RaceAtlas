import type { GeoPoint } from "./geo";

export { PoiType } from "@/generated/prisma/enums";

import type { PoiType } from "@/generated/prisma/enums";

export interface RoutePOI {
  id: string;
  routeId: string;
  location: GeoPoint;
  type: PoiType;
  name?: string;
  description?: string;
}

/**
 * Route metadata — present in EventDetail.
 * Geometry is excluded here; fetch RouteGeometry separately on demand.
 */
export interface Route {
  id: string;
  raceId: string;
  start: GeoPoint;
  finish: GeoPoint;
  pointsOfInterest: RoutePOI[];
}

/**
 * Lazy-loaded on map pin click and detail map render.
 * Never bundled into EventListItem or EventDetail.
 */
export interface RouteGeometry {
  routeId: string;
  /**
   * GeoJSON LineString decoded from GPX.
   * Coordinates follow GeoJSON spec order: [longitude, latitude, elevation?]
   */
  geoJson: {
    type: "LineString";
    coordinates: number[][];
  };
}
