import { describe, expect, it } from "vitest";
import { filterEvents } from "@/lib/filter/filter-events";
import type { Event } from "@/lib/types/event";
import type { Race } from "@/lib/types/race";

const race = (id: string, distanceMeters: number): Race => ({
  id,
  name: `${distanceMeters / 1000}K`,
  distanceMeters,
});

const events: Event[] = [
  {
    id: "1",
    name: "Fun Run",
    type: "FunRun",
    races: [race("1-5k", 5000), race("1-10k", 10000)],
    date: "2026-05-01",
    location: { latitude: 47.2682, longitude: 11.3923 },
  },
  {
    id: "2",
    name: "Trail Blast",
    type: "TrailRun",
    races: [race("2-21k", 21097)],
    date: "2026-06-01",
    location: { latitude: 48.2082, longitude: 16.3738 },
  },
  {
    id: "3",
    name: "City Marathon",
    type: "RoadRace",
    races: [race("3-42k", 42195)],
    date: "2026-05-15",
    location: { latitude: 50.1109, longitude: 8.6821 },
  },
  {
    id: "4",
    name: "Night Sprint",
    type: "FunRun",
    races: [race("4-3k", 3000)],
    date: undefined,
    location: undefined,
  },
];

describe("filterEvents", () => {
  it("returns all events when filters are empty", () => {
    const filtered = filterEvents(events, {});
    expect(filtered.length).toBe(events.length);
  });

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

  it("filters by race distance range", () => {
    const filtered = filterEvents(events, {
      minRaceDistanceKm: 7,
      maxRaceDistanceKm: 15,
    });
    expect(filtered.map((e) => e.id)).toEqual(["1"]);
  });

  it("filters by race distance with min bound only", () => {
    const filtered = filterEvents(events, { minRaceDistanceKm: 21.097 });
    // event 2 has a 21.097km race; event 3 has 42.195km
    expect(filtered.map((e) => e.id)).toEqual(["2", "3"]);
  });

  it("filters by race distance with max bound only", () => {
    const filtered = filterEvents(events, { maxRaceDistanceKm: 5 });
    // event 1 has 5k; event 4 has 3k
    expect(filtered.map((e) => e.id)).toEqual(["1", "4"]);
  });

  it("treats race distance bounds as inclusive", () => {
    // exactly 10 should include event 1 (has 10k) and exclude event 4 (3k), 2 (21.097), 3 (42.195)
    const filtered = filterEvents(events, {
      minRaceDistanceKm: 10,
      maxRaceDistanceKm: 10,
    });
    expect(filtered.map((e) => e.id)).toEqual(["1"]);
  });

  it("filters by fuzzy search", () => {
    const filtered = filterEvents(events, { searchQuery: "marath" });
    expect(filtered.map((e) => e.id)).toEqual(["3"]);
  });

  it("combines multiple filters", () => {
    const filtered = filterEvents(events, {
      fromDate: "2026-05-01",
      toDate: "2026-06-01",
      eventTypes: ["FunRun"],
      searchQuery: "run",
      minRaceDistanceKm: 3,
      maxRaceDistanceKm: 10,
    });
    expect(filtered.map((e) => e.id)).toEqual(["1", "4"]);
  });

  it("returns empty when no events match", () => {
    const filtered = filterEvents(events, { eventTypes: ["Ultra"] });
    expect(filtered).toHaveLength(0);
  });

  it("returns empty when no events have any race within the distance constraints", () => {
    const filtered = filterEvents(events, {
      minRaceDistanceKm: 15,
      maxRaceDistanceKm: 20,
    });
    expect(filtered).toHaveLength(0);
  });
});
