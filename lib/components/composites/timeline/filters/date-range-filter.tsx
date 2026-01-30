"use client";

import { de, enUS } from "date-fns/locale";
import { useTranslations } from "next-intl";
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
  const formatted = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(date);
  return locale.startsWith("de") ? formatted.replace(/\.$/, "") : formatted;
}

export function DateRangeFilter({
  value,
  onChange,
  onClear,
  locale,
}: DateRangeFilterProps) {
  const t = useTranslations("Timeline");
  const hasSelection = Boolean(value?.from || value?.to);
  const calendarLocale = locale.startsWith("de") ? de : enUS;
  const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const formatted =
    value?.from && value?.to
      ? `${formatDate(value.from, locale)} - ${formatDate(value.to, locale)}`
      : value?.from
        ? formatDate(value.from, locale)
        : t("filters.dateRange.placeholder");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {t("filters.dateRange.label")}
        </span>
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            disabled={!hasSelection}
            className="text-xs text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("filters.dateRange.clear")}
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
            locale={calendarLocale}
            formatters={{
              formatWeekdayName: (date) =>
                dateFormatter.format(date).replace(/\.$/, ""),
              formatMonthCaption: (date) =>
                monthFormatter.format(date).replace(/\.$/, ""),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
