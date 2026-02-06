import { notFound } from "next/navigation";
import { realEvents } from "@/lib/data/real-events";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import { cn } from "@/lib/utils/shadcn-helper";

type Props = {
  params: Promise<{ locale: string; eventId: string }>;
};

export function generateStaticParams() {
  return realEvents.map((e) => ({ eventId: e.id }));
}

function getNoDescriptionLabel(locale: string) {
  if (locale.startsWith("de")) {
    return "Keine Beschreibung vorhanden.";
  }
  return "No description available.";
}

export default async function EventDetailPage({ params }: Props) {
  const { eventId, locale } = await params;

  const event = realEvents.find((e) => e.id === eventId);
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
