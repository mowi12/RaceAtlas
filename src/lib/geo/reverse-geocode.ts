/**
 * Reverse-geocodes coordinates to a town name via Photon (https://photon.komoot.io),
 * komoot's OpenStreetMap-based geocoder, hosted in Germany.
 *
 * Coordinates are sent to this third party, so the location feature must be disclosed in
 * the privacy notice / Impressum. It only runs after the user grants the browser's
 * geolocation prompt, and denying it leaves the feature off.
 *
 * Data © OpenStreetMap contributors (ODbL). Attribution required.
 */
const ENDPOINT = "https://photon.komoot.io/reverse";

interface PhotonProperties {
  name?: string;
  city?: string;
  town?: string;
  village?: string;
}

interface PhotonResponse {
  features?: { properties?: PhotonProperties }[];
}

/** Nearest place name for the coordinates, or null if none could be resolved. */
export async function reverseGeocode(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<string | null> {
  // `osm_tag=place` biases the result to populated places (city/town/village/…)
  // rather than the nearest street or POI.
  const url = `${ENDPOINT}?lat=${lat}&lon=${lng}&lang=de&osm_tag=place`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`photon ${res.status}`);

  const data = (await res.json()) as PhotonResponse;
  const p = data.features?.[0]?.properties;
  if (!p) return null;
  return p.city ?? p.town ?? p.village ?? p.name ?? null;
}
