"use client";

import { useTranslations } from "next-intl";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/lib/components/primitives/navigation-menu";
import { Link } from "@/lib/i18n/navigation";
import { NAV_ITEMS } from "@/lib/navigation/items";

export function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <nav aria-label="Primary">
      <NavigationMenu>
        <NavigationMenuList>
          {NAV_ITEMS.map((item) => {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuLink asChild>
                  <Link href={item.href}>{t(item.key)}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
