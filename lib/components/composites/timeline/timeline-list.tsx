import { TimelineItem } from "@/lib/components/composites/timeline/timeline-item";
import { ScrollArea } from "@/lib/components/primitives/scroll-area";
import { sortEventsByDate } from "@/lib/sort/sort-events";
import type { Event } from "@/lib/types/event";
import { cn } from "@/lib/utils/shadcn-helper";

type TimelineListProps = {
  events: Event[];
  locale: string;
  className?: string;
};

export function TimelineList({ events, locale, className }: TimelineListProps) {
  const sortedEvents = sortEventsByDate(events);

  return (
    <ScrollArea className={cn("h-full w-full rounded-md", className)}>
      <div className="space-y-1">
        {sortedEvents.map((event) => {
          return (
            <div key={event.id} className="flex flex-col">
              <TimelineItem event={event} locale={locale} />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
