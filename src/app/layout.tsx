import type { Metadata } from "next";
import "./globals.css";
import type React from "react";
import { archivoNarrow, fraunces, interTight, jetbrainsMono } from "@/fonts";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
