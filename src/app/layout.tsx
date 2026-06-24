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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        <NavShell>{children}</NavShell>

        <BreakpointIndicator />
      </body>
    </html>
  );
}
