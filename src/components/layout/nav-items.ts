export type NavKey = "TIMELINE" | "CALENDAR" | "MAP" | "EVENTS" | "DESIGN";

export interface NavItem {
  key: NavKey;
  href: string;
  label: string;
  mobileLabel: string;
}

const APP_NAV_ITEMS: NavItem[] = [
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

// /design 404s in production (see app/design/page.tsx), so only list it in dev.
export const NAV_ITEMS: NavItem[] =
  process.env.NODE_ENV === "production"
    ? APP_NAV_ITEMS
    : [
        ...APP_NAV_ITEMS,
        {
          key: "DESIGN",
          href: "/design",
          label: "DESIGN",
          mobileLabel: "DESIGN",
        },
      ];

/** Maps a pathname to its nav key, or undefined for routes outside the nav (currently just /). */
export function activeKeyForPath(pathname: string): NavKey | undefined {
  const match = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.key;
}
