import { Slot } from "radix-ui";
import type React from "react";
import { cn, focusRing } from "@/lib/utils";
import { SpinnerIcon } from "./icons";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the child element instead of a <button> (e.g. an <a> for navigation CTAs). */
  asChild?: boolean;
  /** Shows a spinner and disables the button. Ignored when asChild (Slot takes one child). */
  loading?: boolean;
  /** Forwarded so Radix `asChild` triggers (Dialog, DropdownMenu) can manage focus. */
  ref?: React.Ref<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border-transparent hover:opacity-90",
  secondary:
    "bg-transparent text-foreground border-foreground hover:bg-primary hover:text-primary-foreground",
  ghost:
    "bg-card text-foreground border-transparent hover:bg-secondary hover:border-foreground",
  destructive:
    "bg-destructive text-destructive-foreground border-transparent hover:opacity-90 focus-visible:ring-destructive",
  outline:
    "bg-transparent text-foreground border-border hover:border-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label tracking-[0.06em]",
  md: "px-6 py-3.5 text-caption tracking-[0.06em]",
  lg: "px-8 py-4 text-body-sm tracking-[0.06em]",
};

export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const showSpinner = loading && !asChild;
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 border font-body font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        focusRing,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...(asChild
        ? {}
        : { disabled: disabled || loading, "aria-busy": loading || undefined })}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {showSpinner && <SpinnerIcon className="size-3.5 animate-spin" />}
          {children}
        </>
      )}
    </Comp>
  );
}
