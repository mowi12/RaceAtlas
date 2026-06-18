import type React from "react";
import { cn } from "@/lib/utils";

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
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border-transparent hover:opacity-90",
  secondary:
    "bg-transparent text-foreground border-foreground hover:bg-primary hover:text-primary-foreground",
  ghost:
    "bg-paper-2 text-foreground border-transparent hover:bg-paper-3 hover:border-foreground",
  destructive:
    "bg-destructive text-destructive-foreground border-transparent hover:opacity-90",
  outline: "bg-transparent text-foreground border-rule hover:border-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[11px] tracking-[0.06em]",
  md: "px-6 py-3.5 text-[13px] tracking-[0.06em]",
  lg: "px-8 py-4 text-[14px] tracking-[0.06em]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border font-body font-semibold transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
