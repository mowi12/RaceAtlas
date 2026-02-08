import { describe, expect, it } from "vitest";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import type { LocalizedString } from "@/lib/types/i18n";

describe("getLocalizedText", () => {
  it("returns empty string for undefined input", () => {
    expect(getLocalizedText(undefined, "de")).toBe("");
  });

  it("returns empty string for empty string input", () => {
    expect(getLocalizedText("", "de")).toBe("");
  });

  it("returns the string directly when value is a plain string", () => {
    expect(getLocalizedText("Hello", "de")).toBe("Hello");
  });

  it("returns the locale match when available", () => {
    const value: LocalizedString = { en: "Hello", de: "Hallo" };
    expect(getLocalizedText(value, "de")).toBe("Hallo");
    expect(getLocalizedText(value, "en")).toBe("Hello");
  });

  it("falls back to English by default when locale is missing", () => {
    const value: LocalizedString = { en: "Hello", de: "Hallo" };
    expect(getLocalizedText(value, "fr")).toBe("Hello");
  });

  it("uses explicit fallback when provided and locale is missing", () => {
    const value: LocalizedString = { en: "Hello", de: "Hallo" };
    expect(getLocalizedText(value, "fr", "de")).toBe("Hallo");
  });

  it("prefers locale over fallback when both exist", () => {
    const value: LocalizedString = { en: "Hello", de: "Hallo" };
    expect(getLocalizedText(value, "de", "en")).toBe("Hallo");
  });
});
