import type React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";

interface FieldProps {
  label?: React.ReactNode;
  /** Associates the label with the control and namespaces the helper/error id. */
  htmlFor?: string;
  helper?: React.ReactNode;
  /** When set, replaces the helper text and renders in the destructive color. */
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Layout wrapper that stacks a Label, a control, and one line of helper/error
 * text. Consumers wire `aria-describedby={`${htmlFor}-desc`}` on the control to
 * announce the message.
 */
export function Field({
  label,
  htmlFor,
  helper,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const descId = htmlFor ? `${htmlFor}-desc` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {(error || helper) && (
        <p
          id={descId}
          className={cn(
            "font-body text-caption",
            error ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  );
}
