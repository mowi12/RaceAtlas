import { describe, expect, it } from "vitest";
import { fuzzySearchEvents } from "@/lib/search/event-search";
import type { Event } from "@/lib/types/event";

const events: Event[] = [
  {
    id: "1",
    name: "City Marathon",
    description: "Fast and flat road marathon through the city.",
    type: "RoadRace",
    races: [],
    date: "2026-05-15",
    location: undefined,
  },
  {
    id: "2",
    name: "Trail Blast",
    description: "Technical singletrack and mountain views.",
    type: "TrailRun",
    races: [],
    date: "2026-06-01",
    location: undefined,
  },
  {
    id: "3",
    name: "Fun Run 5K",
    description: "A friendly community event for everyone.",
    type: "FunRun",
    races: [],
    date: "2026-05-01",
    location: undefined,
  },
];

describe("fuzzySearchEvents", () => {
  it("returns all events (same reference) when query is empty", () => {
    const result = fuzzySearchEvents(events, "");
    expect(result).toBe(events);
    expect(result.map((e) => e.id)).toEqual(["1", "2", "3"]);
  });

  it("returns all events (same reference) when query is whitespace", () => {
    const result = fuzzySearchEvents(events, "   ");
    expect(result).toBe(events);
    expect(result.map((e) => e.id)).toEqual(["1", "2", "3"]);
  });

  it("matches on name", () => {
    const result = fuzzySearchEvents(events, "marath");
    expect(result.map((e) => e.id)).toEqual(["1"]);
  });

  it("matches on description", () => {
    const result = fuzzySearchEvents(events, "singletrack");
    expect(result.map((e) => e.id)).toEqual(["2"]);
  });

  it("prefers name matches over description matches (weights)", () => {
    const weightedEvents: Event[] = [
      {
        id: "name-hit",
        name: "Alpine Marathon",
        description: "Scenic route with rolling hills.",
        type: "RoadRace",
        races: [],
        date: undefined,
        location: undefined,
      },
      {
        id: "desc-hit",
        name: "Alpine Challenge",
        description: "Includes a marathon option and shorter distances.",
        type: "RoadRace",
        races: [],
        date: undefined,
        location: undefined,
      },
    ];

    const result = fuzzySearchEvents(weightedEvents, "marathon");
    expect(result.map((e) => e.id)[0]).toBe("name-hit");
  });
});
