import { redirect } from "next/navigation";
import { routing } from "@/lib/i18n/routing";

// Root page that redirects to the default locale (fallback for the "/" path)
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
