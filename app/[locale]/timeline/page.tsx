import { getTranslations } from "next-intl/server";
import { TimelineView } from "@/lib/components/composites/timeline/timeline-view";

export default async function TimelinePage() {
  const t = await getTranslations("Navigation");

  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 overflow-hidden">
      <section className="mx-auto flex w-full min-h-0 flex-1 flex-col gap-4">
        <header className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{t("timeline")}</p>
          <h1 className="text-2xl font-semibold">Upcoming races</h1>
        </header>

        <div className="min-h-0 flex-1">
          <TimelineView />
        </div>
      </section>
    </main>
  );
}
