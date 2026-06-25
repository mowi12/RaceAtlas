"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface UrlDisplayProps {
  host: string;
  /** Defaults to the current route's pathname when omitted. */
  path?: string;
  className?: string;
}

/** Monospace URL chip with the final path segment highlighted. */
export function UrlDisplay({ host, path, className }: UrlDisplayProps) {
  const currentPathname = usePathname();
  const resolvedPath = path ?? currentPathname ?? "";
  const segments = resolvedPath.split("/").filter(Boolean);
  const lastSegment = segments.at(-1);
  const leadingPath = segments.slice(0, -1).join("/");

  return (
    <div
      className={cn(
        "break-all border border-foreground bg-background px-3 py-2.5 font-mono text-sm",
        className,
      )}
    >
      {host}
      {lastSegment ? (
        <>
          /{leadingPath ? `${leadingPath}/` : ""}
          <span className="text-warm">{lastSegment}</span>
        </>
      ) : (
        <span className="text-warm">/</span>
      )}
    </div>
  );
}
