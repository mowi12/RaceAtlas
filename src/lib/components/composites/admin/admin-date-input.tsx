"use client";

import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Button } from "@/lib/components/primitives/button";
import { Calendar } from "@/lib/components/primitives/calendar";
import { Input } from "@/lib/components/primitives/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/primitives/popover";

function formatDate(date: Date, locale: string) {
  const formatted = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
  return locale.startsWith("de") ? formatted.replace(/\.$/, "") : formatted;
}

type AdminDatePickerProps = {
  value: string;
  onChangeAction: (value: string) => void;
  locale: string;
  placeholder: string;
};

export function AdminDatePicker({
  value,
  onChangeAction,
  locale,
  placeholder,
}: AdminDatePickerProps) {
  const calendarLocale = locale.startsWith("de") ? de : enUS;
  const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;
  const formatted = selectedDate
    ? formatDate(selectedDate, locale)
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          {formatted}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            onChangeAction(date ? format(date, "yyyy-MM-dd") : "");
          }}
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
  );
}

type AdminDateTimePickerProps = {
  value: string;
  onChangeAction: (value: string) => void;
  locale: string;
  datePlaceholder: string;
  timePlaceholder: string;
};

export function AdminDateTimePicker({
  value,
  onChangeAction,
  locale,
  datePlaceholder,
  timePlaceholder,
}: AdminDateTimePickerProps) {
  const calendarLocale = locale.startsWith("de") ? de : enUS;
  const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const monthFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const [datePart = "", timePart = ""] = value.split("T");
  const [timeValue, setTimeValue] = useState(timePart);
  const isGerman = locale.startsWith("de");
  const selectedDate = datePart ? new Date(`${datePart}T00:00:00`) : undefined;
  const formatted = selectedDate
    ? formatDate(selectedDate, locale)
    : datePlaceholder;

  useEffect(() => {
    setTimeValue(timePart);
  }, [timePart]);

  function handleTimeChange(nextValue: string) {
    setTimeValue(nextValue);
    if (!datePart) return;
    if (!nextValue) {
      onChangeAction(datePart);
      return;
    }
    if (isGerman) {
      if (/^([01]\\d|2[0-3]):[0-5]\\d$/.test(nextValue)) {
        onChangeAction(`${datePart}T${nextValue}`);
      }
      return;
    }
    const normalized = nextValue.trim();
    if (/^([01]\\d|2[0-3]):[0-5]\\d$/.test(normalized)) {
      onChangeAction(`${datePart}T${normalized}`);
    }
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start md:w-auto">
            {formatted}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) {
                onChangeAction("");
                return;
              }
              const nextDate = format(date, "yyyy-MM-dd");
              const nextTime = timePart || "00:00";
              onChangeAction(`${nextDate}T${nextTime}`);
            }}
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
      <Input
        type={isGerman ? "text" : "time"}
        inputMode={isGerman ? "numeric" : undefined}
        value={timeValue}
        onChange={(e) => handleTimeChange(e.target.value)}
        placeholder={timePlaceholder}
        disabled={!datePart}
        className="w-full md:w-32"
        lang={locale}
        pattern={isGerman ? "^([01]\\d|2[0-3]):[0-5]\\d$" : undefined}
      />
    </div>
  );
}
