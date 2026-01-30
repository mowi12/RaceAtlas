import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/shadcn-helper";

type LogoProps = {
  href?: string;
  className?: string;
};

export function Logo({ href = "/", className }: LogoProps) {
  const alt = "RaceAtlas";
  const sizes = "100vw";
  const preload = true;

  return (
    <Link href={href}>
      <div
        className={cn("relative shrink-0 h-8", className)}
        style={{ aspectRatio: "17/4" }}
      >
        <Image
          src="/images/logo-with-text/raceatlas-logo-with-text-black_1700x400.png"
          alt={alt}
          className="object-contain dark:hidden"
          fill
          sizes={sizes}
          preload={preload}
        />
        <Image
          src="/images/logo-with-text/raceatlas-logo-with-text-white_1700x400.png"
          alt={alt}
          className="object-contain hidden dark:block"
          fill
          sizes={sizes}
          preload={preload}
        />
      </div>
    </Link>
  );
}
