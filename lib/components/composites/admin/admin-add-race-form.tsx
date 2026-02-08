"use client";

import { useMemo, useState } from "react";
import { adminAddRaceAction } from "@/lib/actions/admin";
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
import { RACE_DIFFICULTIES, type RaceDifficulty } from "@/lib/types/race";

const DIFFICULTIES: RaceDifficulty[] = [...RACE_DIFFICULTIES];

type AdminAddRaceFormProps = {
  locale: string;
  eventOptions: Array<{ id: string; label: string }>;
};

export function AdminAddRaceForm({
  locale,
  eventOptions,
}: AdminAddRaceFormProps) {
  const [addRaceEventId, setAddRaceEventId] = useState("");
  const [addRace, setAddRace] = useState({
    id: "",
    nameEn: "",
    nameDe: "",
    distance: "",
    elevation: "",
    startTime: "",
    difficulty: "" as RaceDifficulty | "",
  });

  const canSubmitAddRace = useMemo(
    () =>
      Boolean(
        addRaceEventId &&
          addRace.id &&
          addRace.nameEn &&
          addRace.nameDe &&
          addRace.distance.trim(),
      ),
    [addRaceEventId, addRace],
  );

  return (
    <form action={adminAddRaceAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Event *</Label>
          <input type="hidden" name="event_id" value={addRaceEventId} />
          <Select
            value={addRaceEventId}
            onValueChange={(value) => setAddRaceEventId(value)}
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
        <div className="space-y-2">
          <Label htmlFor="add-race-id">Race ID *</Label>
          <Input
            id="add-race-id"
            name="race_id"
            required
            value={addRace.id}
            onChange={(e) =>
              setAddRace((current) => ({ ...current, id: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="add-race-name-en">Name (EN) *</Label>
          <Input
            id="add-race-name-en"
            name="race_name_en"
            required
            value={addRace.nameEn}
            onChange={(e) =>
              setAddRace((current) => ({
                ...current,
                nameEn: e.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-race-name-de">Name (DE) *</Label>
          <Input
            id="add-race-name-de"
            name="race_name_de"
            required
            value={addRace.nameDe}
            onChange={(e) =>
              setAddRace((current) => ({
                ...current,
                nameDe: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="add-race-distance">Distance (meters) *</Label>
          <Input
            id="add-race-distance"
            name="race_distance"
            type="number"
            min="0"
            required
            value={addRace.distance}
            onChange={(e) =>
              setAddRace((current) => ({
                ...current,
                distance: e.target.value,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-race-elevation">Elevation gain (meters)</Label>
          <Input
            id="add-race-elevation"
            name="race_elevation"
            type="number"
            min="0"
            value={addRace.elevation}
            onChange={(e) =>
              setAddRace((current) => ({
                ...current,
                elevation: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="add-race-start">Start time</Label>
          <Input
            id="add-race-start"
            name="race_start_time_local"
            type="datetime-local"
            value={addRace.startTime}
            onChange={(e) =>
              setAddRace((current) => ({
                ...current,
                startTime: e.target.value,
              }))
            }
          />
          <input
            type="hidden"
            name="race_start_time"
            value={
              addRace.startTime ? new Date(addRace.startTime).toISOString() : ""
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <input
            type="hidden"
            name="race_difficulty"
            value={addRace.difficulty}
          />
          <Select
            value={addRace.difficulty}
            onValueChange={(value) =>
              setAddRace((current) => ({
                ...current,
                difficulty: value as RaceDifficulty,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmitAddRace}>
          Add race
        </Button>
      </div>
    </form>
  );
}
