import type React from "react";
import { cn } from "@/lib/utils";

/**
 * Loading placeholder. Size it with className (w-/h-). Sharp corners to match the
 * Cartograph look; uses the sunken surface so it reads as "not-yet-content".
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-secondary", className)}
      aria-hidden
      {...props}
    />
  );
}
