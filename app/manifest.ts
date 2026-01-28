import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "Manifest",
  });

  return {
    name: t("name"),
    short_name: t("shortName"),
    start_url: "/",
    display: "standalone",
    lang: routing.defaultLocale,
    scope: "/",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}
