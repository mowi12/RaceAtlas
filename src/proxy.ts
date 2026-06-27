import { type NextRequest, NextResponse } from "next/server";

// Dev-only helper: expose the pathname to the root layout so it can throw on
// /boom-global and let us preview app/global-error.tsx (which only triggers on
// root-layout errors). Scoped via the matcher so it never runs for real routes.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/boom-global"] };
