"use client";

import type { DateRange } from "react-day-picker";
import { Button } from "@/lib/components/primitives/button";
import { Calendar } from "@/lib/components/primitives/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/primitives/popover";

type DateRangeFilterProps = {
  value?: DateRange;
  onChange: (value?: DateRange) => void;
  onClear?: () => void;
  locale: string;
};

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function DateRangeFilter({
  value,
  onChange,
  onClear,
  locale,
}: DateRangeFilterProps) {
  const hasSelection = Boolean(value?.from || value?.to);
  const formatted =
    value?.from && value?.to
      ? `${formatDate(value.from, locale)} - ${formatDate(value.to, locale)}`
      : value?.from
        ? formatDate(value.from, locale)
        : "Pick dates";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Date Range
        </span>
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            disabled={!hasSelection}
            className="text-xs text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear
          </button>
        ) : null}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {formatted}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={value}
            onSelect={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
