"use client";

import { Button } from "@/lib/components/primitives/button";

type AdminModeToggleProps = {
  mode: "event" | "race" | "delete";
  onChange: (mode: "event" | "race" | "delete") => void;
};

export function AdminModeToggle({ mode, onChange }: AdminModeToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border p-1">
      <Button
        type="button"
        variant={mode === "event" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChange("event")}
      >
        Create event
      </Button>
      <Button
        type="button"
        variant={mode === "race" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChange("race")}
      >
        Add race
      </Button>
      <Button
        type="button"
        variant={mode === "delete" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChange("delete")}
      >
        Delete
      </Button>
    </div>
  );
}
