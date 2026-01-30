import "./globals.css";
import { Poppins } from "next/font/google";
import { getLocale } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  fallback: [
    "system-ui",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
