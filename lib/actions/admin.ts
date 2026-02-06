"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSession, isAdminAuthenticated } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventType } from "@/lib/types/event";
import type { RaceDifficulty } from "@/lib/types/race";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

/**
 * Redirects to the admin page if the current request is not authenticated.
 *
 * @param locale - Active locale to keep users on the same localized route.
 */
async function requireAdmin(locale: string) {
  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin?status=unauthorized`);
  }
}

/**
 * Validates the admin password and establishes a signed session cookie.
 *
 * @param formData - Submitted form data with locale and password.
 */
export async function adminLoginAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const password = String(formData.get("password") ?? "");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    redirect(`/${locale}/admin?status=bad-password`);
  }

  await createAdminSession();
  redirect(`/${locale}/admin`);
}

/**
 * Creates or updates an event and its races.
 *
 * @param formData - Submitted form data for event and races.
 */
export async function adminCreateEventAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  await requireAdmin(locale);

  const eventId = String(formData.get("event_id") ?? "").trim();
  const eventNameEn = String(formData.get("event_name_en") ?? "").trim();
  const eventNameDe = String(formData.get("event_name_de") ?? "").trim();
  const eventDescriptionEn = String(
    formData.get("event_description_en") ?? "",
  ).trim();
  const eventDescriptionDe = String(
    formData.get("event_description_de") ?? "",
  ).trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
  const eventType = String(
    formData.get("event_type") ?? "",
  ).trim() as EventType;
  const eventExternal = String(
    formData.get("event_external_link") ?? "",
  ).trim();
  const eventLat = String(formData.get("event_latitude") ?? "").trim();
  const eventLng = String(formData.get("event_longitude") ?? "").trim();

  const raceIds = formData
    .getAll("race_id")
    .map((value) => String(value).trim());
  const raceNamesEn = formData
    .getAll("race_name_en")
    .map((value) => String(value).trim());
  const raceNamesDe = formData
    .getAll("race_name_de")
    .map((value) => String(value).trim());
  const raceDistancesRaw = formData
    .getAll("race_distance")
    .map((value) => String(value).trim());
  const raceElevations = formData
    .getAll("race_elevation")
    .map((value) => String(value).trim());
  const raceStarts = formData
    .getAll("race_start_time")
    .map((value) => String(value).trim());
  const raceDifficulties = formData
    .getAll("race_difficulty")
    .map((value) => String(value).trim() as RaceDifficulty | "");

  if (
    !eventId ||
    !eventNameEn ||
    !eventNameDe ||
    !eventDate ||
    !eventType ||
    raceIds.length === 0
  ) {
    redirect(`/${locale}/admin?status=missing-required`);
  }

  const raceCount = Math.max(
    raceIds.length,
    raceNamesEn.length,
    raceNamesDe.length,
    raceDistancesRaw.length,
  );

  const races = [];
  for (let i = 0; i < raceCount; i += 1) {
    const id = raceIds[i] ?? "";
    const nameEn = raceNamesEn[i] ?? "";
    const nameDe = raceNamesDe[i] ?? "";
    const distanceRaw = raceDistancesRaw[i] ?? "";
    const distance = Number(distanceRaw);
    const elevationRaw = raceElevations[i] ?? "";
    const startTime = raceStarts[i] ?? "";
    const difficulty = raceDifficulties[i] ?? "";

    if (
      !id ||
      !nameEn ||
      !nameDe ||
      !distanceRaw ||
      !Number.isFinite(distance)
    ) {
      redirect(`/${locale}/admin?status=missing-required`);
    }

    races.push({
      id,
      event_id: eventId,
      name: { en: nameEn, de: nameDe },
      distance_meters: distance,
      elevation_gain_meters: elevationRaw ? Number(elevationRaw) : null,
      start_time: startTime || null,
      difficulty: difficulty || null,
    });
  }

  const location =
    eventLat && eventLng
      ? {
          latitude: Number(eventLat),
          longitude: Number(eventLng),
        }
      : null;

  if (
    location &&
    (!Number.isFinite(location.latitude) ||
      !Number.isFinite(location.longitude))
  ) {
    redirect(`/${locale}/admin?status=invalid-location`);
  }

  const supabase = createSupabaseAdminClient();

  const { error: eventError } = await supabase.from("events").upsert({
    id: eventId,
    name: { en: eventNameEn, de: eventNameDe },
    description:
      eventDescriptionEn || eventDescriptionDe
        ? { en: eventDescriptionEn, de: eventDescriptionDe }
        : null,
    location,
    date: eventDate,
    type: eventType,
    external_link: eventExternal || null,
  });

  if (eventError) {
    redirect(
      `/${locale}/admin?status=error&message=${encodeMessage(eventError.message)}`,
    );
  }

  const { error: raceError } = await supabase.from("races").upsert(races);

  if (raceError) {
    redirect(
      `/${locale}/admin?status=error&message=${encodeMessage(raceError.message)}`,
    );
  }

  revalidatePath(`/${locale}/timeline`);
  revalidatePath(`/${locale}/admin`);
  redirect(`/${locale}/admin?status=ok`);
}

/**
 * Adds or updates a single race for an existing event.
 *
 * @param formData - Submitted form data for the race and event_id.
 */
export async function adminAddRaceAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  await requireAdmin(locale);

  const eventId = String(formData.get("event_id") ?? "").trim();
  const raceId = String(formData.get("race_id") ?? "").trim();
  const raceNameEn = String(formData.get("race_name_en") ?? "").trim();
  const raceNameDe = String(formData.get("race_name_de") ?? "").trim();
  const raceDistanceRaw = String(formData.get("race_distance") ?? "").trim();
  const raceDistance = Number(raceDistanceRaw);
  const raceElevation = String(formData.get("race_elevation") ?? "").trim();
  const raceStart = String(formData.get("race_start_time") ?? "").trim();
  const raceDifficulty = String(formData.get("race_difficulty") ?? "").trim() as
    | RaceDifficulty
    | "";

  if (
    !eventId ||
    !raceId ||
    !raceNameEn ||
    !raceNameDe ||
    !raceDistanceRaw ||
    !Number.isFinite(raceDistance)
  ) {
    redirect(`/${locale}/admin?status=missing-required`);
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("races").upsert({
    id: raceId,
    event_id: eventId,
    name: { en: raceNameEn, de: raceNameDe },
    distance_meters: raceDistance,
    elevation_gain_meters: raceElevation ? Number(raceElevation) : null,
    start_time: raceStart || null,
    difficulty: raceDifficulty || null,
  });

  if (error) {
    redirect(
      `/${locale}/admin?status=error&message=${encodeMessage(error.message)}`,
    );
  }

  revalidatePath(`/${locale}/timeline`);
  revalidatePath(`/${locale}/admin`);
  redirect(`/${locale}/admin?status=ok`);
}

/**
 * Deletes an event (with cascading races) or a single race.
 *
 * @param formData - Submitted form data describing what to delete.
 */
export async function adminDeleteAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  await requireAdmin(locale);

  const kind = String(formData.get("delete_kind") ?? "");
  const eventId = String(formData.get("event_id") ?? "").trim();
  const raceId = String(formData.get("race_id") ?? "").trim();

  if (kind !== "event" && kind !== "race") {
    redirect(`/${locale}/admin?status=missing-required`);
  }

  const supabase = createSupabaseAdminClient();

  if (kind === "event") {
    if (!eventId) {
      redirect(`/${locale}/admin?status=missing-required`);
    }
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      redirect(
        `/${locale}/admin?status=error&message=${encodeMessage(error.message)}`,
      );
    }
  } else {
    if (!raceId) {
      redirect(`/${locale}/admin?status=missing-required`);
    }
    const { error } = await supabase.from("races").delete().eq("id", raceId);
    if (error) {
      redirect(
        `/${locale}/admin?status=error&message=${encodeMessage(error.message)}`,
      );
    }
  }

  revalidatePath(`/${locale}/timeline`);
  revalidatePath(`/${locale}/admin`);
  redirect(`/${locale}/admin?status=deleted`);
}
