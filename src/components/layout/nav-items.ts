export type NavKey = "TIMELINE" | "CALENDAR" | "MAP" | "EVENTS";

export interface NavItem {
  key: NavKey;
  href: string;
  label: string;
  mobileLabel: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "TIMELINE",
    href: "/timeline",
    label: "TIMELINE",
    mobileLabel: "TIMELINE",
  },
  { key: "CALENDAR", href: "/calendar", label: "CALENDAR", mobileLabel: "CAL" },
  { key: "MAP", href: "/map", label: "MAP", mobileLabel: "MAP" },
  { key: "EVENTS", href: "/events", label: "EVENTS", mobileLabel: "EVENTS" },
];

/** Maps a pathname to its nav key, or undefined for routes outside the nav (/, /design). */
export function activeKeyForPath(pathname: string): NavKey | undefined {
  const match = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.key;
}
