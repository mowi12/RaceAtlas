import type React from "react";
import { cn } from "@/lib/utils";

export type EventSurface = "road" | "trail" | "mixed";
export type EventStatus = "open" | "waitlist" | "full";

interface SurfaceBadgeProps {
  variant: "surface";
  value: EventSurface;
  className?: string;
}

interface StatusBadgeProps {
  variant: "status";
  value: EventStatus;
  className?: string;
}

interface DistanceBadgeProps {
  variant: "distance";
  value: string;
  className?: string;
}

type BadgeProps = SurfaceBadgeProps | StatusBadgeProps | DistanceBadgeProps;

const surfaceConfig: Record<
  EventSurface,
  { label: string; style: React.CSSProperties }
> = {
  trail: {
    label: "TRAIL",
    style: { background: "var(--warm)", color: "var(--background)" },
  },
  road: {
    label: "ROAD",
    style: { background: "var(--primary)", color: "var(--primary-foreground)" },
  },
  mixed: {
    label: "MIX",
    style: {
      backgroundImage:
        "repeating-linear-gradient(-45deg, var(--warm) 0 6px, var(--primary) 6px 12px)",
      color: "var(--background)",
    },
  },
};

const statusConfig: Record<
  EventStatus,
  { label: string; style: React.CSSProperties }
> = {
  open: {
    label: "OPEN",
    style: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--foreground)",
    },
  },
  waitlist: {
    label: "WAITLIST",
    style: { background: "var(--warm)", color: "var(--background)" },
  },
  full: {
    label: "FULL",
    style: { background: "var(--primary)", color: "var(--primary-foreground)" },
  },
};

const distanceStyle: React.CSSProperties = {
  background: "transparent",
  color: "var(--foreground)",
  border: "1px solid var(--rule)",
};

export function Badge({ variant, value, className }: BadgeProps) {
  let label: string;
  let style: React.CSSProperties;

  if (variant === "surface") {
    ({ label, style } = surfaceConfig[value]);
  } else if (variant === "status") {
    ({ label, style } = statusConfig[value]);
  } else {
    label = value;
    style = distanceStyle;
  }

  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] font-bold tracking-[2px] px-2 py-0.5",
        className,
      )}
      style={style}
    >
      {label}
    </span>
  );
}
