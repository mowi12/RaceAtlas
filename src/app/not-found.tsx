import Link from "next/link";
import { Compass } from "@/components/decorative/Compass";
import { Contour } from "@/components/decorative/Contour";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { RequestedHostUrl } from "@/components/system/RequestedHostUrl";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid flex-1 grid-cols-1 bg-background text-foreground lg:grid-cols-[1.4fr_1fr]">
      <section className="relative flex flex-col justify-center overflow-hidden border-foreground px-6 py-16 md:px-16 lg:border-r lg:px-20">
        <Contour
          w={1000}
          h={1400}
          density="dense"
          lines={50}
          color="black"
          seed={17}
          opacity={0.3}
          fade
          fadeStart={1}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        />

        <div className="relative max-w-2xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-label tracking-[2px] text-muted-foreground">
            <span className="inline-block h-px w-6 bg-foreground" />
            NOT FOUND · 404
          </div>

          <div className="font-display text-[120px] font-black leading-[0.82] tracking-[-0.03em] md:text-[180px] lg:text-[220px]">
            4<span className="font-serif font-normal italic">0</span>4
          </div>

          <div className="mt-4 font-display text-[40px] font-black leading-[0.95] md:text-[52px] lg:text-[64px]">
            Off the <span className="font-serif font-normal italic">edge</span>
            <br />
            of the map.
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            The page you were looking for isn&apos;t plotted on this edition. It
            may have moved, or it may never have existed.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">BACK TO HOME →</Link>
            </Button>
          </div>
        </div>

        <Compass
          size={72}
          className="absolute bottom-8 right-8 size-16 lg:block lg:size-20"
        />
      </section>

      <aside className="hidden flex-col lg:flex">
        <div className="border-b border-foreground px-7 py-6 bg-card">
          <div className="mb-2.5 font-mono text-label tracking-[2px] text-muted-foreground">
            YOU WERE LOOKING FOR
          </div>
          <RequestedHostUrl />
          {/* TODO: search isn't implemented yet — restore once it ships:
              "Try the search, or wander into one of the views below." */}
          <p className="mt-3.5 font-serif text-base italic text-ink-soft">
            Wander into one of the views below.
          </p>
        </div>

        <div className="flex-1 overflow-hidden px-7 py-5">
          <div className="mb-3.5 font-mono text-label tracking-[2px] text-muted-foreground">
            WAYS BACK IN
          </div>
          {NAV_ITEMS.filter((item) => item.notFoundText).map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-baseline gap-3.5 py-3.5 ${
                i > 0 ? "border-t border-dotted border-border" : ""
              }`}
            >
              <span className="w-[110px] font-display text-[22px] font-black">
                {item.label}
              </span>
              <span className="flex-1 text-sm text-ink-soft">
                {item.notFoundText}
              </span>
              <span className="font-mono text-sm">→</span>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
