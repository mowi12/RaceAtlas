import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Wordmark } from "@/components/brand/Wordmark";
import { GlobeLoader } from "@/components/decorative/GlobeLoader";

export const metadata: Metadata = {
  title: "Under maintenance — RaceAtlas",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-background px-6 py-12 text-center text-foreground sm:gap-12">
      <div className="flex max-w-full items-center justify-center gap-3 sm:gap-10">
        <Logo size={100} className="size-[40px] shrink-0 sm:size-[100px]" />
        <Wordmark
          size={0.3}
          subtitleSize={20}
          underline={false}
          className="sm:hidden"
        />
        <Wordmark size={0.68} className="hidden sm:block" />
      </div>

      <GlobeLoader size={180} />

      <div className="max-w-md">
        <div className="mb-3 flex items-center justify-center gap-3 font-mono text-label tracking-[2px] text-muted-foreground">
          <span className="inline-block h-px w-6 bg-foreground" />
          MAINTENANCE
          <span className="inline-block h-px w-6 bg-foreground" />
        </div>
        <h1 className="font-display text-[28px] font-black leading-[1.05] md:text-[34px]">
          We&apos;re redrawing the map.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          RaceAtlas is down for a little maintenance. We&apos;ll be back soon.
        </p>
      </div>
    </main>
  );
}
