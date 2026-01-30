import Link from "next/link";
import type React from "react";
import { Button } from "@/lib/components/primitives/button";

type ExternalLinkButtonProps = {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
};

export function IconLinkButton({
  href,
  icon,
  ariaLabel,
}: ExternalLinkButtonProps) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {icon}
      </Link>
    </Button>
  );
}
