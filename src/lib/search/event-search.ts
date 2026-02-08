import Fuse, { type IFuseOptions } from "fuse.js";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import type { Event } from "@/lib/types/event";

/**
 * Localized, text-only representation of an event for fuzzy searching.
 */
type LocalizedEventSearchEntry = {
  event: Event;
  name: string;
  description: string;
};

/**
 * Configuration for fuzzy searching events.
 *
 * The weights favor matches on the event name over the description.
 * The threshold controls how tolerant the search is to mismatches.
 */
const fuseOptions: IFuseOptions<LocalizedEventSearchEntry> = {
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
 * @param locale - The locale to use for localized text matching.
 * @returns A list of events matching the query, ordered by relevance.
 */
export function fuzzySearchEvents(
  events: Event[],
  query: string,
  locale: string = "en",
): Event[] {
  if (!query.trim()) return events;

  const docs: LocalizedEventSearchEntry[] = events.map((event) => ({
    event,
    name: getLocalizedText(event.name, locale),
    description: getLocalizedText(event.description, locale),
  }));

  const fuse = new Fuse(docs, fuseOptions);
  return fuse.search(query).map((result) => result.item.event);
}
