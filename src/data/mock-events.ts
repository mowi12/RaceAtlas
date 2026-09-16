// Mock data for /design only — swap for real Prisma-backed queries in Phase 2.
// Content stays English here by design-system convention; real app content will be
// German-only per PROJECT_GUIDE.md §1.3 (tracked separately from this component work).
import { haversineKm } from "@/lib/math";
import type { EventListItem } from "@/types";
import { RaceDifficulty, Surface } from "@/types";

/** Reference point for "distance from you" demos — matches the MapPin "you" marker. */
export const YOU_LOCATION = { lat: 52.52, lng: 13.405 };

/** Anything past marathon distance is an ultra. */
const MARATHON_M = 42195;

export const MOCK_EVENTS: EventListItem[] = [
  {
    id: "evt-1",
    slug: "berlin-marathon",
    name: "Berlin Marathon",
    date: "2026-09-20",
    location: { lat: 52.51, lng: 13.4, displayName: "Berlin" },
    races: [
      {
        id: "race-1",
        eventId: "evt-1",
        name: "Marathon",
        distanceMeters: 42195,
        elevationGainMeters: 73,
        difficulty: RaceDifficulty.MEDIUM,
        surface: Surface.ROAD,
        capacity: { cap: 50000, taken: 50000, waitlist: true },
      },
    ],
  },
  {
    id: "evt-2",
    slug: "hamburg-halbmarathon",
    name: "Hamburg Halbmarathon",
    date: "2026-06-22",
    location: { lat: 53.55, lng: 9.99, displayName: "Hamburg" },
    races: [
      {
        id: "race-2",
        eventId: "evt-2",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 41,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 15000, taken: 8420, waitlist: false },
      },
    ],
  },
  {
    id: "evt-3",
    slug: "tegelsee-trail-25",
    name: "Tegelsee Trail 25",
    date: "2026-05-17",
    location: { lat: 52.58, lng: 13.27, displayName: "Berlin" },
    races: [
      {
        id: "race-3",
        eventId: "evt-3",
        name: "25K",
        distanceMeters: 25000,
        elevationGainMeters: 480,
        difficulty: RaceDifficulty.HARD,
        surface: Surface.TRAIL,
        capacity: { cap: 800, taken: 612, waitlist: false },
      },
    ],
  },
  {
    id: "evt-4",
    slug: "muenchen-stadtlauf",
    name: "München Stadtlauf",
    date: "2026-10-12",
    location: { lat: 48.13, lng: 11.58, displayName: "Munich" },
    races: [
      {
        id: "race-4",
        eventId: "evt-4",
        name: "10K",
        distanceMeters: 10000,
        elevationGainMeters: 88,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 8000, taken: 2900, waitlist: false },
      },
      {
        id: "race-5",
        eventId: "evt-4",
        name: "5K",
        distanceMeters: 5000,
        elevationGainMeters: 44,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 4000, taken: 1200, waitlist: false },
      },
    ],
  },
  {
    id: "evt-5",
    slug: "frankfurt-marathon",
    name: "Frankfurt Marathon",
    date: "2026-10-25",
    location: { lat: 50.11, lng: 8.68, displayName: "Frankfurt" },
    races: [
      {
        id: "race-6",
        eventId: "evt-5",
        name: "Marathon",
        distanceMeters: 42195,
        elevationGainMeters: 65,
        difficulty: RaceDifficulty.MEDIUM,
        surface: Surface.ROAD,
        capacity: { cap: 27000, taken: 19400, waitlist: false },
      },
    ],
  },
  {
    id: "evt-6",
    slug: "koeln-halbmarathon",
    name: "Köln Halbmarathon",
    date: "2026-10-04",
    location: { lat: 50.94, lng: 6.96, displayName: "Cologne" },
    races: [
      {
        id: "race-7",
        eventId: "evt-6",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 52,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 18000, taken: 13800, waitlist: false },
      },
      {
        id: "race-8",
        eventId: "evt-6",
        name: "10K",
        distanceMeters: 10000,
        elevationGainMeters: 30,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 4000, taken: 3000, waitlist: false },
      },
    ],
  },
  {
    id: "evt-7",
    slug: "bodensee-ultra-100",
    name: "Bodensee Ultra 100",
    date: "2026-07-18",
    location: { lat: 47.66, lng: 9.18, displayName: "Konstanz" },
    races: [
      {
        id: "race-9",
        eventId: "evt-7",
        name: "100K",
        distanceMeters: 100000,
        elevationGainMeters: 2300,
        difficulty: RaceDifficulty.EXTREME,
        surface: Surface.MIXED,
        capacity: { cap: 400, taken: 280, waitlist: false },
      },
      {
        id: "race-10",
        eventId: "evt-7",
        name: "50K",
        distanceMeters: 50000,
        elevationGainMeters: 1150,
        difficulty: RaceDifficulty.HARD,
        surface: Surface.MIXED,
        capacity: { cap: 200, taken: 130, waitlist: false },
      },
    ],
  },
  {
    id: "evt-8",
    slug: "schwarzwald-trail",
    name: "Schwarzwald Trail",
    date: "2026-08-09",
    location: { lat: 48.76, lng: 8.24, displayName: "Baden-Baden" },
    races: [
      {
        id: "race-11",
        eventId: "evt-8",
        name: "Marathon Trail",
        distanceMeters: 42195,
        elevationGainMeters: 1850,
        difficulty: RaceDifficulty.EXTREME,
        surface: Surface.TRAIL,
        capacity: { cap: 900, taken: 980, waitlist: true },
      },
      {
        id: "race-12",
        eventId: "evt-8",
        name: "21K",
        distanceMeters: 21000,
        elevationGainMeters: 920,
        difficulty: RaceDifficulty.HARD,
        surface: Surface.TRAIL,
      },
    ],
  },
  {
    id: "evt-9",
    slug: "rhein-run-21",
    name: "Rhein Run 21",
    date: "2026-11-01",
    location: { lat: 51.23, lng: 6.78, displayName: "Düsseldorf" },
    races: [
      {
        id: "race-13",
        eventId: "evt-9",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 28,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        // Intentionally no `capacity` — demos the CapacityBar-dropped state.
      },
    ],
  },
  {
    id: "evt-10",
    slug: "hannover-marathon",
    name: "Hannover Marathon",
    date: "2026-04-12",
    location: { lat: 52.37, lng: 9.73, displayName: "Hannover" },
    races: [
      {
        id: "race-14",
        eventId: "evt-10",
        name: "Marathon",
        distanceMeters: 42195,
        elevationGainMeters: 36,
        difficulty: RaceDifficulty.MEDIUM,
        surface: Surface.ROAD,
        capacity: { cap: 8000, taken: 7800, waitlist: false },
      },
      {
        id: "race-15",
        eventId: "evt-10",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 22,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 6000, taken: 5500, waitlist: false },
      },
      {
        id: "race-16",
        eventId: "evt-10",
        name: "10K",
        distanceMeters: 10000,
        elevationGainMeters: 14,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 4000, taken: 3900, waitlist: false },
      },
    ],
  },
  {
    id: "evt-11",
    slug: "leipzig-halbmarathon",
    name: "Leipzig Halbmarathon",
    date: "2026-04-26",
    location: { lat: 51.34, lng: 12.37, displayName: "Leipzig" },
    races: [
      {
        id: "race-17",
        eventId: "evt-11",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 18,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 6000, taken: 2200, waitlist: false },
      },
      {
        id: "race-18",
        eventId: "evt-11",
        name: "10K",
        distanceMeters: 10000,
        elevationGainMeters: 10,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
      },
    ],
  },
  {
    id: "evt-12",
    slug: "spreewald-marathon",
    name: "Spreewald Marathon",
    date: "2026-05-31",
    location: { lat: 51.86, lng: 13.97, displayName: "Lübbenau" },
    races: [
      {
        id: "race-19",
        eventId: "evt-12",
        name: "Marathon",
        distanceMeters: 42195,
        elevationGainMeters: 22,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 1800, taken: 1840, waitlist: true },
      },
      {
        id: "race-20",
        eventId: "evt-12",
        name: "Half",
        distanceMeters: 21098,
        elevationGainMeters: 12,
        difficulty: RaceDifficulty.EASY,
        surface: Surface.ROAD,
        capacity: { cap: 1200, taken: 1000, waitlist: false },
      },
    ],
  },
];

export const REF_DATE = new Date("2026-03-04T10:00:00Z");

export function daysUntil(iso: string): number {
  const d = new Date(`${iso}T00:00:00Z`);
  const ms = d.getTime() - REF_DATE.getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function fmtDateShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    })
    .toUpperCase();
}

/** The race shown when a UI surface needs a single representative race per event. */
export function primaryRace(event: EventListItem) {
  const race = event.races[0];
  if (!race) throw new Error(`event ${event.id} has no races`);
  return race;
}

/** Event surface for badges/markers — derived from the primary race. */
export function eventSurface(event: EventListItem): Surface {
  return primaryRace(event).surface ?? Surface.ROAD;
}

/** Primary race is on trail — drives the warm marker/calendar accent. */
export function isTrailEvent(event: EventListItem): boolean {
  return eventSurface(event) === Surface.TRAIL;
}

/** Primary race is past marathon distance — drives the lime ultra marker. */
export function isUltraEvent(event: EventListItem): boolean {
  return primaryRace(event).distanceMeters > MARATHON_M;
}

/**
 * Distance from a reference point (e.g. the user's geolocation) in whole km.
 * Mirrors the real "near me" feature (§1.5): computed on the fly, never stored.
 */
export function distanceFromKm(
  event: EventListItem,
  from: { lat: number; lng: number } = YOU_LOCATION,
): number {
  return Math.round(haversineKm(from, event.location));
}
