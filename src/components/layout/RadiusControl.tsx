"use client";

import { SnapSlider, type SnapStop } from "@/components/ui/SnapSlider";

interface RadiusControlProps {
  /** Controlled value. Omit to use the component uncontrolled. */
  value?: number;
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  /** Fires continuously as the radius changes (e.g. mid-drag). */
  onChange?: (value: number) => void;
  /** Fires once on release — wire searches here, not onChange. */
  onCommit?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const RADIUS_STOPS: SnapStop[] = [
  { value: 0, position: 0 },
  { value: 100, position: 12 },
  { value: 250, position: 30 },
  { value: 500, position: 62 },
  { value: 1000, position: 100 },
];

export function RadiusControl({
  defaultValue = 500,
  ...props
}: RadiusControlProps) {
  return (
    <SnapSlider
      stops={RADIUS_STOPS}
      defaultValue={defaultValue}
      label="RADIUS"
      formatValue={(v) => `${v} KM`}
      {...props}
    />
  );
}
