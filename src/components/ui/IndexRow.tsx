import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

interface IndexRowProps {
  /** Left column — a route label (e.g. "TIMELINE") or an index numeral ("01"). */
  title: React.ReactNode;
  /** Main line. */
  body: React.ReactNode;
  /** Optional secondary line below the body. Omitted on the 404 page. */
  description?: React.ReactNode;
  /** Renders the row as a navigation link. */
  href?: string;
  /** Renders the row as a button (mutually exclusive with href). */
  onClick?: () => void;
  /** Dotted separator above the row — set on every item but the first in a list. */
  divider?: boolean;
  showArrow?: boolean;
  /** Override the left column width/size (default mirrors the 404 page). */
  titleClassName?: string;
  className?: string;
}

/**
 * Editorial index row shared by the 404 and 500 pages: a bold left title, a body
 * line, an optional description, and a trailing arrow. Extracted from the 404 page
 * so the error page can reuse the exact same link/list treatment.
 */
export function IndexRow({
  title,
  body,
  description,
  href,
  onClick,
  divider,
  showArrow = true,
  titleClassName,
  className,
}: IndexRowProps) {
  const rowClass = cn(
    "flex items-baseline gap-3.5 py-3.5 text-left",
    divider && "border-t border-dotted border-border",
    className,
  );

  const content = (
    <>
      <span
        className={cn(
          "shrink-0 font-display font-black",
          titleClassName ?? "w-[110px] text-[22px]",
        )}
      >
        {title}
      </span>
      <span className="flex-1 text-sm text-ink-soft">
        {body}
        {description ? (
          <span className="mt-1 block text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      {showArrow ? <span className="font-mono text-sm">→</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(rowClass, "w-full cursor-pointer hover:text-foreground")}
      >
        {content}
      </button>
    );
  }

  return <div className={rowClass}>{content}</div>;
}
