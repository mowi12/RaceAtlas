"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { adminCreateEventAction } from "@/lib/actions/admin";
import {
  AdminDatePicker,
  AdminDateTimePicker,
} from "@/lib/components/composites/admin/admin-date-input";
import { Button } from "@/lib/components/primitives/button";
import { Input } from "@/lib/components/primitives/input";
import { Label } from "@/lib/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/primitives/select";
import { Separator } from "@/lib/components/primitives/separator";
import { Textarea } from "@/lib/components/primitives/textarea";
import { EVENT_TYPES, type EventType } from "@/lib/types/event";
import { RACE_DIFFICULTIES, type RaceDifficulty } from "@/lib/types/race";

const EVENT_TYPES_LIST: EventType[] = [...EVENT_TYPES];
const DIFFICULTIES: RaceDifficulty[] = [...RACE_DIFFICULTIES];

type AdminEventFormProps = {
  locale: string;
};

type RaceDraft = {
  key: string;
  id: string;
  nameEn: string;
  nameDe: string;
  distance: string;
  elevation: string;
  startTime: string;
  difficulty: RaceDifficulty | "";
};

function createRaceDraft(): RaceDraft {
  return {
    key: crypto.randomUUID(),
    id: "",
    nameEn: "",
    nameDe: "",
    distance: "",
    elevation: "",
    startTime: "",
    difficulty: "",
  };
}

export function AdminEventForm({ locale }: AdminEventFormProps) {
  const t = useTranslations("Admin");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [eventId, setEventId] = useState("");
  const [eventNameEn, setEventNameEn] = useState("");
  const [eventNameDe, setEventNameDe] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [races, setRaces] = useState<RaceDraft[]>([createRaceDraft()]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        eventId &&
          eventNameEn &&
          eventNameDe &&
          eventDate &&
          eventType &&
          races.length > 0 &&
          races.every(
            (race) =>
              race.id && race.nameEn && race.nameDe && race.distance.trim(),
          ),
      ),
    [eventId, eventNameEn, eventNameDe, eventDate, eventType, races],
  );

  function updateRace(index: number, updates: Partial<RaceDraft>) {
    setRaces((current) =>
      current.map((race, i) => (i === index ? { ...race, ...updates } : race)),
    );
  }

  function addRaceBlock() {
    setRaces((current) => [...current, createRaceDraft()]);
  }

  function removeRace(index: number) {
    setRaces((current) => current.filter((_, i) => i !== index));
  }

  return (
    <form action={adminCreateEventAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{t("event.sectionTitle")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="event-id">{t("event.id")}</Label>
            <Input
              id="event-id"
              name="event_id"
              required
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("event.date")}</Label>
            <input type="hidden" name="event_date" value={eventDate} />
            <AdminDatePicker
              value={eventDate}
              onChangeAction={setEventDate}
              locale={locale}
              placeholder={t("event.datePlaceholder")}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="event-name-en">{t("event.nameEn")}</Label>
            <Input
              id="event-name-en"
              name="event_name_en"
              required
              value={eventNameEn}
              onChange={(e) => setEventNameEn(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-name-de">{t("event.nameDe")}</Label>
            <Input
              id="event-name-de"
              name="event_name_de"
              required
              value={eventNameDe}
              onChange={(e) => setEventNameDe(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="event-description-en">
              {t("event.descriptionEn")}
            </Label>
            <Textarea
              id="event-description-en"
              name="event_description_en"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-description-de">
              {t("event.descriptionDe")}
            </Label>
            <Textarea
              id="event-description-de"
              name="event_description_de"
              rows={4}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("event.type")}</Label>
            <input type="hidden" name="event_type" value={eventType} />
            <Select
              value={eventType}
              onValueChange={(value) => setEventType(value as EventType)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("event.typePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES_LIST.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`event.types.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-external">{t("event.externalLink")}</Label>
            <Input id="event-external" name="event_external_link" type="url" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="event-lat">{t("event.latitude")}</Label>
            <Input
              id="event-lat"
              name="event_latitude"
              type="number"
              step="any"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-lng">{t("event.longitude")}</Label>
            <Input
              id="event-lng"
              name="event_longitude"
              type="number"
              step="any"
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{t("races.sectionTitle")}</h2>
        <div className="space-y-6">
          {races.map((race, index) => (
            <div key={race.key} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">
                  {t("races.title", { index: index + 1 })}
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRace(index)}
                  disabled={races.length === 1}
                >
                  {t("races.remove")}
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`race-id-${index}`}>{t("races.id")}</Label>
                  <Input
                    id={`race-id-${index}`}
                    name="race_id"
                    required
                    value={race.id}
                    onChange={(e) => updateRace(index, { id: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`race-distance-${index}`}>
                    {t("races.distance")}
                  </Label>
                  <Input
                    id={`race-distance-${index}`}
                    name="race_distance"
                    type="number"
                    min="0"
                    required
                    value={race.distance}
                    onChange={(e) =>
                      updateRace(index, { distance: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`race-name-en-${index}`}>
                    {t("races.nameEn")}
                  </Label>
                  <Input
                    id={`race-name-en-${index}`}
                    name="race_name_en"
                    required
                    value={race.nameEn}
                    onChange={(e) =>
                      updateRace(index, { nameEn: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`race-name-de-${index}`}>
                    {t("races.nameDe")}
                  </Label>
                  <Input
                    id={`race-name-de-${index}`}
                    name="race_name_de"
                    required
                    value={race.nameDe}
                    onChange={(e) =>
                      updateRace(index, { nameDe: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`race-elevation-${index}`}>
                    {t("races.elevation")}
                  </Label>
                  <Input
                    id={`race-elevation-${index}`}
                    name="race_elevation"
                    type="number"
                    min="0"
                    value={race.elevation}
                    onChange={(e) =>
                      updateRace(index, { elevation: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("races.startTime")}</Label>
                  <AdminDateTimePicker
                    value={race.startTime}
                    onChangeAction={(value) =>
                      updateRace(index, { startTime: value })
                    }
                    locale={locale}
                    datePlaceholder={t("races.startDatePlaceholder")}
                    timePlaceholder={t("races.startTimePlaceholder")}
                  />
                  <input
                    type="hidden"
                    name="race_start_time"
                    value={
                      race.startTime
                        ? new Date(race.startTime).toISOString()
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("races.difficulty")}</Label>
                <input
                  type="hidden"
                  name="race_difficulty"
                  value={race.difficulty}
                />
                <Select
                  value={race.difficulty}
                  onValueChange={(value) =>
                    updateRace(index, { difficulty: value as RaceDifficulty })
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("races.difficultyPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {t(`races.difficulties.${diff}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <Button type="button" variant="outline" onClick={addRaceBlock}>
          {t("races.addAnother")}
        </Button>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmit}>
          {t("event.submit")}
        </Button>
      </div>
    </form>
  );
}
