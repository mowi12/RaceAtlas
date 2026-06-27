import { cn } from "@/lib/utils";

interface IncidentBoxProps {
  code?: number | string;
  /** Mono eyebrow above the title. */
  label?: string;
  /** Word shown above the code. */
  title?: string;
  /** Serif summary line. Hidden when omitted. */
  message?: string;
  /** Reference id (e.g., error.digest). Shown as REF; falls back to "—". */
  reference?: string;
  /** Pre-formatted detail such as a stack trace. The caller decides whether to
   *  pass it (e.g., dev only) since it can leak internals. Hidden when omitted. */
  detail?: string;
  /** Outer padding/border/visibility — supplied by the layout that hosts the box. */
  className?: string;
}

/**
 * Editorial "incident report" panel from the error page. Purely presentational
 * and layout-agnostic, so it can be dropped into an aside, a card, a banner, or
 * inline on mobile — the host controls padding, border, and visibility via
 * `className`. No error-handling logic lives here on purpose.
 */
export function IncidentBox({
  code = 500,
  label = "INCIDENT REPORT",
  title = "Status",
  message,
  reference,
  detail,
  className,
}: IncidentBoxProps) {
  return (
    <div className={cn("bg-card", className)}>
      <div className="mb-2.5 font-mono text-label tracking-[2px] text-muted-foreground">
        {label}
      </div>

      <div className="font-display text-[40px] font-black leading-[0.92] md:text-[44px]">
        {title}
        <br />
        <span className="font-serif font-normal italic">{code}</span>
      </div>

      {message ? (
        <p className="mt-2 font-serif text-base italic text-ink-soft">
          {message}
        </p>
      ) : null}

      <div className="mt-4 border border-foreground bg-background px-3 py-2.5 font-mono text-label leading-[1.7] tracking-[1px] text-ink-soft">
        <div>
          <span className="text-muted-foreground">REF&nbsp;&nbsp;&nbsp;</span>
          {reference ?? "—"}
        </div>
        {detail ? (
          <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap text-[10px] leading-[1.5] md:max-h-56">
            {detail}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
