import { describe, expect, it } from "vitest";
import { fuzzySearchEvents } from "@/lib/search/event-search";
import type { Event } from "@/lib/types/event";
import type { LocalizedString } from "@/lib/types/i18n";

const ls = (en: string, de: string): LocalizedString => ({ en, de });

const events: Event[] = [
  {
    id: "1",
    name: ls("City Marathon", "Stadtmarathon"),
    description: ls(
      "Fast and flat road marathon through the city.",
      "Schneller und flacher Straßenmarathon durch die Stadt.",
    ),
    type: "RoadRace",
    races: [],
    date: "2026-05-15",
    location: undefined,
  },
  {
    id: "2",
    name: ls("Trail Blast", "Trail-Knaller"),
    description: ls(
      "Technical singletrack and mountain views.",
      "Technischer Singletrail und Bergpanorama.",
    ),
    type: "TrailRun",
    races: [],
    date: "2026-06-01",
    location: undefined,
  },
  {
    id: "3",
    name: ls("Fun Run 5K", "Spaßlauf 5 km"),
    description: ls(
      "A friendly community event for everyone.",
      "Ein freundlicher Community-Lauf für alle.",
    ),
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
        name: ls("Alpine Marathon", "Alpenmarathon"),
        description: ls(
          "Scenic route with rolling hills.",
          "Malerische Strecke mit sanften Hügeln.",
        ),
        type: "RoadRace",
        races: [],
        date: undefined,
        location: undefined,
      },
      {
        id: "desc-hit",
        name: ls("Alpine Challenge", "Alpen-Challenge"),
        description: ls(
          "Includes a marathon option and shorter distances.",
          "Enthält eine Marathon-Option und kürzere Distanzen.",
        ),
        type: "RoadRace",
        races: [],
        date: undefined,
        location: undefined,
      },
    ];

    const result = fuzzySearchEvents(weightedEvents, "marathon");
    expect(result.map((e) => e.id)[0]).toBe("name-hit");
  });

  it("matches localized fields for the specified locale", () => {
    const result = fuzzySearchEvents(events, "community", "de");
    expect(result.map((e) => e.id)).toEqual(["3"]);
  });
});
