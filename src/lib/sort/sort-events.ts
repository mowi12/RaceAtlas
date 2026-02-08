import type { Event } from "@/lib/types/event";

export function sortEventsByDate(events: Event[]) {
  return [...events].sort((a, b) => {
    const aDate = a.date
      ? new Date(`${a.date}T00:00:00`).getTime()
      : Number.POSITIVE_INFINITY;
    const bDate = b.date
      ? new Date(`${b.date}T00:00:00`).getTime()
      : Number.POSITIVE_INFINITY;
    return aDate - bDate;
  });
}
