import { describe, expect, it } from "vitest";
import { fuzzySearchEvents } from "@/lib/search/event-search";
import type { Event } from "@/lib/types/event";

const events: Event[] = [
  {
    id: "1",
    name: "Fun Run",
    type: "FunRun",
    races: [],
    description: "A fun 5k for everyone",
  },
  {
    id: "2",
    name: "Trail Blast",
    type: "TrailRun",
    races: [],
    description: "Challenging trail race",
  },
  {
    id: "3",
    name: "City Marathon",
    type: "RoadRace",
    races: [],
    description: "Classic 42k marathon",
  },
  {
    id: "4",
    name: "Night Sprint",
    type: "FunRun",
    races: [],
    description: "Fast night run",
  },
];

describe("fuzzySearchEvents", () => {
  it("finds exact matches by name", () => {
    const results = fuzzySearchEvents(events, "Fun Run");
    expect(results.map((e) => e.id)).toEqual(["1"]);
  });

  it("finds partial matches in name", () => {
    const results = fuzzySearchEvents(events, "Marath");
    expect(results.map((e) => e.id)).toEqual(["3"]);
  });

  it("finds partial matches in description", () => {
    const results = fuzzySearchEvents(events, "challenging");
    expect(results.map((e) => e.id)).toEqual(["2"]);
  });

  it("is case-insensitive", () => {
    const results = fuzzySearchEvents(events, "city marathon");
    expect(results.map((e) => e.id)).toEqual(["3"]);
  });

  it("matches despite typos", () => {
    const results = fuzzySearchEvents(events, "trail blass");
    expect(results.map((e) => e.id)).toEqual(["2"]);
  });

  it("returns multiple matches", () => {
    const results = fuzzySearchEvents(events, "run");
    expect(results.map((e) => e.id)).toEqual(["1", "4"]);
  });

  it("returns empty array when no matches", () => {
    const results = fuzzySearchEvents(events, "swimming");
    expect(results).toHaveLength(0);
  });

  it("returns all events for empty query", () => {
    const results = fuzzySearchEvents(events, "");
    expect(results.length).toBe(events.length);
  });

  it("handles empty events array", () => {
    const results = fuzzySearchEvents([], "fun");
    expect(results).toHaveLength(0);
  });
});
