"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/lib/components/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/primitives/popover";
import type { EventType } from "@/lib/types/event";

type EventTypeFilterProps = {
  value: EventType[];
  onChangeAction: (next: EventType[]) => void;
  options: EventType[];
  onClearAction?: () => void;
};

export function EventTypeFilter({
  value,
  onChangeAction,
  options,
  onClearAction,
}: EventTypeFilterProps) {
  const t = useTranslations("Timeline");
  const selected = new Set(value);
  const label =
    value.length > 0
      ? t("filters.eventTypes.buttonSelected", { count: value.length })
      : t("filters.eventTypes.button");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {t("filters.eventTypes.label")}
        </span>
        {onClearAction ? (
          <button
            type="button"
            onClick={onClearAction}
            disabled={value.length === 0}
            className="text-xs text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("filters.eventTypes.clear")}
          </button>
        ) : null}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-55">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selected.has(option);
              return (
                <Button
                  key={option}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  aria-pressed={isSelected}
                  onClick={() => {
                    const next = isSelected
                      ? value.filter((item) => item !== option)
                      : [...value, option];
                    onChangeAction(next);
                  }}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
