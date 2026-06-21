import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Our custom `--text-*` tokens (text-display … text-micro) are font-SIZES. Without
// registering them, tailwind-merge can't tell `text-caption` from a text-COLOR, so a
// component that sets both a size and a color (e.g. Button: text-caption +
// text-primary-foreground) has one silently dropped — which made primary buttons lose
// their text color and badges lose their size. Registering them in the font-size group
// fixes the conflict resolution.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body",
            "body-sm",
            "caption",
            "mono",
            "label",
            "micro",
          ],
        },
      ],
    },
  },
});

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
