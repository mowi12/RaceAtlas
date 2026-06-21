import type React from "react";
import { cn } from "@/lib/utils";

interface StateBlockProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action area, e.g. a <Button>. */
  action?: React.ReactNode;
  /** Optional leading glyph (text, to avoid an icon dependency). */
  icon?: React.ReactNode;
  eyebrowClass?: string;
  className?: string;
}

function StateBlock({
  eyebrow,
  title,
  description,
  action,
  icon,
  eyebrowClass,
  className,
}: StateBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 border border-dashed border-border bg-card px-6 py-12 text-center",
        className,
      )}
    >
      {icon && <div className="text-h2 text-muted-foreground">{icon}</div>}
      {eyebrow && (
        <div
          className={cn(
            "font-mono text-micro font-bold uppercase tracking-[3px]",
            eyebrowClass ?? "text-muted-foreground",
          )}
        >
          {eyebrow}
        </div>
      )}
      <div className="font-display text-h3 font-bold leading-tight text-foreground">
        {title}
      </div>
      {description && (
        <p className="max-w-sm font-body text-body-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function EmptyState(props: Omit<StateBlockProps, "eyebrowClass">) {
  return <StateBlock eyebrow="NO RESULTS" {...props} />;
}

export function ErrorState(props: Omit<StateBlockProps, "eyebrowClass">) {
  return (
    <StateBlock
      eyebrow="SOMETHING BROKE"
      eyebrowClass="text-destructive"
      {...props}
    />
  );
}
