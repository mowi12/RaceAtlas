"use client";

import { useMemo, useState } from "react";
import { adminDeleteAction } from "@/lib/actions/admin";
import { Button } from "@/lib/components/primitives/button";
import { Label } from "@/lib/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/primitives/select";

type AdminDeleteFormProps = {
  locale: string;
  eventOptions: Array<{ id: string; label: string }>;
  raceOptions: Array<{ id: string; label: string }>;
};

export function AdminDeleteForm({
  locale,
  eventOptions,
  raceOptions,
}: AdminDeleteFormProps) {
  const [kind, setKind] = useState<"event" | "race">("event");
  const [eventId, setEventId] = useState("");
  const [raceId, setRaceId] = useState("");
  const canSubmit = useMemo(
    () => (kind === "event" ? Boolean(eventId) : Boolean(raceId)),
    [kind, eventId, raceId],
  );

  return (
    <form action={adminDeleteAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="delete_kind" value={kind} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Delete *</Label>
          <Select
            value={kind}
            onValueChange={(value) => setKind(value as "event" | "race")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="race">Race</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {kind === "event" ? (
          <div className="space-y-2">
            <Label>Event *</Label>
            <input type="hidden" name="event_id" value={eventId} />
            <Select
              value={eventId}
              onValueChange={(value) => setEventId(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {eventOptions.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Race *</Label>
            <input type="hidden" name="race_id" value={raceId} />
            <Select value={raceId} onValueChange={(value) => setRaceId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                {raceOptions.map((race) => (
                  <SelectItem key={race.id} value={race.id}>
                    {race.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
        Deleting an event will also delete all associated races.
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="destructive" disabled={!canSubmit}>
          Delete
        </Button>
      </div>
    </form>
  );
}
