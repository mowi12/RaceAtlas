import { MapView } from "@/lib/components/composites/map/map-view";

export default function MapPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 overflow-hidden">
      <section className="mx-auto flex w-full min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex min-h-0 flex-3 flex-col overflow-hidden rounded-md border border-border bg-card/50">
            <MapView />
          </div>
          <aside className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-card/50" />
        </div>
      </section>
    </main>
  );
}
