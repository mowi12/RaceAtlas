"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/lib/components/primitives/input";

type TextSearchFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TextSearchFilter({ value, onChange }: TextSearchFilterProps) {
  const t = useTranslations("Timeline");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {t("filters.search.label")}
        </span>
      </div>
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("filters.search.placeholder")}
      />
    </div>
  );
}
