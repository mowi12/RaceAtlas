"use client";

import { useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EventTypeBadge } from "@/lib/components/composites/badges/event-type-badge";
import { MapView } from "@/lib/components/composites/map/map-view";
import { Button } from "@/lib/components/primitives/button";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import { Link } from "@/lib/i18n/navigation";
import { useEventStore } from "@/lib/store/event-store";
import type { Event } from "@/lib/types/event";

type DistanceOption = {
  meters: number;
  label: string;
};

function parseLocalDate(value?: string) {
  if (!value || !value.trim()) return undefined;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function formatFullDate(value: string | undefined, locale: string) {
  if (!value || !value.trim()) return undefined;
  const date = parseLocalDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDistanceLabel(distanceMeters: number) {
  const kilometers = distanceMeters / 1000;
  if (Number.isInteger(kilometers)) {
    return `${kilometers}K`;
  }
  return `${kilometers.toFixed(1)}K`;
}

function getDistanceOptions(event: Event): DistanceOption[] {
  const unique = Array.from(
    new Set(event.races.map((race) => race.distanceMeters)),
  ).sort((a, b) => b - a);

  return unique.map((meters) => ({
    meters,
    label: formatDistanceLabel(meters),
  }));
}

export function MapPageView() {
  const locale = useLocale();
  const events = useEventStore((state) => state.events);
  const [selectedEventId, setSelectedEventId] = useState<Event["id"] | null>(
    null,
  );
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId],
  );
  const distanceOptions = useMemo(
    () => (selectedEvent ? getDistanceOptions(selectedEvent) : []),
    [selectedEvent],
  );
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedEvent) {
      setSelectedDistance(null);
      return;
    }
    setSelectedDistance(distanceOptions[0]?.meters ?? null);
  }, [selectedEvent, distanceOptions]);

  const noDescriptionLabel = locale.startsWith("de")
    ? "Keine Beschreibung vorhanden."
    : "No description available.";

  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 overflow-hidden">
      <section className="mx-auto flex w-full min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex min-h-0 flex-4 flex-col overflow-hidden rounded-md border border-border bg-card/50">
            <MapView
              events={events}
              locale={locale}
              onEventSelectAction={setSelectedEventId}
            />
          </div>
          <aside className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-card/50 p-4">
            {selectedEvent ? (
              <div className="flex h-full flex-col">
                <header className="flex flex-col gap-1">
                  <EventTypeBadge eventType={selectedEvent.type} />
                  <h2 className="text-xl font-semibold">
                    {getLocalizedText(selectedEvent.name, locale)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {formatFullDate(selectedEvent.date, locale) ?? (
                      <span className="italic">No date available</span>
                    )}
                  </p>
                </header>

                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  Choose distance
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {distanceOptions.map((option) => (
                    <Button
                      key={option.meters}
                      type="button"
                      size="lg"
                      variant={
                        selectedDistance === option.meters
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-center"
                      onClick={() => setSelectedDistance(option.meters)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Description
                  </span>
                  <p className="text-sm text-foreground">
                    {getLocalizedText(selectedEvent.description, locale) ? (
                      getLocalizedText(selectedEvent.description, locale)
                    ) : (
                      <span className="italic text-muted-foreground">
                        {noDescriptionLabel}
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-6">
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/events/${selectedEvent.id}`}>
                      Full event details
                    </Link>
                  </Button>
                  {selectedEvent.externalLink ? (
                    <Button asChild size="lg" variant="outline" className="w-full">
                      <a
                        href={selectedEvent.externalLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        External website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground italic">
                No event selected.
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
