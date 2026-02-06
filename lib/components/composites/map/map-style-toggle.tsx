"use client";

import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/lib/components/primitives/button";

type MapStyleToggleProps<Id extends string> = {
  label?: string;
  options: ReadonlyArray<{ id: Id; label: string }>;
  value: Id;
  onChangeAction: Dispatch<SetStateAction<Id>>;
};

export function MapStyleToggle<Id extends string>({
  label = "Style",
  options,
  value,
  onChangeAction,
}: MapStyleToggleProps<Id>) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background/90 px-2 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur">
      <span className="px-1 text-muted-foreground">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-border">
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <Button
              key={option.id}
              onClick={() => onChangeAction(option.id)}
              variant={isActive ? "default" : "ghost"}
              size="xs"
              className={[
                "rounded-none px-2 text-xs font-medium",
                isActive ? "" : "text-foreground",
              ].join(" ")}
              aria-pressed={isActive}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
