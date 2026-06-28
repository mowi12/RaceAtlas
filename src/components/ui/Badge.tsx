import { cn } from "@/lib/utils";

export type EventSurface = "road" | "trail" | "mixed";
export type CapacityState = "open" | "waitlist" | "full";

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
  value: string;
  className?: string;
}

type BadgeProps = SurfaceBadgeProps | CapacityBadgeProps | DistanceBadgeProps;

const surfaceConfig: Record<EventSurface, { label: string; classes: string }> =
  {
    trail: { label: "TRAIL", classes: "bg-warning text-warning-foreground" },
    road: { label: "ROAD", classes: "bg-primary text-primary-foreground" },
    mixed: {
      label: "MIX",
      classes:
        "text-background bg-[repeating-linear-gradient(-45deg,var(--warning)_0_6px,var(--primary)_6px_12px)]",
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

const distanceClasses = "bg-transparent text-foreground border border-border";

export function Badge({ variant, value, className }: BadgeProps) {
  let label: string;
  let variantClasses: string;

  if (variant === "surface") {
    ({ label, classes: variantClasses } = surfaceConfig[value]);
  } else if (variant === "capacity") {
    ({ label, classes: variantClasses } = capacityConfig[value]);
  } else {
    label = value;
    variantClasses = distanceClasses;
  }

  return (
    <span
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
