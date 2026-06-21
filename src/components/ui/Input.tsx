import type React from "react";
import { cn, focusRing } from "@/lib/utils";

export const controlBase =
  "w-full border bg-background px-3 py-2 font-body text-body-sm text-foreground transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-50";

export function controlBorder(invalid?: boolean) {
  return invalid
    ? "border-destructive focus-visible:ring-destructive"
    : "border-input focus-visible:border-foreground";
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlBase, focusRing, controlBorder(invalid), className)}
      {...props}
    />
  );
}
