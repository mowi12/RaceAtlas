"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/lib/components/primitives/button";

type AdminModeToggleProps = {
  mode: "event" | "race" | "delete";
  onChangeAction: (mode: "event" | "race" | "delete") => void;
};

export function AdminModeToggle({
  mode,
  onChangeAction,
}: AdminModeToggleProps) {
  const t = useTranslations("Admin");
  return (
    <div className="inline-flex items-center gap-2 rounded-md border p-1">
      <Button
        type="button"
        variant={mode === "event" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChangeAction("event")}
      >
        {t("toggle.createEvent")}
      </Button>
      <Button
        type="button"
        variant={mode === "race" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChangeAction("race")}
      >
        {t("toggle.addRace")}
      </Button>
      <Button
        type="button"
        variant={mode === "delete" ? "default" : "ghost"}
        size="sm"
        className="rounded-md"
        onClick={() => onChangeAction("delete")}
      >
        {t("toggle.delete")}
      </Button>
    </div>
  );
}
