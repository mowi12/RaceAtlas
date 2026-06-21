import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shared keyboard-focus ring. Every interactive component composes this so focus
 * styling stays identical and WCAG "visible focus on every interactive element"
 * (PROJECT_GUIDE §1.6) holds in one place. Uses focus-visible so mouse clicks
 * don't show the ring.
 */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
