import { cn } from "@/lib/utils";

interface CountdownDisplayProps {
  days: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizes = {
  sm: { number: "text-[48px]", unit: "text-[18px]" },
  md: { number: "text-[80px]", unit: "text-[28px]" },
  lg: { number: "text-[120px]", unit: "text-[36px]" },
};

export function CountdownDisplay({
  days,
  size = "md",
  showLabel = true,
  className,
}: CountdownDisplayProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <div className="font-mono text-micro tracking-[3px] text-muted-foreground">
          COUNTDOWN
        </div>
      )}
      <div
        className={cn(
          "font-display font-black leading-none tracking-tight text-foreground",
          s.number,
        )}
      >
        {String(days).padStart(3, "0")}
        <span
          className={cn(
            "font-display font-black text-muted-foreground",
            s.unit,
          )}
        >
          D
        </span>
      </div>
    </div>
  );
}
