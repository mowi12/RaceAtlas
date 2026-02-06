"use client";

import { useState } from "react";
import { AdminAddRaceForm } from "@/lib/components/composites/admin/admin-add-race-form";
import { AdminAuthDialog } from "@/lib/components/composites/admin/admin-auth-dialog";
import { AdminDeleteForm } from "@/lib/components/composites/admin/admin-delete-form";
import { AdminEventForm } from "@/lib/components/composites/admin/admin-event-form";
import { AdminModeToggle } from "@/lib/components/composites/admin/admin-mode-toggle";
import { AdminStatus } from "@/lib/components/composites/admin/admin-status";
import { ScrollArea } from "@/lib/components/primitives/scroll-area";

type AdminPageProps = {
  locale: string;
  isAuthenticated: boolean;
  status?: string;
  message?: string;
  eventOptions: Array<{ id: string; label: string }>;
  raceOptions: Array<{ id: string; label: string }>;
};

export function AdminPage({
  locale,
  isAuthenticated,
  status,
  message,
  eventOptions,
  raceOptions,
}: AdminPageProps) {
  const [mode, setMode] = useState<"event" | "race" | "delete">("event");

  return (
    <ScrollArea className="h-full p-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">Admin</p>
          <h1 className="text-2xl font-semibold">
            {mode === "event"
              ? "Add Event"
              : mode === "race"
                ? "Add Race"
                : "Delete"}
          </h1>
        </header>

        <AdminStatus status={status} message={message} />

        {!isAuthenticated ? <AdminAuthDialog locale={locale} /> : null}

        {isAuthenticated ? (
          <div className="space-y-6">
            <AdminModeToggle mode={mode} onChange={setMode} />
            {mode === "event" ? (
              <AdminEventForm locale={locale} />
            ) : mode === "race" ? (
              <AdminAddRaceForm locale={locale} eventOptions={eventOptions} />
            ) : (
              <AdminDeleteForm
                locale={locale}
                eventOptions={eventOptions}
                raceOptions={raceOptions}
              />
            )}
          </div>
        ) : null}
      </div>
    </ScrollArea>
  );
}
