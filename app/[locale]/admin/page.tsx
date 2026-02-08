import { isAdminAuthenticated } from "@/lib/auth/admin";
import { AdminPage } from "@/lib/components/composites/admin/admin-page";
import { fetchEvents } from "@/lib/data/events";
import { getLocalizedText } from "@/lib/i18n/localized-text";

export const dynamic = "force-dynamic";

export default async function AdminRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  const { locale } = await params;
  const { status, message } = await searchParams;
  const isAuthenticated = await isAdminAuthenticated();
  const events = await fetchEvents();
  const eventOptions = events.map((event) => ({
    id: event.id,
    label: getLocalizedText(event.name, locale),
  }));
  const raceOptions = events.flatMap((event) => {
    const eventLabel = getLocalizedText(event.name, locale);
    return event.races.map((race) => ({
      id: race.id,
      label: `${eventLabel} — ${getLocalizedText(race.name, locale)}`,
    }));
  });

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <AdminPage
        locale={locale}
        isAuthenticated={isAuthenticated}
        status={status}
        message={message}
        eventOptions={eventOptions}
        raceOptions={raceOptions}
      />
    </main>
  );
}
