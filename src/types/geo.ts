export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface EventLocation extends GeoPoint {
  displayName: string;
}
