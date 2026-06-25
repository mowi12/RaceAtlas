import { headers } from "next/headers";
import { UrlDisplay } from "@/components/ui/UrlDisplay";
import { env } from "@/lib/env";

/** Renders the unmatched URL the visitor actually hit, last segment highlighted. */
export async function RequestedHostUrl() {
  const host = (await headers()).get("host") ?? env.SITE_DOMAIN;

  return <UrlDisplay host={host} />;
}
