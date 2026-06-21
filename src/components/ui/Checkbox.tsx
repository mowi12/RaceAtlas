import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type React from "react";
import { cn, focusRing } from "@/lib/utils";

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center border border-foreground bg-background transition-colors",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
        focusRing,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === "indeterminate" ? (
          <span className="block h-0.5 w-2 bg-current" />
        ) : (
          <svg
            viewBox="0 0 12 12"
            className="size-3 fill-none stroke-current"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M2.5 6.5 5 9l4.5-5.5" strokeLinecap="square" />
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
