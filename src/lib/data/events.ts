import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Event } from "@/lib/types/event";
import type { LocalizedString } from "@/lib/types/i18n";
import { RACE_DIFFICULTIES, type RaceDifficulty } from "@/lib/types/race";

/**
 * Database row shape for a race as returned by Supabase.
 * Mirrors `races` table columns and uses snake_case field names.
 */
type RaceRow = {
  id: string;
  name: LocalizedString;
  distance_meters: number;
  elevation_gain_meters: number | null;
  start_time: string | null;
  difficulty: string | null;
};

/**
 * Database row shape for an event as returned by Supabase.
 * Mirrors `events` table columns and includes nested `races`.
 */
type EventRow = {
  id: string;
  name: LocalizedString;
  description: LocalizedString | null;
  location: { latitude: number; longitude: number } | null;
  date: string | null;
  type: Event["type"];
  external_link: string | null;
  races: RaceRow[] | null;
};

/**
 * Maps a raw Supabase row into the domain `Event` shape used by the app.
 *
 * @param row - Raw event row returned by Supabase.
 * @return The normalized `Event` object used by the UI.
 */
function mapEventRow(row: EventRow): Event {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    location: row.location ?? undefined,
    date: row.date ?? undefined,
    type: row.type,
    externalLink: row.external_link ?? undefined,
    races: (row.races ?? []).map((race) => ({
      id: race.id,
      name: race.name,
      distanceMeters: race.distance_meters,
      elevationGainMeters: race.elevation_gain_meters ?? undefined,
      startTime: race.start_time ?? undefined,
      difficulty:
        race.difficulty &&
        RACE_DIFFICULTIES.includes(race.difficulty as RaceDifficulty)
          ? (race.difficulty as RaceDifficulty)
          : undefined,
    })),
  };
}

/**
 * Fetches all events with their races from Supabase, ordered by date ascending.
 *
 * @return List of events with nested races.
 */
export async function fetchEvents(): Promise<Event[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      name,
      description,
      location,
      date,
      type,
      external_link,
      races (
        id,
        name,
        distance_meters,
        elevation_gain_meters,
        start_time,
        difficulty
      )
    `,
    )
    .order("date", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return (data ?? []).map(mapEventRow);
}

/**
 * Fetches a single event (including races) by ID.
 * Returns null if no event exists with the provided ID.
 *
 * @param eventId - Event identifier to look up.
 * @return The event with nested races, or null if not found.
 */
export async function fetchEventById(eventId: string): Promise<Event | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      name,
      description,
      location,
      date,
      type,
      external_link,
      races (
        id,
        name,
        distance_meters,
        elevation_gain_meters,
        start_time,
        difficulty
      )
    `,
    )
    .eq("id", eventId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch event: ${error.message}`);
  }

  if (!data) return null;
  return mapEventRow(data as EventRow);
}
