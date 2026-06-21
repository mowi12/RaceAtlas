import type React from "react";
import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("border border-border bg-card text-foreground", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-border p-5",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("font-display text-h3 font-bold leading-tight", className)}
      {...props}
    />
  );
}

export function CardEyebrow({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "font-mono text-micro font-bold uppercase tracking-[2px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-border p-5",
        className,
      )}
      {...props}
    />
  );
}
