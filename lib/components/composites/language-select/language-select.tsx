"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/primitives/select";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";

const LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
};

export function LanguageSelect() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const locales = routing.locales as readonly string[];

  const current = locales.includes(locale) ? locale : routing.defaultLocale;

  return (
    <Select
      value={current}
      onValueChange={(nextLocale) => {
        router.replace(pathname, { locale: nextLocale });
      }}
    >
      <SelectTrigger className="w-35">
        <Languages />
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end" position="popper">
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            {LABELS[l] ?? l.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
