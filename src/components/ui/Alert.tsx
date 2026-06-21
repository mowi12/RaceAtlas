import type React from "react";
import { cn } from "@/lib/utils";

type AlertTone = "info" | "success" | "warning" | "destructive";

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: React.ReactNode;
  /** Optional leading glyph (kept as text to avoid an icon dependency). */
  icon?: React.ReactNode;
}

const toneClasses: Record<AlertTone, { bar: string; icon: string }> = {
  info: { bar: "border-l-foreground", icon: "text-foreground" },
  success: { bar: "border-l-success", icon: "text-success" },
  warning: { bar: "border-l-warning", icon: "text-warning" },
  destructive: { bar: "border-l-destructive", icon: "text-destructive" },
};

export function Alert({
  tone = "info",
  title,
  icon,
  className,
  children,
  ...props
}: AlertProps) {
  const t = toneClasses[tone];
  return (
    <div
      role={tone === "destructive" ? "alert" : "status"}
      className={cn(
        "flex items-center gap-3 border border-l-4 border-border bg-card p-4",
        t.bar,
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={cn("shrink-0 font-mono text-body-sm", t.icon)}>
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1">
        {title && (
          <div className="font-mono text-label font-bold uppercase tracking-[1.5px] text-foreground">
            {title}
          </div>
        )}
        {children && (
          <div className="font-body text-body-sm text-foreground">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
