"use client";

import { useLocale } from "next-intl";
import { TimelineList } from "@/lib/components/composites/timeline/timeline-list";
import { useEventStore } from "@/lib/store/event-store";

export function TimelineView() {
  const locale = useLocale();
  const events = useEventStore((state) => state.events);

  return <TimelineList events={events} locale={locale} />;
}
