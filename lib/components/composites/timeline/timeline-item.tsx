import { ChevronRight } from "lucide-react";
import { EventDistancesBadge } from "@/lib/components/composites/badges/event-distances-badge";
import { EventTypeBadge } from "@/lib/components/composites/badges/event-type-badge";
import { TimelineItemDateIcon } from "@/lib/components/composites/timeline/timeline-item-date-icon";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/lib/components/primitives/item";
import { Link } from "@/lib/i18n/navigation";
import type { Event } from "@/lib/types/event";

type TimelineItemProps = {
  event: Event;
  locale: string;
};

const dateStyles: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  weekday: "short",
};

function parseLocalDate(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
}

function stripTrailingDot(value: string, locale: string) {
  if (!value) return value;
  if (locale.startsWith("de")) {
    return value.replace(/\.$/, "");
  }
  return value;
}

function formatShortDate(date: Date, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, dateStyles);

  return formatter.formatToParts(date).reduce(
    (parts, part) => {
      if (part.type === "day") parts.day = part.value;
      if (part.type === "month") {
        parts.month = stripTrailingDot(part.value, locale);
      }
      if (part.type === "weekday") {
        parts.weekday = stripTrailingDot(part.value, locale);
      }
      return parts;
    },
    { weekday: "", month: "", day: "" },
  );
}

function formatDistanceLabel(distanceMeters: number) {
  const kilometers = distanceMeters / 1000;
  if (Number.isInteger(kilometers)) {
    return `${kilometers}K`;
  }
  return `${kilometers.toFixed(1)}K`;
}

function getDistanceLabels(event: Event) {
  const unique = Array.from(
    new Set(event.races.map((race) => race.distanceMeters)),
  ).sort((a, b) => a - b);

  return unique.map(formatDistanceLabel);
}

export function TimelineItem({ event, locale }: TimelineItemProps) {
  const date = parseLocalDate(event.date);
  const dateParts = date ? formatShortDate(date, locale) : null;

  return (
    <Item variant="outline" className="gap-3 bg-card/50" asChild>
      <Link
        href={`/events/${event.id}`}
        className="has-[[data-block-card-hover]:hover]:hover:bg-card/50"
      >
        <ItemMedia>
          <TimelineItemDateIcon
            month={dateParts?.month}
            day={dateParts?.day}
            weekDay={dateParts?.weekday}
          />
        </ItemMedia>

        <ItemContent>
          <ItemHeader>
            <div className="flex items-center gap-2">
              <EventTypeBadge eventType={event.type} />
              <EventDistancesBadge distances={getDistanceLabels(event)} />
            </div>
          </ItemHeader>

          <ItemTitle>{event.name}</ItemTitle>
          {event.description ? (
            <ItemDescription>{event.description}</ItemDescription>
          ) : null}
        </ItemContent>

        <ItemActions>
          <ChevronRight className="text-muted-foreground transition-colors group-hover/item:text-foreground group-has-[[data-block-card-hover]:hover]/item:text-muted-foreground" />
        </ItemActions>
      </Link>
    </Item>
  );
}
