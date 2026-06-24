"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { reverseGeocode } from "@/lib/geo/reverse-geocode";
import { MobileNav } from "./MobileNav";
import { activeKeyForPath } from "./nav-items";
import { TopBar } from "./TopBar";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/**
 * Formats a date as `DD·MON·YYYY` (e.g. `04·MAR·2026`) for the TopBar meta block.
 *
 * @param d - The date to format.
 * @returns The formatted date string.
 */
function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}·${MONTHS[d.getMonth()] ?? ""}·${d.getFullYear()}`;
}

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = activeKeyForPath(pathname);

  // Resolved town name; only shown once `live` is true.
  const [city, setCity] = useState("");
  // True once a real geolocation fix has been reverse-geocoded (drives the badge:
  // town + blinking dot when live, struck-through pin otherwise).
  const [live, setLive] = useState(false);
  // Computed post-mount to avoid an SSR/timezone hydration mismatch.
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(formatDate(new Date()));
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    const controller = new AbortController();
    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const name = await reverseGeocode(
            pos.coords.latitude,
            pos.coords.longitude,
            controller.signal,
          );
          if (!cancelled && name) {
            setCity(name.toUpperCase());
            setLive(true);
          }
        } catch {
          // Network/abort/Photon error — keep the offline (struck-pin) state.
        }
      },
      () => {
        // Denied or unavailable — keep the struck-pin state.
      },
      { timeout: 10000 },
    );

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <>
      <TopBar
        active={active}
        city={city}
        date={date}
        live={live}
        className="sticky top-0 z-40"
      />
      <div className="flex-1 flex flex-col pb-14 lg:pb-0">{children}</div>
      <MobileNav
        active={active}
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      />
    </>
  );
}
