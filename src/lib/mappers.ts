/**
 * Maps persistence rows (Prisma) to domain/transport types (`src/types`).
 *
 * The DB stores value objects flattened into columns and exposes `Date`
 * objects; the domain layer wants nested objects and plain-string dates.
 * Keep all of that translation here so nothing above the data layer imports
 * from `@/generated/prisma`.
 */
import type {
  Event as PrismaEvent,
  EventLink as PrismaEventLink,
  Race as PrismaRace,
  Route as PrismaRoute,
  RouteGeometry as PrismaRouteGeometry,
  RoutePOI as PrismaRoutePOI,
} from "@/generated/prisma/client";
import type {
  EventDetail,
  EventLink,
  EventListItem,
  EventLocation,
  GeoPoint,
  Race,
  RaceCapacity,
  RaceDetail,
  Route,
  RouteGeometry,
  RoutePOI,
} from "@/types";

// Prisma returns `@db.Date` columns as a Date at UTC midnight, so the UTC
// calendar date is the intended plain date.
function toPlainDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toEventLocation(e: PrismaEvent): EventLocation {
  return {
    lat: e.locationLat,
    lng: e.locationLng,
    displayName: e.locationDisplayName,
  };
}

function toRaceCapacity(r: PrismaRace): RaceCapacity | undefined {
  if (r.capacityCap === null || r.capacityTaken === null) return undefined;
  return {
    cap: r.capacityCap,
    taken: r.capacityTaken,
    waitlist: r.capacityWaitlist ?? false,
  };
}

export function toEventLink(l: PrismaEventLink): EventLink {
  return { id: l.id, label: l.label, url: l.url };
}

export function toRace(r: PrismaRace): Race {
  return {
    id: r.id,
    eventId: r.eventId,
    name: r.name,
    distanceMeters: r.distanceMeters,
    elevationGainMeters: r.elevationGainMeters ?? undefined,
    difficulty: r.difficulty ?? undefined,
    startTime: r.startTime ?? undefined,
    surface: r.surface ?? undefined,
    capacity: toRaceCapacity(r),
  };
}

export function toRoutePOI(p: PrismaRoutePOI): RoutePOI {
  return {
    id: p.id,
    routeId: p.routeId,
    location: { lat: p.lat, lng: p.lng },
    type: p.type,
    name: p.name ?? undefined,
    description: p.description ?? undefined,
  };
}

export function toRoute(
  route: PrismaRoute & { pointsOfInterest: PrismaRoutePOI[] },
): Route {
  return {
    id: route.id,
    raceId: route.raceId,
    start: { lat: route.startLat, lng: route.startLng },
    finish: { lat: route.finishLat, lng: route.finishLng },
    pointsOfInterest: route.pointsOfInterest.map(toRoutePOI),
  };
}

export function toRaceDetail(
  r: PrismaRace & {
    route: (PrismaRoute & { pointsOfInterest: PrismaRoutePOI[] }) | null;
  },
): RaceDetail {
  return {
    ...toRace(r),
    route: r.route ? toRoute(r.route) : undefined,
  };
}

export function toEventListItem(
  e: PrismaEvent & { races: PrismaRace[] },
): EventListItem {
  return {
    id: e.id,
    slug: e.slug,
    name: e.name,
    date: toPlainDate(e.date),
    location: toEventLocation(e),
    races: e.races.map(toRace),
  };
}

export function toEventDetail(
  e: PrismaEvent & {
    links: PrismaEventLink[];
    races: (PrismaRace & {
      route: (PrismaRoute & { pointsOfInterest: PrismaRoutePOI[] }) | null;
    })[];
  },
): EventDetail {
  return {
    id: e.id,
    slug: e.slug,
    name: e.name,
    date: toPlainDate(e.date),
    location: toEventLocation(e),
    description: e.description ?? undefined,
    status: e.status,
    links: e.links.map(toEventLink),
    races: e.races.map(toRaceDetail),
  };
}

// Lazy-loaded; never bundled into list/detail payloads.
export function toRouteGeometry(g: PrismaRouteGeometry): RouteGeometry {
  return {
    routeId: g.routeId,
    geoJson: g.geoJson as RouteGeometry["geoJson"],
  };
}

// Re-exported for callers that only need a point projection.
export function toGeoPoint(lat: number, lng: number): GeoPoint {
  return { lat, lng };
}
