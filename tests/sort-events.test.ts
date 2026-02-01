import { describe, expect, it } from "vitest";
import { sortEventsByDate } from "@/lib/sort/sort-events";
import type { Event } from "@/lib/types/event";

describe("sortEventsByDate", () => {
  it("sorts events ascending by date (earliest first)", () => {
    const events = [
      { id: "b", date: "2026-06-01" },
      { id: "a", date: "2026-05-01" },
      { id: "c", date: "2026-05-15" },
    ] as Event[];

    const sorted = sortEventsByDate(events);

    expect(sorted.map((e) => e.id)).toEqual(["a", "c", "b"]);
  });

  it("places events without a date at the end", () => {
    const events = [
      { id: "a", date: "2026-05-01" },
      { id: "no-date-1", date: undefined },
      { id: "b", date: "2026-04-01" },
      { id: "no-date-2", date: undefined },
    ] as Event[];

    const sorted = sortEventsByDate(events);

    expect(sorted.map((e) => e.id)).toEqual([
      "b",
      "a",
      "no-date-1",
      "no-date-2",
    ]);
  });

  it("does not mutate the input array", () => {
    const events = [
      { id: "a", date: "2026-05-01" },
      { id: "b", date: "2026-04-01" },
    ] as Event[];

    const originalOrder = events.map((e) => e.id);

    const sorted = sortEventsByDate(events);

    expect(events.map((e) => e.id)).toEqual(originalOrder); // original untouched
    expect(sorted.map((e) => e.id)).toEqual(["b", "a"]); // sorted copy
    expect(sorted).not.toBe(events); // different array instance
  });

  it("keeps relative order of equally-dated events (stable sort expectation)", () => {
    const events = [
      { id: "first", date: "2026-05-01" },
      { id: "second", date: "2026-05-01" },
      { id: "third", date: "2026-04-01" },
    ] as Event[];

    const sorted = sortEventsByDate(events);

    expect(sorted.map((e) => e.id)).toEqual(["third", "first", "second"]);
  });

  it("returns an empty array when given an empty array", () => {
    const sorted = sortEventsByDate([] as Event[]);
    expect(sorted).toEqual([]);
  });
});
