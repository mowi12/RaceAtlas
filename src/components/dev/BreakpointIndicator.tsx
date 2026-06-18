import { cn } from "@/lib/utils";

export function BreakpointIndicator() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed right-1 bottom-1 z-50 rounded-md px-1.5",
        "bg-red-300 sm:bg-green-300 md:bg-yellow-300 lg:bg-blue-300 xl:bg-purple-300 2xl:bg-pink-300",
      )}
    >
      <div className="sm:hidden">--</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
