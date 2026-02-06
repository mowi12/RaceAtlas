import { notFound } from "next/navigation";
import { fetchEventById } from "@/lib/data/events";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import { cn } from "@/lib/utils/shadcn-helper";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; eventId: string }>;
};

function getNoDescriptionLabel(locale: string) {
  if (locale.startsWith("de")) {
    return "Keine Beschreibung vorhanden.";
  }
  return "No description available.";
}

export default async function EventDetailPage({ params }: Props) {
  const { eventId, locale } = await params;

  const event = await fetchEventById(eventId);
  if (!event) notFound();

  const name = getLocalizedText(event.name, locale);
  const description = getLocalizedText(event.description, locale);
  const descriptionText = description || getNoDescriptionLabel(locale);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p
        className={cn(
          "mt-2 text-muted-foreground",
          !description ? "italic" : undefined,
        )}
      >
        {descriptionText}
      </p>

      <div className="mt-6 space-y-2">
        <div>
          <span className="font-medium">Date:</span> {event.date ?? "—"}
        </div>
        <div>
          <span className="font-medium">Type:</span> {event.type}
        </div>
        <div>
          <span className="font-medium">Races:</span> {event.races.length}
        </div>
      </div>
    </main>
  );
}
