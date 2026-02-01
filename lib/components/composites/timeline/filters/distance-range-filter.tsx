"use client";

import { useTranslations } from "next-intl";
import { Slider } from "@/lib/components/primitives/slider";

type DistanceRangeFilterProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  disabled?: boolean;
};

export function DistanceRangeFilter({
  min,
  max,
  value,
  onChange,
  disabled,
}: DistanceRangeFilterProps) {
  const t = useTranslations("Timeline");

  return (
    <div className="flex flex-col gap-4.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">{t("filters.distance.label")}</span>
        <div className="flex items-center gap-2">
          <span>
            {value[0]} - {value[1]}
          </span>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={(next) => onChange([next[0], next[1]])}
        disabled={disabled}
      />
    </div>
  );
}
