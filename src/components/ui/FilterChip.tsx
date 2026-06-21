import { Toggle } from "radix-ui";
import type React from "react";
import { cn, focusRing } from "@/lib/utils";

interface FilterChipProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function FilterChip({
  active = false,
  onClick,
  children,
  className,
}: FilterChipProps) {
  return (
    <Toggle.Root
      pressed={active}
      onPressedChange={() => onClick?.()}
      className={cn(
        "inline-block px-3 py-1.5 font-mono text-[10px] tracking-[1.5px] border whitespace-nowrap transition-colors cursor-pointer",
        focusRing,
        active
          ? "bg-primary text-primary-foreground border-primary hover:opacity-90"
          : "bg-background text-foreground border-foreground hover:bg-card",
        className,
      )}
    >
      {children}
    </Toggle.Root>
  );
}
