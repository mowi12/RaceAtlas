"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface BreadcrumbBarProps {
  items?: string[];
  highlight?: "error" | "warning" | "none";
  className?: string;
}

const ROOT_LABEL = "ATLAS";

function deriveItems(pathname: string): string[] {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment).toUpperCase());

  return [ROOT_LABEL, ...segments];
}

export function BreadcrumbBar({
  items,
  highlight = "none",
  className,
}: BreadcrumbBarProps) {
  const pathname = usePathname();
  const resolved = items ?? deriveItems(pathname);

  return (
    <div
      className={cn(
        "flex items-center gap-0 font-mono text-micro tracking-[2px] text-muted-foreground",
        className,
      )}
    >
      {resolved.map((item, i) => {
        const isLast = i === resolved.length - 1;
        const color = isLast
          ? highlight === "error"
            ? "var(--destructive)"
            : highlight === "warning"
              ? "var(--warning)"
              : "var(--foreground)"
          : undefined;

        return (
          <span
            key={resolved.slice(0, i + 1).join("/")}
            className="flex items-center gap-0"
          >
            {i > 0 && <span className="mx-2">▸</span>}
            <span style={{ color }}>{item}</span>
          </span>
        );
      })}
    </div>
  );
}
