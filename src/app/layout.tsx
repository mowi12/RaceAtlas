import type { Metadata } from "next";
import "./globals.css";
import type React from "react";
import { BreakpointIndicator } from "@/components/dev/BreakpointIndicator";
import { NavShell } from "@/components/layout/NavShell";
import {
  archivoNarrow,
  fraunces,
  interTight,
  jetbrainsMono,
} from "@/lib/fonts";

export const metadata: Metadata = {
  title: "RaceAtlas",
  description: "RaceAtlas",
};

// Mirrors the proxy switch: with maintenance on, the only route that ever
// renders is /maintenance, and it must do so without the nav chrome.
const MAINTENANCE_MODE = ["true", "1"].includes(
  (process.env.MAINTENANCE_MODE ?? "").toLowerCase(),
);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Dev-only: throwing here (vs. in a page) is the only way to exercise
  // global-error.tsx, which catches root-layout failures. The whole block is
  // dead code in production, so the layout stays statically rendered there.
  if (process.env.NODE_ENV !== "production") {
    const { headers } = await import("next/headers");
    if ((await headers()).get("x-pathname") === "/boom-global") {
      throw new Error("Simulated root-layout failure (boom-global route).");
    }
  }

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={[
        "h-full antialiased",
        archivoNarrow.variable,
        fraunces.variable,
        interTight.variable,
        jetbrainsMono.variable,
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col">
        {MAINTENANCE_MODE ? (
          children
        ) : (
          <>
            <NavShell>{children}</NavShell>
            <BreakpointIndicator />
          </>
        )}
      </body>
    </html>
  );
}
