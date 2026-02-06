import { Badge } from "@/lib/components/primitives/badge";
import type { Event } from "@/lib/types/event";

type EventTypeBadgeProps = {
  eventType: Event["type"];
};

export const eventTypeBadgeStyles: Record<Event["type"], string> = {
  FunRun:
    "border-yellow-200 bg-yellow-100 text-yellow-900 dark:border-yellow-500/40 dark:bg-yellow-500/20 dark:text-yellow-100",
  TrailRun:
    "border-green-200 bg-green-100 text-green-900 dark:border-green-500/40 dark:bg-green-500/20 dark:text-green-100",
  RoadRace:
    "border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-100",
  Ultra:
    "border-red-200 bg-red-100 text-red-900 dark:border-red-500/40 dark:bg-red-500/20 dark:text-red-100",
};

export function EventTypeBadge({ eventType }: EventTypeBadgeProps) {
  return <Badge className={eventTypeBadgeStyles[eventType]}>{eventType}</Badge>;
}
