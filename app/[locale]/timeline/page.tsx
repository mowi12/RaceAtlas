import { getTranslations } from "next-intl/server";
import { TimelineView } from "@/lib/components/composites/timeline/timeline-view";
import { fetchEvents } from "@/lib/data/events";

export const dynamic = "force-dynamic";

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const events = await fetchEvents();
  const t = await getTranslations({ locale, namespace: "Navigation" });
  const tTimeline = await getTranslations({ locale, namespace: "Timeline" });

  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 overflow-hidden">
      <section className="mx-auto flex w-full min-h-0 flex-1 flex-col gap-4">
        <header className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{t("timeline")}</p>
          <h1 className="text-2xl font-semibold">{tTimeline("title")}</h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <TimelineView events={events} />
        </div>
      </section>
    </main>
  );
}
