import { Badge } from "@/lib/components/primitives/badge";
import type { Event } from "@/lib/types/event";

type EventTypeBadgeProps = {
  eventType: Event["type"];
};

const eventTypeBadgeStyles: Record<Event["type"], string> = {
  FunRun:
    "border-yellow-200 bg-yellow-100 text-yellow-900 dark:border-yellow-500/40 dark:bg-yellow-500/20 dark:text-yellow-100",
  TrailRun:
    "border-green-200 bg-green-100 text-green-900 dark:border-green-500/40 dark:bg-green-500/20 dark:text-green-100",
  RoadRace:
    "border-blue-200 bg-blue-100 text-blue-900 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-100",
  Ultra:
    "border-red-200 bg-red-100 text-red-900 dark:border-red-500/40 dark:bg-red-500/20 dark:text-red-100",
  ObstacleRun:
    "border-orange-200 bg-orange-100 text-orange-900 dark:border-orange-500/40 dark:bg-orange-500/20 dark:text-orange-100",
  StairRun:
    "border-violet-200 bg-violet-100 text-violet-900 dark:border-violet-500/40 dark:bg-violet-500/20 dark:text-violet-100",
  Challenge:
    "border-teal-200 bg-teal-100 text-teal-900 dark:border-teal-500/40 dark:bg-teal-500/20 dark:text-teal-100",
};

export function EventTypeBadge({ eventType }: EventTypeBadgeProps) {
  return <Badge className={eventTypeBadgeStyles[eventType]}>{eventType}</Badge>;
}
