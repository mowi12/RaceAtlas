// Runs once on server boot; importing env here fails fast on invalid/missing vars.
export async function register() {
  await import("@/lib/env");
}
