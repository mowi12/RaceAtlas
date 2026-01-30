import { describe, expect, it } from "vitest";
import { sortEventsByDate } from "@/lib/sort/sort-events";
import type { Event } from "@/lib/types/event";

const events: Event[] = [
  {
    id: "1",
    name: "Event One",
    type: "FunRun",
    races: [],
    date: "2026-06-01",
  },
  {
    id: "2",
    name: "Event Two",
    type: "TrailRun",
    races: [],
    date: "2026-05-15",
  },
  {
    id: "3",
    name: "Event Three",
    type: "RoadRace",
    races: [],
    date: undefined,
  },
];

describe("sortEventsByDate", () => {
  it("sorts events by date ascending", () => {
    const sorted = sortEventsByDate(events);
    expect(sorted.map((event) => event.id)).toEqual(["2", "1", "3"]);
  });

  it("does not mutate the original array", () => {
    const originalOrder = events.map((event) => event.id);
    sortEventsByDate(events);
    expect(events.map((event) => event.id)).toEqual(originalOrder);
  });
});
