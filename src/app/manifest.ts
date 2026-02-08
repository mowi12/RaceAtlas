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
    icons: [
      {
        src: "/images/logo/raceatlas-logo-black_48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/logo/raceatlas-logo-black_512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/logo/raceatlas-logo-black_1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/images/logo/raceatlas-logo-black.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
