import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "raceatlas_admin";
const DEFAULT_MAX_AGE_SECONDS = 60 * 10;

/**
 * Returns the secret used to sign the admin session cookie.
 */
function getAdminSecret() {
  return process.env.ADMIN_COOKIE_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

function getMaxAgeSeconds() {
  const raw = process.env.ADMIN_SESSION_MAX_AGE_SECONDS;
  if (!raw) return DEFAULT_MAX_AGE_SECONDS;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_MAX_AGE_SECONDS;
  }
  return Math.floor(parsed);
}

/**
 * Creates an HMAC signature for the cookie payload.
 */
function signToken(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

/**
 * Creates and stores a signed admin session cookie.
 */
export async function createAdminSession() {
  const secret = getAdminSecret();
  if (!secret) {
    throw new Error("Missing ADMIN_PASSWORD or ADMIN_COOKIE_SECRET.");
  }

  const maxAgeSeconds = getMaxAgeSeconds();
  const issuedAt = Date.now().toString();
  const signature = signToken(issuedAt, secret);
  const token = `${issuedAt}.${signature}`;

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAgeSeconds,
    path: "/",
  });
}

/**
 * Clears the admin session cookie.
 */
export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Validates the admin session cookie and returns auth state.
 *
 * @return True if the signed cookie is present and valid.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = getAdminSecret();
  if (!secret) return false;

  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = signToken(issuedAt, secret);
  if (signature.length !== expected.length) {
    return false;
  }
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  const ageSeconds = (Date.now() - Number(issuedAt)) / 1000;
  return !(!Number.isFinite(ageSeconds) || ageSeconds > getMaxAgeSeconds());
}
