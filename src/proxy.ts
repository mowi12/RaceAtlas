import { type NextRequest, NextResponse } from "next/server";

const MAINTENANCE_MODE = ["true", "1"].includes(
  (process.env.MAINTENANCE_MODE ?? "").toLowerCase(),
);

const MAINTENANCE_PATH = "/maintenance";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance switch: when enabled, every matched route is rewritten to
  // /maintenance. The URL is preserved (rewrite, not redirect) and we answer
  // 503 + Retry-After so crawlers treat it as temporary and don't deindex.
  if (MAINTENANCE_MODE && pathname !== MAINTENANCE_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = MAINTENANCE_PATH;
    const response = NextResponse.rewrite(url, { status: 503 });
    response.headers.set("Retry-After", "3600");
    return response;
  }

  // Dev-only helper: expose the pathname to the root layout so it can throw on
  // /boom-global and let us preview app/global-error.tsx (which only triggers
  // on root-layout errors).
  if (process.env.NODE_ENV !== "production" && pathname === "/boom-global") {
    const headers = new Headers(request.headers);
    headers.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

// Next.js documented default matcher: run on every request except Next
// internals and common static assets. Maintenance mode needs broad coverage,
// so we can't scope this down to a single route anymore.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
