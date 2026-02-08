import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type React from "react";
import { isAdminAuthenticated } from "@/lib/auth/admin";
import { AdminTrigger } from "@/lib/components/composites/admin/admin-trigger";
import { GithubLinkButton } from "@/lib/components/composites/external-link-button/github-link-button";
import { LanguageSelect } from "@/lib/components/composites/language-select/language-select";
import { Logo } from "@/lib/components/composites/logo/logo";
import { Navigation } from "@/lib/components/composites/navigation/navigation";
import { ThemeProvider } from "@/lib/components/composites/theme/theme-provider";
import { ThemeToggle } from "@/lib/components/composites/theme/theme-toggle";
import { DevIndicator } from "@/lib/components/dev/dev-indicator";
import { routing } from "@/lib/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const isAdmin = await isAdminAuthenticated();

  return (
    <div suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex h-screen flex-col overflow-hidden">
            <header className="items-center bg-background grid grid-cols-[1fr_auto_1fr] p-4">
              <div className="justify-self-start">
                <Logo />
              </div>

              <div className="justify-self-center">
                <Navigation />
              </div>

              <div className="justify-self-end flex items-center gap-2">
                <AdminTrigger locale={locale} isAuthenticated={isAdmin} />
                <GithubLinkButton owner="mowi12" repo="RaceAtlas" />
                <LanguageSelect />
                <ThemeToggle />
              </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>

      <DevIndicator />
    </div>
  );
}
