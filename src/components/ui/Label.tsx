import { Label as LabelPrimitive } from "radix-ui";
import type React from "react";
import { cn } from "@/lib/utils";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Renders a lime marker after the text for required fields. */
  required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "font-mono text-micro font-bold uppercase tracking-[2px] text-muted-foreground",
        "peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </LabelPrimitive.Root>
  );
}
