import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("Home");

  return <div>{t("title")}</div>;
}
