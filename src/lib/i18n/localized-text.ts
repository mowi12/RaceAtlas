import type { LocalizedString } from "@/lib/types/i18n";

/**
 * Resolves a localized text value for a given locale.
 *
 * @param value - A localized string object, a plain string, or `undefined`.
 * @param locale - The desired locale (e.g., `"en"` or `"de"`).
 * @param fallback - Fallback locale key to use when no match for `locale` exists.
 *                   Defaults to `"en"`.
 * @returns The resolved string for the specified locale, or an empty string if no suitable translation is available.
 */
export function getLocalizedText(
  value: LocalizedString | string | undefined,
  locale: string,
  fallback: keyof LocalizedString = "en",
) {
  if (!value) return "";
  if (typeof value === "string") return value;
  const key = locale as keyof LocalizedString;
  return value[key] ?? value[fallback] ?? "";
}
