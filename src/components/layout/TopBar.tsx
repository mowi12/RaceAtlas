import { MapPinOff } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Wordmark } from "@/components/brand/Wordmark";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, type NavKey } from "./nav-items";

interface TopBarProps {
  active?: NavKey;
  city?: string;
  date?: string;
  /** When a real geolocation fix has resolved, show a blinking live indicator. */
  live?: boolean;
  className?: string;
}

export function TopBar({
  active,
  city = "BERLIN",
  date = "04·MAR·2026",
  live = false,
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "flex items-stretch border-b border-foreground bg-background h-16 shrink-0",
        className,
      )}
    >
      {/* brand */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 lg:px-8 text-foreground"
      >
        <Logo size={28} />
        <span className="sm:hidden">
          <Wordmark size={0.19} subtitle={null} underline={false} />
        </span>
        <span className="hidden sm:block">
          <Wordmark
            size={0.19}
            subtitle="AN INDEX OF ROAD & TRAIL"
            subtitleSize={48}
            underline={false}
          />
        </span>
      </Link>

      {/* desktop nav */}
      <nav className="hidden lg:flex flex-1 justify-center items-center gap-7 text-[13px] tracking-[0.04em]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "relative text-foreground transition-opacity",
              item.key === active
                ? "opacity-100 font-semibold"
                : "opacity-60 hover:opacity-100",
            )}
          >
            {item.label}
            {item.key === active && (
              <span
                className="absolute left-0 right-0 h-[3px] bg-accent"
                style={{ bottom: -22 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* mobile spacer — pushes the meta area to the right edge when the nav is hidden */}
      <div className="flex-1 lg:hidden" />

      {/* meta */}
      <div className="flex items-center gap-3.5 px-4 lg:px-8 font-mono text-[10px] text-muted-foreground tracking-[1.5px]">
        {/* reserved slot for a future search control (no behavior yet) */}
        <span className="size-7 shrink-0" aria-hidden="true" />
        <span>{date}</span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-primary text-primary-foreground tracking-[1.5px]"
          title={live ? "Live location" : "Location off"}
        >
          {live ? (
            <>
              {city}
              <span
                className="size-1.5 rounded-full bg-destructive animate-blink"
                aria-hidden="true"
              />
            </>
          ) : (
            <MapPinOff className="size-3.5" aria-label="Location off" />
          )}
        </span>
      </div>
    </header>
  );
}
