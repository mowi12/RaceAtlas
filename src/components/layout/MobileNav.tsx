import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type NavKey } from "./nav-items";

interface MobileNavProps {
  active?: NavKey;
  className?: string;
}

export function MobileNav({ active, className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        "flex border-t border-foreground bg-background shrink-0 font-mono",
        className,
      )}
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="flex-1 py-3.5 text-center text-[10px] tracking-[1.5px]"
          style={{
            color:
              item.key === active
                ? "var(--primary-foreground)"
                : "var(--foreground)",
            background:
              item.key === active ? "var(--primary)" : "var(--background)",
          }}
        >
          {item.mobileLabel}
        </Link>
      ))}
    </nav>
  );
}
