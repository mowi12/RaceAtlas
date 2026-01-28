import { redirect } from "next/navigation";

// Root page that redirects to the default locale (fallback for the "/" path)
export default function RootPage() {
  redirect("/en");
}
