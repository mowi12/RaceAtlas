"use client";

import Link from "next/link";
import { Compass } from "@/components/decorative/Compass";
import { Contour } from "@/components/decorative/Contour";
import { IncidentBox } from "@/components/system/IncidentBox";
import { Button } from "@/components/ui/Button";
import { IndexRow } from "@/components/ui/IndexRow";

type AppError = Error & { digest?: string };

const isDev = process.env.NODE_ENV !== "production";

export default function ErrorPage({
  error,
  reset,
}: {
  error: AppError;
  reset: () => void;
}) {
  // Dev shows the real message/stack; production surfaces only the digest, since
  // raw errors can leak internal paths and query fragments.
  const message =
    isDev && error.message
      ? error.message
      : "Internal server error — the sheet failed to render.";
  const detail = isDev ? error.stack : undefined;

  return (
    <main className="grid flex-1 grid-cols-1 bg-background text-foreground lg:grid-cols-[1.4fr_1fr]">
      {/* LEFT — the error */}
      <section className="relative flex flex-col justify-center overflow-hidden border-foreground px-6 py-16 md:px-16 lg:border-r lg:px-20">
        <Contour
          w={1000}
          h={800}
          lines={40}
          color="orange"
          seed={11}
          opacity={0.45}
          fade
          fadeStart={0.85}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        />

        <div className="relative max-w-2xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-label tracking-[2px] text-warm">
            <span className="inline-block h-px w-6 bg-warm" />
            ERROR · 500
          </div>

          <h1 className="font-display text-[64px] font-black leading-[0.9] tracking-tight md:text-[112px] lg:text-[130px] xl:text-[156px]">
            The atlas
            <br />
            <span className="font-serif font-normal italic">lost</span> its
            <br />
            bearings.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Something on our side gave way while drawing this page. The
            cartographers have been notified and are redrawing the sheet.
          </p>

          {/* Mobile-only: the aside is hidden below lg, so surface the error here. */}
          <IncidentBox
            code={500}
            message={message}
            reference={error.digest}
            detail={detail}
            className="mt-8 border border-foreground p-6 lg:hidden"
          />

          <div className="mt-9 flex flex-wrap gap-3">
            <Button onClick={reset}>TRY AGAIN ↻</Button>
            <Button asChild variant="secondary">
              <Link href="/">BACK TO HOME</Link>
            </Button>
          </div>
        </div>

        <Compass
          size={72}
          className="absolute bottom-8 right-8 size-16 lg:block lg:size-20"
        />
      </section>

      {/* RIGHT — incident detail + what you can do */}
      <aside className="hidden flex-col lg:flex">
        <IncidentBox
          code={500}
          message={message}
          reference={error.digest}
          detail={detail}
          className="border-b border-foreground px-7 py-6"
        />

        <div className="flex-1 overflow-hidden px-7 py-5">
          <div className="mb-3.5 font-mono text-label tracking-[2px] text-muted-foreground">
            WHAT YOU CAN DO
          </div>

          <IndexRow
            title="01"
            titleClassName="w-10 text-[26px]"
            body="Try again"
            description="The page often recovers on the next request."
            showArrow={false}
          />
          <IndexRow
            href="/"
            divider
            title="02"
            titleClassName="w-10 text-[26px]"
            body="Back to home"
            description="Return to the atlas and pick a view."
          />
        </div>
      </aside>
    </main>
  );
}
