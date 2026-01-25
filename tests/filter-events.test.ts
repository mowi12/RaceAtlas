import { describe, expect, it } from "vitest";
import { filterEvents } from "@/lib/filter/filter-events";
import type { Event } from "@/lib/types/event";
import type { GeoPoint } from "@/lib/types/geo";

const events: Event[] = [
  {
    id: "1",
    name: "Fun Run",
    type: "FunRun",
    races: [],
    date: "2026-05-01",
    location: { latitude: 47.2682, longitude: 11.3923 },
  },
  {
    id: "2",
    name: "Trail Blast",
    type: "TrailRun",
    races: [],
    date: "2026-06-01",
    location: { latitude: 48.2082, longitude: 16.3738 },
  },
  {
    id: "3",
    name: "City Marathon",
    type: "RoadRace",
    races: [],
    date: "2026-05-15",
    location: { latitude: 50.1109, longitude: 8.6821 },
  }, // Frankfurt
  {
    id: "4",
    name: "Night Sprint",
    type: "FunRun",
    races: [],
    date: undefined,
    location: undefined,
  },
];

describe("filterEvents", () => {
  it("filters by fromDate", () => {
    const filtered = filterEvents(events, { fromDate: "2026-05-15" });
    expect(filtered.map((e) => e.id)).toEqual(["2", "3", "4"]); // event without date included
  });

  it("filters by toDate", () => {
    const filtered = filterEvents(events, { toDate: "2026-05-15" });
    expect(filtered.map((e) => e.id)).toEqual(["1", "3", "4"]); // event without date included
  });

  it("filters by event type", () => {
    const filtered = filterEvents(events, { eventTypes: ["FunRun"] });
    expect(filtered.map((e) => e.id)).toEqual(["1", "4"]);
  });

  it("filters by fuzzy search", () => {
    const filtered = filterEvents(events, { searchQuery: "marath" });
    expect(filtered.map((e) => e.id)).toEqual(["3"]);
  });

  it("filters by distance", () => {
    const userLocation: GeoPoint = { latitude: 47.2682, longitude: 11.3923 }; // Innsbruck
    const filtered = filterEvents(events, { maxDistanceKm: 10, userLocation });
    expect(filtered.map((e) => e.id)).toEqual(["1"]); // only event 1 is nearby
  });

  it("combines multiple filters", () => {
    const userLocation: GeoPoint = { latitude: 47.2682, longitude: 11.3923 };
    const filtered = filterEvents(events, {
      fromDate: "2026-05-01",
      toDate: "2026-06-01",
      eventTypes: ["FunRun"],
      searchQuery: "run",
      maxDistanceKm: 10,
      userLocation,
    });
    expect(filtered.map((e) => e.id)).toEqual(["1"]);
  });

  it("returns all events when filters are empty", () => {
    const filtered = filterEvents(events, {});
    expect(filtered.length).toBe(events.length);
  });

  it("returns empty when no events match", () => {
    const filtered = filterEvents(events, { eventTypes: ["Ultra"] });
    expect(filtered).toHaveLength(0);
  });
});
