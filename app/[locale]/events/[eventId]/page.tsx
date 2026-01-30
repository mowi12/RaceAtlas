import { notFound } from "next/navigation";
import { exampleEvents } from "@/lib/data/example-events";

type Props = {
  params: Promise<{ locale: string; eventId: string }>;
};

export function generateStaticParams() {
  return exampleEvents.map((e) => ({ eventId: e.id }));
}

export default async function EventDetailPage({ params }: Props) {
  const { eventId } = await params;

  const event = exampleEvents.find((e) => e.id === eventId);
  if (!event) notFound();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold">{event.name}</h1>
      {event.description ? (
        <p className="mt-2 text-muted-foreground">{event.description}</p>
      ) : null}

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
