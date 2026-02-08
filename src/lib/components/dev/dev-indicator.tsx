import { IS_DEV } from "@/lib/constants/dev";
import { cn } from "@/lib/utils/shadcn-helper";

/**
 * Displays the current Tailwind breakpoint in development mode.
 * Never rendered in production builds.
 */
export function DevIndicator() {
  if (!IS_DEV) return null;

  return (
    <div
      className={cn(
        "fixed right-1 bottom-1 z-9999 rounded-md px-1.5",
        "bg-red-400 sm:bg-orange-400 md:bg-yellow-400 lg:bg-green-400 xl:bg-blue-400 2xl:bg-purple-400",
      )}
    >
      <div className="max-sm:block sm:hidden">--</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
