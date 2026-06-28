import type { CSSProperties } from "react";
import { formatDistance } from "@/lib/distance";
import { cn } from "@/lib/utils";

export type EventSurface = "road" | "trail" | "mixed";
export type CapacityState = "open" | "waitlist" | "full";
export type BadgeDifficulty = "Easy" | "Medium" | "Hard" | "Extreme";

interface SurfaceBadgeProps {
  variant: "surface";
  value: EventSurface;
  className?: string;
}

interface CapacityBadgeProps {
  variant: "capacity";
  value: CapacityState;
  className?: string;
}

interface DistanceBadgeProps {
  variant: "distance";
  /** Raw distance in meters — the label (Marathon/Half/Ultra·NK/NK/Nm) is derived from this. */
  value: number;
  className?: string;
}

interface DifficultyBadgeProps {
  variant: "difficulty";
  value: BadgeDifficulty;
  className?: string;
}

type BadgeProps =
  | SurfaceBadgeProps
  | CapacityBadgeProps
  | DistanceBadgeProps
  | DifficultyBadgeProps;

const surfaceMeta: Record<
  "road" | "trail",
  { label: string; color: string; classes: string }
> = {
  road: {
    label: "ROAD",
    color: "var(--primary)",
    classes: "bg-primary text-primary-foreground",
  },
  trail: {
    label: "TRAIL",
    color: "var(--warning)",
    classes: "bg-warning text-warning-foreground",
  },
};

const capacityConfig: Record<
  CapacityState,
  { label: string; classes: string }
> = {
  open: {
    label: "OPEN",
    classes: "bg-transparent text-foreground border border-foreground",
  },
  waitlist: {
    label: "WAITLIST",
    classes: "bg-warning text-warning-foreground",
  },
  full: { label: "FULL", classes: "bg-primary text-primary-foreground" },
};

const difficultyConfig: Record<
  BadgeDifficulty,
  { label: string; classes: string }
> = {
  Easy: { label: "EASY", classes: "bg-success text-success-foreground" },
  Medium: { label: "MEDIUM", classes: "bg-caution text-caution-foreground" },
  Hard: { label: "HARD", classes: "bg-warning text-warning-foreground" },
  Extreme: {
    label: "EXTREME",
    classes: "bg-destructive text-destructive-foreground",
  },
};

const distanceClasses = "bg-transparent text-foreground border border-border";

function renderSurface(value: EventSurface): {
  label: string;
  classes: string;
  style?: CSSProperties;
} {
  if (value === "mixed") {
    return {
      label: "MIXED",
      classes: "text-background",
      style: {
        backgroundImage: `repeating-linear-gradient(-45deg, ${surfaceMeta.road.color} 0 6px, ${surfaceMeta.trail.color} 6px 12px)`,
      },
    };
  }
  return {
    label: surfaceMeta[value].label,
    classes: surfaceMeta[value].classes,
  };
}

function resolveBadge(props: BadgeProps): {
  label: string;
  classes: string;
  style?: CSSProperties;
} {
  if (props.variant === "surface") return renderSurface(props.value);
  if (props.variant === "capacity") return capacityConfig[props.value];
  if (props.variant === "difficulty") return difficultyConfig[props.value];
  return { label: formatDistance(props.value), classes: distanceClasses };
}

export function Badge(props: BadgeProps) {
  const { className } = props;
  const { label, classes: variantClasses, style } = resolveBadge(props);

  return (
    <span
      style={style}
      className={cn(
        "inline-block font-mono text-micro font-bold tracking-[2px] px-2 py-0.5",
        variantClasses,
        className,
      )}
    >
      {label}
    </span>
  );
}
