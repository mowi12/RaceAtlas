import Fuse, { type IFuseOptions } from "fuse.js";
import type { Event } from "@/lib/types/event";

/**
 * Configuration for fuzzy searching events.
 *
 * The weights favor matches on the event name over the description.
 * The threshold controls how tolerant the search is to mismatches.
 */
const fuseOptions: IFuseOptions<Event> = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "description", weight: 0.3 },
  ],
};

/**
 * Performs a fuzzy search over a list of events.
 * Returns all events if the query is empty.
 *
 * @param events - The list of events to search through.
 * @param query - The user-provided search query.
 * @returns A list of events matching the query, ordered by relevance.
 */
export function fuzzySearchEvents(events: Event[], query: string): Event[] {
  if (!query.trim()) return events;

  const fuse = new Fuse(events, fuseOptions);
  return fuse.search(query).map((result) => result.item);
}
